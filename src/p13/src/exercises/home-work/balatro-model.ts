/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Model layer – holds the entire game state and enforces rules for the Small Blind.
 */

import { Deck } from './deck.js';
import { HandEvaluator } from './hand-evaluator.js';
import { IScorePreview, ICard } from './interfaces.js';

export class BalatroModel {
  private static readonly TARGET_SCORE = 300;
  private static readonly MAX_HANDS = 3;
  private static readonly MAX_DISCARDS = 3;

  private deck: Deck;
  private currentHandCards: ICard[] = [];
  private selectedCardIndices: Set<number> = new Set();
  private totalScore: number = 0;
  private handsPlayed: number = 0;
  private discardsUsed: number = 0;
  private gameOverFlag: boolean = false;
  private roundClearedFlag: boolean = false;
  private handEvaluator: HandEvaluator = new HandEvaluator();

  /**
   * @desc Initialises the game with the fixed Small Blind configuration, shuffles the deck and deals 8 cards.
   */
  constructor() {
    this.deck = new Deck();
    this.dealInitialHand();
  }

  /**
   * @desc Deals 8 cards from the deck.
   */
  dealInitialHand(): void {
    this.currentHandCards = this.deck.drawCards(8);
  }

  /**
   * @desc Selects a card by its index.
   * @param index - Card index (0‑7).
   */
  selectCard(index: number): void {
    if (index >= 0 && index < this.currentHandCards.length) {
      this.selectedCardIndices.add(index);
    }
  }

  /**
   * @desc Deselects a card.
   * @param index - Card index.
   */
  deselectCard(index: number): void {
    this.selectedCardIndices.delete(index);
  }

  /**
   * @desc Clears all selected indices.
   */
  clearSelection(): void {
    this.selectedCardIndices.clear();
  }

  /**
   * @desc Returns the currently selected card objects.
   * @returns {ICard[]} Selected cards.
   */
  getSelectedCards(): ICard[] {
    return Array.from(this.selectedCardIndices).map(i => this.currentHandCards[i]);
  }

  /**
   * @desc Returns a copy of the set of selected indices.
   * @returns {Set<number>} Selected indices.
   */
  getSelectedIndices(): Set<number> {
    return new Set(this.selectedCardIndices);
  }

  /**
   * @desc Plays the selected cards, updates score and hands, replaces cards.
   * @returns {IScorePreview} Evaluation of the played hand.
   * @throws {Error} If playing is not allowed.
   */
  playHand(): IScorePreview {
    if (!this.isPlayHandAllowed()) throw new Error('Cannot play hand.');
    const selectedCards = this.getSelectedCards();
    const evaluation = this.handEvaluator.evaluateHand(selectedCards);
    this.totalScore += evaluation.totalScore;

    this.replaceSelectedCards();
    this.handsPlayed++;
    this.checkRoundEnd();
    return evaluation;
  }

  /**
   * @desc Discards the selected cards and draws new ones.
   * @throws {Error} If discarding is not allowed.
   */
  discard(): void {
    if (!this.isDiscardAllowed()) throw new Error('Cannot discard.');
    this.replaceSelectedCards();
    this.discardsUsed++;
    this.checkRoundEnd();
  }

  /**
   * @desc Removes selected cards from hand and draws replacements up to 8.
   */
  private replaceSelectedCards(): void {
    const sortedIndices = Array.from(this.selectedCardIndices).sort((a, b) => b - a);
    for (const index of sortedIndices) {
      this.currentHandCards.splice(index, 1);
    }
    this.selectedCardIndices.clear();
    const drawCount = 8 - this.currentHandCards.length;
    if (drawCount > 0) {
      this.currentHandCards.push(...this.deck.drawCards(drawCount));
    }
  }

  /**
   * @desc Checks if playing a hand is allowed.
   * @returns {boolean} True if allowed.
   */
  isPlayHandAllowed(): boolean {
    return !this.gameOverFlag && !this.roundClearedFlag &&
           this.handsPlayed < BalatroModel.MAX_HANDS &&
           this.selectedCardIndices.size > 0 &&
           this.selectedCardIndices.size <= 5;
  }

