/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Model class representing a single playing card.
 */

import { ICard } from './interfaces.js';

export class Card implements ICard {
  readonly chipsValue: number;
  readonly imagePath: string;

  /**
   * @param suit - The suit of the card.
   * @param rank - The rank of the card.
   * @desc Creates a card, computing its chip value and image path automatically.
   */
  constructor(readonly suit: string, readonly rank: string) {
    this.chipsValue = this.calculateChipsValue();
    this.imagePath = this.buildImagePath();
  }

  /**
   * @desc Determines the base chip value of the card.
   * @returns {number} Chip value: 11 for Ace, 10 for face cards, otherwise the numeric rank.
   */
  private calculateChipsValue(): number {
    if (this.rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(this.rank)) return 10;
    return parseInt(this.rank, 10);
  }

  /**
   * @desc Constructs the relative path to the card's image, matching the file naming convention.
   * @returns {string} The image path.
   */
  private buildImagePath(): string {
    let rankName: string;
    switch (this.rank) {
      case 'A': rankName = 'ace'; break;
      case 'K': rankName = 'king'; break;
      case 'Q': rankName = 'queen'; break;
      case 'J': rankName = 'jack'; break;
      default: rankName = this.rank;
    }
    return `../../../img/SVG-cards-1.3/${rankName}_of_${this.suit}.svg`;
  }
}