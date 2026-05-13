/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Common interfaces for the Balatro game to decouple Model and View.
 */

export interface ICard {
  suit: string;
  rank: string;
  imagePath: string;
  chipsValue: number;
}

export interface IScorePreview {
  handName: string;
  baseChips: number;
  baseMultiplier: number;
  totalChips: number;
  totalScore: number;
  cardsInHand: ICard[];
}