  /**
   * @desc Checks if discarding is allowed.
   * @returns {boolean} True if allowed.
   */
  isDiscardAllowed(): boolean {
    return !this.gameOverFlag && !this.roundClearedFlag &&
           this.discardsUsed < BalatroModel.MAX_DISCARDS &&
           this.selectedCardIndices.size > 0 &&
           this.selectedCardIndices.size <= 5;
  }

  /**
   * @desc Updates the game over / cleared flags based on score and hands played.
   */
  private checkRoundEnd(): void {
    if (this.totalScore >= BalatroModel.TARGET_SCORE) {
      this.roundClearedFlag = true;
      this.gameOverFlag = false;
    } else if (this.handsPlayed >= BalatroModel.MAX_HANDS) {
      this.gameOverFlag = true;
      this.roundClearedFlag = false;
    }
  }

  /** 
   * @desc Returns a copy of the current hand cards.
   * @returns {ICard[]} Copy of the current hand. 
   */
  getCurrentHand(): ICard[] { return [...this.currentHandCards]; }

  /** 
   * @desc Returns the number of cards remaining in the deck.
   * @returns {number} Cards remaining in deck. 
   */
  getDeckCardsRemaining(): number { return this.deck.cardsRemaining(); }

  /** 
   * @desc Returns the total accumulated score.
   * @returns {number} Total accumulated score. 
   */
  getTotalScore(): number { return this.totalScore; }

  /** 
   * @desc Returns the target score for the round.
   * @returns {number} Target score for the round. 
   */
  getTargetScore(): number { return BalatroModel.TARGET_SCORE; }

  /** 
   * @desc Returns the maximum number of hands allowed.
   * @returns {number} Maximum hands allowed. 
   */
  getMaxHands(): number { return BalatroModel.MAX_HANDS; }

  /** 
   * @desc Returns the maximum number of discards allowed.
   * @returns {number} Maximum discards allowed. 
   */
  getMaxDiscards(): number { return BalatroModel.MAX_DISCARDS; }

  /** 
   * @desc Returns true if the game is over.
   * @returns {boolean} True if game over. */
  isGameOver(): boolean { return this.gameOverFlag; }

  /** 
   * @desc Returns true if the round is cleared.
   * @returns {boolean} True if round cleared. */
  isRoundCleared(): boolean { return this.roundClearedFlag; }

  /** 
   * @desc Returns the number of hands played so far.
   * @returns {number} Hands played so far. */
  getHandsPlayed(): number { return this.handsPlayed; }

  /** 
   * @desc Returns the number of discards used.
   * @returns {number} Discards used. */
  getDiscardsUsed(): number { return this.discardsUsed; }

  /**
   * @desc Returns a snapshot of the round configuration.
   * @returns {{ targetScore: number, maxHands: number, maxDiscards: number }} Configuration object.
   */
  getRoundConfig(): { targetScore: number; maxHands: number; maxDiscards: number } {
    return {
      targetScore: this.getTargetScore(),
      maxHands: this.getMaxHands(),
      maxDiscards: this.getMaxDiscards()
    };
  }

  /**
   * @desc Evaluates the currently selected cards without modifying game state.
   * @returns {IScorePreview | null} The score preview, or null if selection is empty or >5.
   */
  evaluateSelectedHand(): IScorePreview | null {
    const selectedCards = this.getSelectedCards();
    if (selectedCards.length < 1 || selectedCards.length > 5) {
      return null;
    }
    return this.handEvaluator.evaluateHand(selectedCards);
  }

  /**
   * @desc Sorts the current hand cards from highest to lowest (Ace highest),
   *       and clears any selection because indices have changed.
   */
  sortHandByRankDescending(): void {
    const rankOrder: Record<string, number> = {
      'A': 14, 'K': 13, 'Q': 12, 'J': 11,
      '10': 10, '9': 9, '8': 8, '7': 7,
      '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
    };
    this.currentHandCards.sort((cardA, cardB) => rankOrder[cardB.rank] - rankOrder[cardA.rank]);
    this.selectedCardIndices.clear();
  }
}