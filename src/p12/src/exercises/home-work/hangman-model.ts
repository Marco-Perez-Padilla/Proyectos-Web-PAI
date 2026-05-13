/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 23 2026
 * @desc Model layer for the Hangman game. Responsible for managing game state and logic, and notifying the Controller of changes.
 */

import { COUNTRY_NAMES } from './countries.js';
import type { IGameState, IGameStateObserver } from './interfaces.js';

const MAX_WRONG_GUESSES = 6;

export class HangmanModel {

  /**
   * @desc Intilializes all game state properties
   * @param secretWord The word to be guessed. Initially empty until startNewGame() is called.
   * @param guessedLetters Set of letters that have been guessed so far. Initially empty.
   * @param wrongGuessCount Number of incorrect guesses made. Initially 0.
   * @param observer The registered observer for state changes. Initially null until setObserver() is called.
   */
  constructor(
    private secretWord: string = '',
    private readonly guessedLetters: Set<string> = new Set(),
    private wrongGuessCount: number = 0,
    private observer: IGameStateObserver | null = null
  ) {}

  /**
   * @desc Registers the sole observer that receives state change notifications.
   * @param observer Typically the HangmanController instance.
   */
  setObserver(observer: IGameStateObserver): void {
    this.observer = observer;
  }

  /**
   * @desc Resets all state, picks a random country name, and notifies the observer.
   */
  startNewGame(): void {
    const randomIndex = Math.floor(Math.random() * COUNTRY_NAMES.length);
    this.secretWord = COUNTRY_NAMES[randomIndex];
    this.guessedLetters.clear();
    this.wrongGuessCount = 0;
    this.notifyObserver();
  }

  /**
   * @desc Processes a guessed letter and advances the game state.
   * Silently ignored if the game is already over or the letter was already tried.
   * @param letter Single lowercase letter from the Spanish alphabet.
   */
  guessLetter(letter: string): void {
    const normalisedLetter = letter.toLowerCase();
    if (this.isGameOver() || this.guessedLetters.has(normalisedLetter)) {
      return;
    }
    this.guessedLetters.add(normalisedLetter);
    if (!this.secretWord.includes(normalisedLetter)) {
      this.wrongGuessCount++;
    }
    this.notifyObserver();
  }

  /**
   * @desc Builds the revealed word array; shows the full word if the game is lost.
   * @returns Array where each element is the revealed letter or `_`.
   */
  private buildRevealedWord(): readonly string[] {
    const isLost = this.isGameLost();
    return this.secretWord.split('').map((letter) =>
      this.guessedLetters.has(letter) || isLost ? letter : '_',
    );
  }

  /**
   * @desc Checks whether all letters of the secret word have been guessed.
   * @returns True if the player has won.
   */
  private isGameWon(): boolean {
    if (this.secretWord === '') return false;
    return this.secretWord
      .split('')
      .every((letter) => this.guessedLetters.has(letter));
  }

  /**
   * @desc Checks whether the player has exhausted all allowed attempts.
   * @returns True if the player has lost.
   */
  private isGameLost(): boolean {
    return this.wrongGuessCount >= MAX_WRONG_GUESSES;
  }

  /**
   * @desc Checks whether the game has ended, either won or lost.
   * @returns True if the game is over.
   */
  private isGameOver(): boolean {
    return this.isGameWon() || this.isGameLost();
  }

  /**
   * @desc Packages a state snapshot and sends it to the registered observer.
   */
  private notifyObserver(): void {
    if (this.observer === null) return;

    const gameIsOver = this.isGameOver();
    const state: IGameState = {
      revealedWord: this.buildRevealedWord(),
      guessedLetters: new Set(this.guessedLetters),
      wrongGuessCount: this.wrongGuessCount,
      maxWrongGuesses: MAX_WRONG_GUESSES,
      isWon: this.isGameWon(),
      isLost: this.isGameLost(),
      // Solo se muestra la palabra secreta cuando la partida termina
      secretWord: gameIsOver ? this.secretWord : '',
    };

    this.observer.onGameStateChanged(state);
  }
}