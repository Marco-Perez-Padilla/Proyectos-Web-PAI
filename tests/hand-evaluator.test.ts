/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Complete unit tests for HandEvaluator covering all poker hands.
 */

import { HandEvaluator } from '../src/exercises/home-work/hand-evaluator.js';
import { ICard } from '../src/exercises/home-work/interfaces.js';

/**
 * Helper function to create a minimal card mock.
 * @param rank - Card rank.
 * @param suit - Card suit (default 'hearts').
 * @returns {ICard} A mock card object.
 */
function createCard(rank: string, suit: string = 'hearts'): ICard {
  const chipsValue = (rank === 'A') ? 11 : (['K', 'Q', 'J'].includes(rank) ? 10 : parseInt(rank, 10));
  return { suit, rank, imagePath: '', chipsValue };
}

describe('HandEvaluator – all poker hands', () => {
  const evaluator = new HandEvaluator();
  test('Should throw error for empty hand', () => {
    expect(() => evaluator.evaluateHand([])).toThrow('A hand must contain between 1 and 5 cards.');
  });

  test('Should throw error for more than 5 cards', () => {
    const sixCards = new Array(6).fill(createCard('2'));
    expect(() => evaluator.evaluateHand(sixCards)).toThrow('A hand must contain between 1 and 5 cards.');
  });

  test('High Card with one card', () => {
    const cards = [createCard('7')];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('High Card');
    expect(result.baseChips).toBe(5);
    expect(result.baseMultiplier).toBe(1);
    expect(result.totalChips).toBe(5 + 7); // 12
    expect(result.totalScore).toBe(12);
  });

  test('High Card with five unrelated cards', () => {
    const cards = [
      createCard('2', 'hearts'),
      createCard('5', 'spades'),
      createCard('9', 'diamonds'),
      createCard('J', 'clubs'),
      createCard('K', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('High Card');
    expect(result.totalChips).toBe(5 + 2 + 5 + 9 + 10 + 10);
    expect(result.totalScore).toBe(result.totalChips);
  });

  test('Pair with two cards', () => {
    const cards = [createCard('5'), createCard('5', 'spades')];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Pair');
    expect(result.baseChips).toBe(10);
    expect(result.baseMultiplier).toBe(2);
    expect(result.totalChips).toBe(20);
    expect(result.totalScore).toBe(40);
  });

  test('Pair with five cards containing one pair', () => {
    const cards = [
      createCard('8', 'hearts'),
      createCard('8', 'spades'),
      createCard('2', 'diamonds'),
      createCard('J', 'clubs'),
      createCard('A', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Pair');
    const cardChipsSum = 8 + 8 + 2 + 10 + 11; // 39
    expect(result.totalChips).toBe(10 + cardChipsSum); // 49
    expect(result.totalScore).toBe(98);
  });

  test('Two Pair with four cards', () => {
    const cards = [
      createCard('4', 'hearts'),
      createCard('4', 'spades'),
      createCard('9', 'diamonds'),
      createCard('9', 'clubs')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Two Pair');
    expect(result.baseChips).toBe(20);
    expect(result.baseMultiplier).toBe(2);
    const sum = 4 + 4 + 9 + 9; // 26
    expect(result.totalChips).toBe(20 + sum); // 46
    expect(result.totalScore).toBe(92);
  });

  test('Two Pair with five cards (two pairs + kicker)', () => {
    const cards = [
      createCard('3', 'hearts'),
      createCard('3', 'spades'),
      createCard('10', 'diamonds'),
      createCard('10', 'clubs'),
      createCard('K', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Two Pair');
    const sum = 3 + 3 + 10 + 10 + 10; // 36
    expect(result.totalChips).toBe(20 + sum); // 56
    expect(result.totalScore).toBe(112);
  });

  test('Three of a Kind with three cards', () => {
    const cards = [createCard('8'), createCard('8', 'spades'), createCard('8', 'diamonds')];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Three of a Kind');
    expect(result.baseChips).toBe(30);
    expect(result.baseMultiplier).toBe(3);
    const sum = 8 + 8 + 8; // 24
    expect(result.totalChips).toBe(30 + sum); // 54
    expect(result.totalScore).toBe(162);
  });

  test('Three of a Kind with five cards', () => {
    const cards = [
      createCard('Q', 'hearts'),
      createCard('Q', 'spades'),
      createCard('Q', 'diamonds'),
      createCard('2', 'clubs'),
      createCard('7', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Three of a Kind');
    const sum = 10 + 10 + 10 + 2 + 7; // 39
    expect(result.totalChips).toBe(30 + sum); // 69
    expect(result.totalScore).toBe(207);
  });

  test('Straight – Ace-low (A,2,3,4,5) with mixed suits', () => {
    const cards = [
      createCard('A', 'hearts'),
      createCard('2', 'clubs'),
      createCard('3', 'spades'),
      createCard('4', 'diamonds'),
      createCard('5', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Straight');
    expect(result.baseChips).toBe(30);
    expect(result.baseMultiplier).toBe(4);
    const sum = 11 + 2 + 3 + 4 + 5;
    expect(result.totalChips).toBe(30 + sum);
    expect(result.totalScore).toBe((30 + sum) * 4);
  });

  test('Straight – Ace-high (10,J,Q,K,A) with mixed suits', () => {
    const cards = [
      createCard('10', 'spades'),
      createCard('J', 'hearts'),
      createCard('Q', 'clubs'),
      createCard('K', 'diamonds'),
      createCard('A', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Straight');
    expect(result.baseChips).toBe(30);
    expect(result.baseMultiplier).toBe(4);
    const sum = 10 + 10 + 10 + 10 + 11;
    expect(result.totalChips).toBe(30 + sum); // 81
    expect(result.totalScore).toBe((30 + sum) * 4); // 324
  });

  test('Not a Straight – Q,K,A,2,3 (invalid sequence)', () => {
    const cards = [
      createCard('Q', 'hearts'),
      createCard('K', 'spades'),
      createCard('A', 'diamonds'),
      createCard('2', 'clubs'),
      createCard('3', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('High Card');
  });

  test('Flush – five same suit, no sequence', () => {
    const cards = [
      createCard('2', 'hearts'),
      createCard('5', 'hearts'),
      createCard('7', 'hearts'),
      createCard('9', 'hearts'),
      createCard('K', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Flush');
    expect(result.baseChips).toBe(35);
    expect(result.baseMultiplier).toBe(4);
    const sum = 2 + 5 + 7 + 9 + 10; // 33
    expect(result.totalChips).toBe(35 + sum); // 68
    expect(result.totalScore).toBe((35 + sum) * 4); // 272
  });

  test('Full House – three of one rank, two of another', () => {
    const cards = [
      createCard('6', 'hearts'),
      createCard('6', 'spades'),
      createCard('6', 'diamonds'),
      createCard('J', 'clubs'),
      createCard('J', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Full House');
    expect(result.baseChips).toBe(40);
    expect(result.baseMultiplier).toBe(4);
    const sum = 6 + 6 + 6 + 10 + 10;
    expect(result.totalChips).toBe(40 + sum);
    expect(result.totalScore).toBe((40 + sum) * 4);
  });

  test('Four of a Kind – four same rank, one kicker', () => {
    const cards = [
      createCard('9', 'hearts'),
      createCard('9', 'spades'),
      createCard('9', 'diamonds'),
      createCard('9', 'clubs'),
      createCard('A', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Four of a Kind');
    expect(result.baseChips).toBe(60);
    expect(result.baseMultiplier).toBe(7);
    const sum = 9 + 9 + 9 + 9 + 11;
    expect(result.totalChips).toBe(60 + sum);
    expect(result.totalScore).toBe((60 + sum) * 7);
  });

  test('Straight Flush – sequence and same suit', () => {
    const cards = [
      createCard('5', 'clubs'),
      createCard('6', 'clubs'),
      createCard('7', 'clubs'),
      createCard('8', 'clubs'),
      createCard('9', 'clubs')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Straight Flush');
    expect(result.baseChips).toBe(100);
    expect(result.baseMultiplier).toBe(8);
    const sum = 5 + 6 + 7 + 8 + 9; 
    expect(result.totalChips).toBe(100 + sum); 
    expect(result.totalScore).toBe((100 + sum) * 8); 
  });

  test('Straight Flush with Ace-high (10,J,Q,K,A same suit)', () => {
    const cards = [
      createCard('10', 'diamonds'),
      createCard('J', 'diamonds'),
      createCard('Q', 'diamonds'),
      createCard('K', 'diamonds'),
      createCard('A', 'diamonds')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Straight Flush');
    const sum = 10 + 10 + 10 + 10 + 11; // 51
    expect(result.totalChips).toBe(100 + sum);
    expect(result.totalScore).toBe((100 + sum) * 8);
  });

  test('Should return Straight Flush over a regular Flush or Straight', () => {
    const cards = [
      createCard('3', 'hearts'),
      createCard('4', 'hearts'),
      createCard('5', 'hearts'),
      createCard('6', 'hearts'),
      createCard('7', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Straight Flush');
  });

  test('Should return Four of a Kind over Three of a Kind', () => {
    const cards = [
      createCard('K', 'hearts'),
      createCard('K', 'spades'),
      createCard('K', 'diamonds'),
      createCard('K', 'clubs'),
      createCard('2', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Four of a Kind');
  });

  test('Should return Full House over Three of a Kind or Pair', () => {
    const cards = [
      createCard('7', 'hearts'),
      createCard('7', 'spades'),
      createCard('7', 'diamonds'),
      createCard('Q', 'clubs'),
      createCard('Q', 'hearts')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Full House');
  });

  test('Should return Pair with only two cards', () => {
    const cards = [createCard('J'), createCard('J', 'spades')];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Pair');
  });

  test('Should return Three of a Kind with three cards', () => {
    const cards = [createCard('3'), createCard('3', 'spades'), createCard('3', 'diamonds')];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Three of a Kind');
  });

  test('Should return Four of a Kind with four cards', () => {
    const cards = [
      createCard('A', 'hearts'),
      createCard('A', 'spades'),
      createCard('A', 'diamonds'),
      createCard('A', 'clubs')
    ];
    const result = evaluator.evaluateHand(cards);
    expect(result.handName).toBe('Four of a Kind');
  });
});