/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Unit tests for the Card class.
 */

import { Card } from '../src/exercises/home-work/card.js';

describe('Card', () => {
  test('Should create a numeric card with correct chip value', () => {
    const card = new Card('hearts', '5');
    expect(card.rank).toBe('5');
    expect(card.suit).toBe('hearts');
    expect(card.chipsValue).toBe(5);
    expect(card.imagePath).toBe('../../../img/SVG-cards-1.3/5_of_hearts.svg');
  });

  test('Should create an Ace with chip value 11', () => {
    const card = new Card('spades', 'A');
    expect(card.rank).toBe('A');
    expect(card.chipsValue).toBe(11);
    expect(card.imagePath).toBe('../../../img/SVG-cards-1.3/ace_of_spades.svg');
  });

  test('Should create a face card with chip value 10 (King)', () => {
    const card = new Card('diamonds', 'K');
    expect(card.chipsValue).toBe(10);
    expect(card.imagePath).toBe('../../../img/SVG-cards-1.3/king_of_diamonds.svg');
  });

  test('Should create a Jack with chip value 10', () => {
    const card = new Card('clubs', 'J');
    expect(card.chipsValue).toBe(10);
    expect(card.imagePath).toBe('../../../img/SVG-cards-1.3/jack_of_clubs.svg');
  });

  test('Should create a Queen with chip value 10', () => {
    const card = new Card('hearts', 'Q');
    expect(card.chipsValue).toBe(10);
    expect(card.imagePath).toBe('../../../img/SVG-cards-1.3/queen_of_hearts.svg');
  });
});