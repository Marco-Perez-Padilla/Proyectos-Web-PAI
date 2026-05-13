/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Unit tests for the Deck class.
 */

import { Deck } from '../src/exercises/home-work/deck.js';

describe('Deck', () => {
  test('Should start with 52 cards after construction', () => {
    const deck = new Deck();
    expect(deck.cardsRemaining()).toBe(52);
  });

  test('Should draw 8 cards, leaving 44 cards', () => {
    const deck = new Deck();
    const hand = deck.drawCards(8);
    expect(hand.length).toBe(8);
    expect(deck.cardsRemaining()).toBe(44);
  });

  test('Should draw all cards, then draw zero', () => {
    const deck = new Deck();
    deck.drawCards(52);
    expect(deck.cardsRemaining()).toBe(0);
    const emptyDraw = deck.drawCards(5);
    expect(emptyDraw.length).toBe(0);
  });

  test('Should throw error if drawing negative amount', () => {
    const deck = new Deck();
    expect(() => deck.drawCards(-1)).toThrow('Cannot draw a negative number of cards');
  });

  test('Should not draw the same card twice (basic uniqueness check)', () => {
    const deck = new Deck();
    const firstDraw = deck.drawCards(5);
    const secondDraw = deck.drawCards(5);
    const allDrawn = [...firstDraw, ...secondDraw];
    const paths = allDrawn.map(card => card.imagePath);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(10);
  });
});