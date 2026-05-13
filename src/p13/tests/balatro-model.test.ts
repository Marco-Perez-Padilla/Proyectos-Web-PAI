/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Unit tests for the BalatroModel class.
 */

import { BalatroModel } from '../src/exercises/home-work/balatro-model.js';

describe('BalatroModel', () => {
  test('New game should have 8 cards, 0 score, no game over', () => {
    const model = new BalatroModel();
    expect(model.getCurrentHand().length).toBe(8);
    expect(model.getTotalScore()).toBe(0);
    expect(model.isGameOver()).toBe(false);
    expect(model.isRoundCleared()).toBe(false);
    expect(model.getDeckCardsRemaining()).toBe(44);
  });

  test('Selecting and deselecting cards works correctly', () => {
    const model = new BalatroModel();
    model.selectCard(0);
    model.selectCard(2);
    expect(model.getSelectedIndices().has(0)).toBe(true);
    expect(model.getSelectedIndices().has(2)).toBe(true);
    expect(model.getSelectedIndices().size).toBe(2);

    model.deselectCard(0);
    expect(model.getSelectedIndices().has(0)).toBe(false);
    expect(model.getSelectedIndices().size).toBe(1);

    model.clearSelection();
    expect(model.getSelectedIndices().size).toBe(0);
  });

  test('Selecting many cards does not limit size, but isPlayHandAllowed returns false when >5', () => {
    const model = new BalatroModel();
    for (let i = 0; i < 8; i++) {
      model.selectCard(i);
    }
    expect(model.getSelectedIndices().size).toBe(8);
    expect(model.isPlayHandAllowed()).toBe(false);
  });

  test('Playing a hand increases score and consumes hand', () => {
    const model = new BalatroModel();
    for (let i = 0; i < 5; i++) model.selectCard(i);
    expect(model.isPlayHandAllowed()).toBe(true);
    const preview = model.playHand();
    expect(preview).toBeDefined();
    expect(preview.handName).toBeTruthy();
    expect(model.getTotalScore()).toBeGreaterThan(0);
    expect(model.getHandsPlayed()).toBe(1);
    expect(model.getSelectedIndices().size).toBe(0); 
    expect(model.getCurrentHand().length).toBe(8);
    expect(model.getDeckCardsRemaining()).toBe(44 - 5); 
    expect(model.getDeckCardsRemaining()).toBe(39);
  });

  test('Cannot play hand if no cards selected', () => {
    const model = new BalatroModel();
    expect(model.isPlayHandAllowed()).toBe(false);
    expect(() => model.playHand()).toThrow('Cannot play hand.');
  });

  test('Cannot play hand if max hands reached (3)', () => {
    const model = new BalatroModel();
    for (let round = 0; round < 3; round++) {
      model.clearSelection();
      for (let i = 0; i < 5; i++) model.selectCard(i);
      model.playHand();
    }
    expect(model.getHandsPlayed()).toBe(3);
    expect(model.isGameOver()).toBe(true);
    expect(model.isPlayHandAllowed()).toBe(false);
    expect(() => model.playHand()).toThrow('Cannot play hand.');
  });

  test('Discarding cards consumes discard and replaces cards', () => {
    const model = new BalatroModel();
    for (let i = 0; i < 3; i++) model.selectCard(i);
    model.discard();
    expect(model.getDiscardsUsed()).toBe(1);
    expect(model.getCurrentHand().length).toBe(8);
    expect(model.getDeckCardsRemaining()).toBe(44 - 3);
    expect(model.getSelectedIndices().size).toBe(0);
  });

  test('Cannot discard if no cards selected', () => {
    const model = new BalatroModel();
    expect(model.isDiscardAllowed()).toBe(false);
    expect(() => model.discard()).toThrow('Cannot discard.');
  });

  test('Cannot discard if max discards reached (3)', () => {
    const model = new BalatroModel();
    for (let i = 0; i < 3; i++) {
      model.clearSelection();
      for (let j = 0; j < 3; j++) model.selectCard(j);
      model.discard();
    }
    expect(model.getDiscardsUsed()).toBe(3);
    expect(model.isDiscardAllowed()).toBe(false);
    expect(() => model.discard()).toThrow('Cannot discard.');
  });

  test('After max hands are played, the round must end (either cleared or game over)', () => {
    const model = new BalatroModel();
    while (model.getHandsPlayed() < model.getMaxHands()) {
      model.clearSelection();
      for (let i = 0; i < 5; i++) model.selectCard(i);
      model.playHand();
    }
    expect(model.isGameOver() || model.isRoundCleared()).toBe(true);
  });
});