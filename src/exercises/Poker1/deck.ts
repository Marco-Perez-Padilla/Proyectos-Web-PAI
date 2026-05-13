/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Model class representing the 52-card deck.
 */

import { Card } from './card.js';

export class Deck {
  private cards: Card[] = [];

  private static readonly SUITS: string[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  private static readonly RANKS: string[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  /**
   * @desc Creates the deck, fills it with all 52 cards, and shuffles.
   */
  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  /**
   * @desc Pushes one card per suit and rank into the deck array.
   */
  private initializeDeck(): void {
    for (const suit of Deck.SUITS) {
      for (const rank of Deck.RANKS) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  /**
   * @desc Randomizes the order of the cards.
   */
  shuffle(): void {
    for (let currentIndex = this.cards.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
      [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
    }
  }

  /**
   * @desc Draws a specified number of cards from the end of the deck.
   * @param count - Number of cards to draw.
   * @returns {Card[]} The drawn cards.
   * @throws {Error} If count is negative.
   */
  drawCards(count: number): Card[] {
    if (count < 0) throw new Error('Cannot draw a negative number of cards');
    const drawnCards: Card[] = [];
    for (let drawnCount = 0; drawnCount < count && this.cards.length > 0; drawnCount++) {
      drawnCards.push(this.cards.pop()!);
    }
    return drawnCards;
  }

  /**
   * @desc Returns the number of cards left.
   * @returns {number} Cards remaining.
   */
  cardsRemaining(): number {
    return this.cards.length;
  }
}