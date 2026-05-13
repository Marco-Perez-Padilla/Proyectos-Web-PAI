/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc View layer – manages DOM elements, canvas, preloads card images and renders them.
 */

import { HtmlElementManager } from './html-element-manager.js';
import { CanvasRenderer } from './canvas-renderer.js';
import { ICard, IScorePreview } from './interfaces.js';

export class BalatroView {
  private domManager: HtmlElementManager = new HtmlElementManager();
  private canvasRenderer: CanvasRenderer = new CanvasRenderer();
  private handCanvas: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;

  private playHandButton: HTMLButtonElement;
  private discardButton: HTMLButtonElement;
  private handInfoButton: HTMLButtonElement;
  private sortButton: HTMLButtonElement;

  private imageMap: Map<string, HTMLImageElement> = new Map();

  /**
   * @desc Obtains DOM elements, 2D context, and preloads all card images.
   */
  constructor() {
    this.handCanvas = this.domManager.getElement('handCanvas') as HTMLCanvasElement;
    const context = this.handCanvas.getContext('2d');
    if (!context) throw new Error('2D context not available');
    this.renderingContext = context;

    this.playHandButton = this.domManager.getElement('playHandButton') as HTMLButtonElement;
    this.discardButton = this.domManager.getElement('discardButton') as HTMLButtonElement;
    this.handInfoButton = this.domManager.getElement('handInfoButton') as HTMLButtonElement;
    this.sortButton = this.domManager.getElement('sortButton') as HTMLButtonElement;

    this.preloadImages();
  }

  /**
   * @desc Preloads all 52 standard card images (SVG) into the image map.
   * @returns {Promise<void>} Resolves when all images are loaded or attempted to load.
   */
  private preloadImages(): Promise<void> {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks: { rank: string; name: string }[] = [
      { rank: 'A', name: 'ace' },
      { rank: 'K', name: 'king' },
      { rank: 'Q', name: 'queen' },
      { rank: 'J', name: 'jack' }
    ];
    for (let num = 2; num <= 10; num++) {
      ranks.push({ rank: num.toString(), name: num.toString() });
    }

    const promises: Promise<void>[] = [];

    for (const suit of suits) {
      for (const rankEntry of ranks) {
        const imagePath = `../../../img/SVG-cards-1.3/${rankEntry.name}_of_${suit}.svg`;
        const image = new Image();
        const promise = new Promise<void>((resolve) => {
          image.onload = () => resolve();
          image.onerror = () => resolve(); 
        });
        image.src = imagePath;
        this.imageMap.set(imagePath, image);
        promises.push(promise);
      }
    }

    return Promise.all(promises).then(() => {});
  }

  /**
   * @desc Binds user actions to the provided controller callbacks.
   * @param onCardClick - Callback for card clicks (index).
   * @param onPlayHand - Callback for Play Hand button.
   * @param onDiscard - Callback for Discard button.
   * @param onSort - Callback for Sort button.
   */
  registerEventListeners(
    onCardClick: (index: number) => void,
    onPlayHand: () => void,
    onDiscard: () => void,
    onSort: () => void
  ): void {
    this.handCanvas.addEventListener('click', (event: MouseEvent) => {
      const rect = this.handCanvas.getBoundingClientRect();
      const xPoint = event.clientX - rect.left;
      const index = this.getCardIndexFromCoordinates(xPoint);
      if (index !== -1) onCardClick(index);
    });
    this.playHandButton.addEventListener('click', onPlayHand);
    this.discardButton.addEventListener('click', onDiscard);
    this.sortButton.addEventListener('click', onSort);
    // Hand Info button intentionally does nothing
    this.handInfoButton.addEventListener('click', () => {});
  }

  /**
   * @desc Determines which card was clicked based on X coordinate.
   * @param xPoint - X position relative to the canvas.
   * @returns {number} Card index or -1.
   */
  private getCardIndexFromCoordinates(xPoint: number): number {
    const cardWidth = 80;
    const spacing = 10;
    const totalSlots = 8;
    const startX = (this.handCanvas.width - (totalSlots * (cardWidth + spacing) - spacing)) / 2;
    for (let index = 0; index < totalSlots; index++) {
      const cardX = startX + index * (cardWidth + spacing);
      if (xPoint >= cardX && xPoint <= cardX + cardWidth) return index;
    }
    return -1;
  }

