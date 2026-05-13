/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Controller that mediates between the Model and the View.
 */

import { BalatroModel } from './balatro-model.js';
import { BalatroView } from './balatro-view.js';
import { IScorePreview } from './interfaces.js';


export class BalatroController {

  /**
   * @param model - The game model.
   * @param view - The view object.
   * @desc Registers event handlers and performs initial rendering.
   */
  constructor(private model: BalatroModel, private view: BalatroView) {
    this.view.registerEventListeners(
      (index: number) => this.handleCardClick(index),
      () => this.handlePlayHand(),
      () => this.handleDiscard(),
      () => this.handleSort()
    );
    
    this.updateFullView();
  }

  /**
   * @desc Toggles selection of a card.
   * @param index - Index of the clicked card.
   */
  private handleCardClick(index: number): void {
    if (this.model.isGameOver() || this.model.isRoundCleared()) return;
    const selected = this.model.getSelectedIndices();
    if (selected.has(index)) {
      this.model.deselectCard(index);
    } else {
      if (selected.size >= 5) return;
      this.model.selectCard(index);
    }
    this.updateFullView();
  }

  /**
   * @desc Plays the selected hand and updates the view accordingly.
   */
  private handlePlayHand(): void {
    if (!this.model.isPlayHandAllowed()) return;
    try {
      const preview: IScorePreview = this.model.playHand();
      this.view.updateScorePreview(preview);
      this.updateFullView();
      if (this.model.isRoundCleared()) {
        this.view.showRoundCleared();
      } else if (this.model.isGameOver()) {
        this.view.showGameOver('You ran out of hands!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc Discards the selected cards and updates the view.
   */
  private handleDiscard(): void {
    if (!this.model.isDiscardAllowed()) return;
    try {
      this.model.discard();
      this.view.updateScorePreview(null);
      this.updateFullView();
      if (this.model.isGameOver()) {
        this.view.showGameOver('You ran out of hands after discarding!');
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc Sorts the hand by rank in descending order and updates the view.
   *       Does nothing if the game is over or round is cleared.
   */
  private handleSort(): void {
    if (this.model.isGameOver() || this.model.isRoundCleared()) return;
    try {
      this.model.sortHandByRankDescending();
      this.updateFullView();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc Synchronizes the entire view with the current model state.
   */
  updateFullView(): void {
    const handCards = this.model.getCurrentHand();
    const selectedIndices = this.model.getSelectedIndices();
    this.view.updateSelectedDisplay(selectedIndices.size);
    this.view.renderHandCards(handCards, selectedIndices);
    this.view.updateDeckCount(this.model.getDeckCardsRemaining());
    const config = this.model.getRoundConfig();
    this.view.updateTargetAndScore(config.targetScore, this.model.getTotalScore());
    const preview = this.model.evaluateSelectedHand();
    this.view.updateScorePreview(preview);
    const handsRemaining = this.model.getMaxHands() - this.model.getHandsPlayed();
    const discardsRemaining = this.model.getMaxDiscards() - this.model.getDiscardsUsed();

    this.view.updateHandsCount(handsRemaining, this.model.getMaxHands());
    this.view.updateDiscardsCount(discardsRemaining, this.model.getMaxDiscards());
    this.view.enableActionButtons(
      this.model.isPlayHandAllowed(),
      this.model.isDiscardAllowed()
    );
  }
}