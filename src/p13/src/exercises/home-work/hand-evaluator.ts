/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Evaluates a set of cards and returns the highest poker hand.
 */

import { ICard, IScorePreview } from './interfaces.js';

export class HandEvaluator {

  /**
   * @desc Evaluates the best possible hand from the given cards.
   * @param cards - Array of 1‑5 cards.
   * @returns {IScorePreview} The score preview of the best hand.
   * @throws {Error} If the number of cards is not between 1 and 5.
   */
  evaluateHand(cards: ICard[]): IScorePreview {
    if (cards.length < 1 || cards.length > 5) {
      throw new Error('A hand must contain between 1 and 5 cards.');
    }
    if (this.isStraightFlush(cards)) return this.buildResult('Straight Flush', 100, 8, cards);
    if (this.isFourOfAKind(cards)) return this.buildResult('Four of a Kind', 60, 7, cards);
    if (this.isFullHouse(cards)) return this.buildResult('Full House', 40, 4, cards);
    if (this.isFlush(cards)) return this.buildResult('Flush', 35, 4, cards);
    if (this.isStraight(cards)) return this.buildResult('Straight', 30, 4, cards);
    if (this.isThreeOfAKind(cards)) return this.buildResult('Three of a Kind', 30, 3, cards);
    if (this.isTwoPair(cards)) return this.buildResult('Two Pair', 20, 2, cards);
    if (this.isPair(cards)) return this.buildResult('Pair', 10, 2, cards);
    return this.buildResult('High Card', 5, 1, cards);
  }

  /**
   * @desc Constructs an IScorePreview object.
   * @param handName - Name of the hand.
   * @param baseChips - Base chips.
   * @param baseMultiplier - Base multiplier.
   * @param cards - The cards involved.
   * @returns {IScorePreview} The score preview.
   */
  private buildResult(handName: string, baseChips: number, baseMultiplier: number, cards: ICard[]): IScorePreview {
    const totalChips = baseChips + cards.reduce((sum, card) => sum + card.chipsValue, 0);
    return {
      handName,
      baseChips,
      baseMultiplier,
      totalChips,
      totalScore: totalChips * baseMultiplier,
      cardsInHand: [...cards]
    };
  }

  /**
   * @desc Checks if the cards form a Pair
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's a Pair, false otherwise.
   */
  private isPair(cards: ICard[]): boolean {
    const counts = this.countRanks(cards);
    return Object.values(counts).filter(count => count === 2).length === 1;
  }

  /**
   * @desc Checks if the cards form Two Pair
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's Two Pair, false otherwise.
   */
  private isTwoPair(cards: ICard[]): boolean {
    const counts = this.countRanks(cards);
    return Object.values(counts).filter(count => count === 2).length === 2;
  }

  /**
   * @desc Checks if the cards form Three of a Kind
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's Three of a Kind, false otherwise.
   */
  private isThreeOfAKind(cards: ICard[]): boolean {
    const counts = this.countRanks(cards);
    return Object.values(counts).some(count => count >= 3);
  }

  /**
   * @desc Checks if the cards form a Straight
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's a Straight, false otherwise.
   */
  private isStraight(cards: ICard[]): boolean {
    if (cards.length !== 5) return false;
    const values = cards.map(card => this.rankToNumber(card.rank)).sort((a, b) => a - b);
    if (values[4] - values[0] === 4 && new Set(values).size === 5) return true;
    return values[0] === 2 && values[1] === 3 && values[2] === 4 && values[3] === 5 && values[4] === 14;
  }

  /**
   * @desc Checks if the cards form a Flush
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's a Flush, false otherwise.
   */
  private isFlush(cards: ICard[]): boolean {
    if (cards.length !== 5) return false;
    const firstSuit = cards[0].suit;
    return cards.every(card => card.suit === firstSuit);
  }

  /**
   * @desc Checks if the cards form a Full House
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's a Full House, false otherwise.
   */
  private isFullHouse(cards: ICard[]): boolean {
    if (cards.length !== 5) return false;
    const counts = Object.values(this.countRanks(cards));
    return counts.includes(3) && counts.includes(2);
  }

  /**
   * @desc Checks if the cards form Four of a Kind
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's Four of a Kind, false otherwise.
   */
  private isFourOfAKind(cards: ICard[]): boolean {
    const counts = this.countRanks(cards);
    return Object.values(counts).some(count => count >= 4);
  }

  /**
   * @desc Checks if the cards form a Straight Flush
   * @param cards - Array of cards to evaluate.
   * @returns {boolean} True if it's a Straight Flush, false otherwise.
   */
  private isStraightFlush(cards: ICard[]): boolean {
    return this.isStraight(cards) && this.isFlush(cards);
  }

  /**
   * @desc Counts occurrences of each rank.
   * @param cards - Array of cards.
   * @returns {Record<string, number>} Rank to count mapping.
   */
  private countRanks(cards: ICard[]): Record<string, number> {
    const counts: Record<string, number> = {};
    for (const card of cards) {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
    }
    return counts;
  }

  /**
   * @desc Converts a rank string to a numeric value (A=14, K=13, Q=12, J=11).
   * @param rank - The rank string.
   * @returns {number} Numeric equivalent.
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
}