  /**
   * @desc Renders the current hand on the canvas using preloaded images.
   * @param cards - Hand cards.
   * @param selectedIndices - Selected indices.
   */
  renderHandCards(cards: ICard[], selectedIndices: Set<number>): void {
    this.canvasRenderer.drawCards(
      this.renderingContext,
      cards,
      selectedIndices,
      this.handCanvas.width,
      this.handCanvas.height,
      this.imageMap
    );
  }

  /**
   * @desc Updates the score preview section.
   * @param preview - Score data or null.
   */
  updateScorePreview(preview: IScorePreview | null): void {
    const handNameElement = this.domManager.getElement('handNameDisplay');
    const scoreElement = this.domManager.getElement('handScoreDisplay');
    if (preview) {
      handNameElement.textContent = `${preview.handName}`;
      scoreElement.textContent = `${preview.totalChips} x ${preview.baseMultiplier} = ${preview.totalScore}`;
    } else {
      handNameElement.textContent = '';
      scoreElement.textContent = '';
    }
  }

  /**
   * @desc Shows remaining cards in the deck.
   * @param remaining - Number of cards.
   */
  updateDeckCount(remaining: number): void {
    this.domManager.setTextContent('deckCountDisplay', `${remaining}/52 cards`);
  }

  /**
   * @desc Updates target and current score displays.
   * @param target - Target score.
   * @param current - Current score.
   */
  updateTargetAndScore(target: number, current: number): void {
    this.domManager.setTextContent('targetScoreDisplay', `Goal: ${target}`);
    this.domManager.setTextContent('currentScoreDisplay', `Score: ${current}`);
  }

  /**
   * @desc Updates the hands count display (remaining / max).
   * @param remaining - Number of hands left.
   * @param max - Maximum allowed hands.
   */
  updateHandsCount(remaining: number, max: number): void {
    this.domManager.setTextContent('handsCountDisplay', `Hands: ${remaining}/${max}`);
  }

  /**
   * @desc Updates the discards count display (remaining / max).
   * @param remaining - Number of discards left.
   * @param max - Maximum allowed discards.
   */
  updateDiscardsCount(remaining: number, max: number): void {
    this.domManager.setTextContent('discardsCountDisplay', `Discards: ${remaining}/${max}`);
  }

  /**
   * @desc Displays game over message and disables action buttons.
   * @param message - Message to show.
   */
  showGameOver(message: string): void {
    this.domManager.setTextContent('statusMessage', message);
    this.domManager.setButtonDisabled('playHandButton', true);
    this.domManager.setButtonDisabled('discardButton', true);
  }

  /**
   * @desc Displays round cleared message and disables actions.
   */
  showRoundCleared(): void {
    this.domManager.setTextContent('statusMessage', 'Blind cleared!');
    this.domManager.setButtonDisabled('playHandButton', true);
    this.domManager.setButtonDisabled('discardButton', true);
  }

  /**
   * @desc Sets the click handler for the Sort: Rank button.
   * @param callback - Function to execute on click.
   */
  setSortHandler(callback: () => void): void {
    this.sortButton.addEventListener('click', callback);
  }

  /**
   * @desc Updates the selection indicator texts (inline count and "Selected: X/5").
   * @param count - Number of currently selected cards.
   */
  updateSelectedDisplay(count: number): void {
    this.domManager.setTextContent('selectedCountDisplay', `${count}`);
    this.domManager.setTextContent('selectedMaxDisplay', `Selected: ${count}/5`);
  }

  /**
   * @desc Enables/disables Play Hand and Discard buttons based on allowed states.
   * @param playAllowed - If Play Hand is allowed.
   * @param discardAllowed - If Discard is allowed.
   */
  enableActionButtons(playAllowed: boolean, discardAllowed: boolean): void {
    this.domManager.setButtonDisabled('playHandButton', !playAllowed);
    this.domManager.setButtonDisabled('discardButton', !discardAllowed);
  }
}