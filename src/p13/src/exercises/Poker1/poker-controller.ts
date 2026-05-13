/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since May 4, 2026
 * @desc Controller for Poker-1 game.
 */

import { PokerModel } from './poker-model.js';
import { PokerView } from './poker-view.js';

export class PokerController {
  /**
   * @desc Creates the controller. Waits for image preloading before first render.
   * @param model - The game model.
   * @param view - The view.
   */
  constructor(private model: PokerModel, private view: PokerView) {
    this.initialize();
  }

  /**
   * @desc Initializes events and view
   */
  private async initialize(): Promise<void> {
    await this.view.preloadImages();
    await this.view.preloadJoker();
    this.view.registerEventListeners(
      () => this.handleHigher(),
      () => this.handleLower(),
      () => this.handleNewGame()
    );
    this.updateView();
  }

  /**
   * @desc Handles "Mayor" button click.
   */
  private handleHigher(): void {
    if (!this.model.canGuess()) return;
    try {
      const result = this.model.guessHigher();
      this.updateView();
      this.view.showStatusMessage(result.correct ? '¡Correcto! +1 punto' : 'Incorrecto');
      this.checkEndGame();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc Handles "Menor" button click.
   */
  private handleLower(): void {
    if (!this.model.canGuess()) return;
    try {
      const result = this.model.guessLower();
      this.updateView();
      this.view.showStatusMessage(result.correct ? '¡Correcto! +1 punto' : 'Incorrecto');
      this.checkEndGame();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc Handles "Nuevo Juego" button click.
   */
  private handleNewGame(): void {
    this.model.resetGame();
    this.updateView();
    this.view.showStatusMessage('');
    this.view.enableGuessButtons(true);
  }

  /**
   * @desc Checks if the game has ended (won or lost).
   */
  private checkEndGame(): void {
    if (this.model.isGameWon()) {
      this.view.showStatusMessage('¡Has ganado! Reiniciando...');
      this.view.enableGuessButtons(false);
      setTimeout(() => this.handleNewGame(), 10000);
    } else if (this.model.isGameOver()) {
      this.view.showStatusMessage('Sin aciertos. Juego terminado.');
      this.view.enableGuessButtons(false);
      setTimeout(() => this.handleNewGame(), 10000);
    }
  }

  /**
   * @desc Synchronizes view with current model state.
   */
  private updateView(): void {
    const visibleCards = this.model.getVisibleCards();
    const hiddenCount = this.model.getHiddenCount();
    this.view.renderCards(visibleCards, hiddenCount);
    this.view.updatePoints(this.model.getPoints());
    this.view.enableGuessButtons(this.model.canGuess());
  }
}