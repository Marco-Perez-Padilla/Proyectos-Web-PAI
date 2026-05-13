/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since May 4, 2026
 * @desc Model layer for Poker-1 game. Manages card comparison and scoring.
 */

import { Deck } from './deck.js';
import { ICard } from './interfaces.js';

export class PokerModel {
  private deck: Deck;
  private handCards: ICard[] = [];
  private revealedCards: ICard[] = [];
  private currentIndex: number = 0;
  private points: number = 0;
  private gameEnded: boolean = false;
  private gameWon: boolean = false;

  private static readonly POINTS_TO_WIN = 3;

  /**
   * @desc Creates a new Poker game. Shuffles deck and deals initial 5 cards.
   */
  constructor() {
    this.deck = new Deck();
    this.dealInitialHand();
  }

  /**
   * @desc Deals 5 cards and reveals only the first one.
   */
  private dealInitialHand(): void {
    this.handCards = this.deck.drawCards(5);
    this.revealedCards = [this.handCards[0]];
    this.currentIndex = 0;
  }

  /**
   * @desc Returns the currently visible cards (to render on canvas).
   * @returns {ICard[]} Array of visible cards.
   */
  getVisibleCards(): ICard[] {
    return [...this.revealedCards];
  }

  /**
   * @desc Returns all 5 hand cards (including hidden).
   * @returns {ICard[]} All cards in the hand.
   */
  getHandCards(): ICard[] {
    return [...this.handCards];
  }

  /**
   * @desc Returns the number of cards still hidden.
   * @returns {number} Hidden card count.
   */
  getHiddenCount(): number {
    return 4 - this.currentIndex;
  }

  /**
   * @desc Checks if the game can continue (not won/lost and cards remain).
   * @returns {boolean} True if guessing is allowed.
   */
  canGuess(): boolean {
    return !this.gameEnded && !this.gameWon && this.currentIndex < 4;
  }

  /**
   * @desc Guesses if the next hidden card is HIGHER than the last revealed.
   * @returns {{ correct: boolean, newCard: ICard, points: number }} Result.
   * @throws {Error} If guessing is not allowed.
   */
  guessHigher(): { correct: boolean; newCard: ICard; points: number } {
    if (!this.canGuess()) throw new Error('Cannot guess now.');
    return this.revealNextCard(true);
  }

  /**
   * @desc Guesses if the next hidden card is LOWER than the last revealed.
   * @returns {{ correct: boolean, newCard: ICard, points: number }} Result.
   * @throws {Error} If guessing is not allowed.
   */
  guessLower(): { correct: boolean; newCard: ICard; points: number } {
    if (!this.canGuess()) throw new Error('Cannot guess now.');
    return this.revealNextCard(false);
  }

  /**
   * @desc Reveals the next card and evaluates the guess.
   * @param guessedHigher - True if player guessed higher.
   * @returns {{ correct: boolean, newCard: ICard, points: number }} Result.
   */
  private revealNextCard(guessedHigher: boolean): { correct: boolean; newCard: ICard; points: number } {
    this.currentIndex++;
    const lastCard = this.revealedCards[this.revealedCards.length - 1];
    const nextCard = this.handCards[this.currentIndex];
    this.revealedCards.push(nextCard);
    const lastValue = this.rankToNumber(lastCard.rank);
    const nextValue = this.rankToNumber(nextCard.rank);

    let correct = false;
    if (guessedHigher) {
      correct = nextValue > lastValue;
    } else {
      correct = nextValue < lastValue;
    }
    if (correct) {
      this.points++;
      if (this.points >= PokerModel.POINTS_TO_WIN) {
        this.gameWon = true;
      }
    }
    if (this.currentIndex >= 4) {
      this.gameEnded = true;
    }
    return { correct, newCard: nextCard, points: this.points };
  }

  /**
   * @desc Converts a rank to numeric value for comparison.
   * @param rank - Card rank.
   * @returns {number} Numeric value (A=14, K=13, ..., 2=2).
   */
  private rankToNumber(rank: string): number {
    switch (rank) {
      case 'A': return 14;
      case 'K': return 13;
      case 'Q': return 12;
      case 'J': return 11;
      default: return parseInt(rank, 10);
    }
  }

  /**
   * @desc Resets the game completely.
   */
  resetGame(): void {
    this.deck = new Deck();
    this.handCards = [];
    this.revealedCards = [];
    this.currentIndex = 0;
    this.points = 0;
    this.gameEnded = false;
    this.gameWon = false;
    this.dealInitialHand();
  }

  /** 
   * @desc Getter for current points
   * @returns {number} Current points. 
  */
  getPoints(): number { return this.points; }

  /** 
   * Checks if game is over
   * @returns {boolean} True if game ended without winning. 
  */
  isGameOver(): boolean { return this.gameEnded && !this.gameWon; }

  /** 
   * Checks if game is won
   * @returns {boolean} True if player won. 
  */
  isGameWon(): boolean { return this.gameWon; }

  /** 
   * Getter for the remaining points to win a game
   * @returns {number} Points needed to win. 
  */
  getPointsToWin(): number { return PokerModel.POINTS_TO_WIN; }
}