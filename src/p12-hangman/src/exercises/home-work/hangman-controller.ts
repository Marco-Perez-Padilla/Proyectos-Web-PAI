/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 23 2026
 * @desc Controller layer for the Hangman game. Responsible for mediating between Model and View, forwarding user actions to the Model and state changes to the View.
 */

import type { IGameState, IGameStateObserver, IGameEventHandler } from './interfaces.js';
import type { HangmanModel } from './hangman-model.js';
import type { HangmanView } from './hangman-view.js';

export class HangmanController implements IGameStateObserver, IGameEventHandler {
  private readonly model: HangmanModel;
  private readonly view: HangmanView;

  /**
   * @desc Wires Model and View together and starts the first game.
   * @param model Capa de lógica del juego.
   * @param view  Capa de presentación.
   */
  constructor(model: HangmanModel, view: HangmanView) {
    this.model = model;
    this.view = view;
    this.model.setObserver(this);
    this.view.setEventHandler(this);
    this.model.startNewGame();
  }


  /**
   * @desc Forwards the new state to the View for rendering.
   * @param newState State snapshot emitted by the Model.
   */
  onGameStateChanged(newState: IGameState): void {
    this.view.render(newState);
  }

  /**
   * @desc Forwards the guessed letter to the Model.
   * @param letter Single lowercase letter from the Spanish alphabet.
   */
  onLetterGuessed(letter: string): void {
    this.model.guessLetter(letter);
  }

  /**
   * @desc Requests the Model to reset and start a new game.
   */
  onNewGameRequested(): void {
    this.model.startNewGame();
  }
}