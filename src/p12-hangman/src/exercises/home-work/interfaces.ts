/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 23 2026
 * @desc Interfaces shared between Model, View and Controller.
 */

/**
 * @desc Unmutable snapshot of the current game state, emitted by the Model to the View.
 */
export interface IGameState {
  readonly revealedWord: readonly string[];
  readonly guessedLetters: ReadonlySet<string>;
  readonly wrongGuessCount: number;
  readonly maxWrongGuesses: number;
  readonly isWon: boolean;
  readonly isLost: boolean;
  readonly secretWord: string;
}

/**
 * @desc The Model sends state change notifications to the registered observer through this interface.
 */
export interface IGameStateObserver {
  onGameStateChanged(newState: IGameState): void;
}

/**
 * @desc The View sends user actions through this handler, without knowing the Model.
 */
export interface IGameEventHandler {
  onLetterGuessed(letter: string): void;
  onNewGameRequested(): void;
}