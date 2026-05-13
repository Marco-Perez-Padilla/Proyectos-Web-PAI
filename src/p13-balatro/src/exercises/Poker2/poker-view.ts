/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since May 4, 2026
 * @desc View layer for Poker-1 game. Renders cards and shows points.
 */

import { HtmlElementManager } from './html-element-manager.js';
import { CanvasRenderer } from './canvas-renderer.js';
import { ICard } from './interfaces.js';

export class PokerView {
  private domManager: HtmlElementManager = new HtmlElementManager();
  private canvasRenderer: CanvasRenderer = new CanvasRenderer();
  private hand1Canvas: HTMLCanvasElement;
  private hand2Canvas: HTMLCanvasElement;
  private renderingContext: CanvasRenderingContext2D;

  private playGreaterButton: HTMLButtonElement;
  private playLessThanButton: HTMLButtonElement;
  private newGameButton: HTMLButtonElement;

  private imageMap: Map<string, HTMLImageElement> = new Map();
  private jokerMap: Map<string, HTMLImageElement> = new Map();

  /**
   * @desc Obtains DOM elements, 2D context, and preloads card images.
   */
  constructor() {
    this.hand1Canvas = this.domManager.getElement('hand1Canvas') as HTMLCanvasElement;
    this.hand2Canvas = this.domManager.getElement('hand2Canvas') as HTMLCanvasElement;
    const context1 = this.hand1Canvas.getContext('2d');
    const context2 = this.hand2Canvas.getContext('2d');
    if (!context1 || !context2) throw new Error('2D context not available');
    this.renderingContext = context1;

    this.playGreaterButton = this.domManager.getElement('playGreaterButton') as HTMLButtonElement;
    this.playLessThanButton = this.domManager.getElement('playLessThanButton') as HTMLButtonElement;
    this.newGameButton = this.domManager.getElement('newGamebutton') as HTMLButtonElement;

    this.preloadImages();
  }

  /**
   * @desc Preloads all 52 standard card images (SVG) into the image map.
   * @returns {Promise<void>} Resolves when all images are loaded or attempted to load.
   */
  async preloadImages(): Promise<void> {
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

    await Promise.all(promises);
  }

  /**
   * @desc Preloads Joker card
   * @returns {Promise<void>} Resolves when all images are loaded or attempted to load.
   */
  async preloadJoker(): Promise<void> {
    const promises: Promise<void>[] = [];
    const imagePath = `../../../img/jokers/blueJoker.png`;
    const image = new Image();
    const promise = new Promise<void>((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
    });
    image.src = imagePath;
    this.jokerMap.set(imagePath, image);
    promises.push(promise);
    await Promise.all(promises);
  }

  /**
   * @desc Registers button callbacks.
   * @param onHigher - Callback for "Mayor" button.
   * @param onLower - Callback for "Menor" button.
   * @param onNewGame - Callback for "Nuevo Juego" button.
   */
  registerEventListeners(
    onHigher: () => void,
    onLower: () => void,
    onNewGame: () => void
  ): void {
    this.playGreaterButton.addEventListener('click', onHigher);
    this.playLessThanButton.addEventListener('click', onLower);
    this.newGameButton.addEventListener('click', onNewGame);
  }

  /**
   * @desc Renders the hand: first cards visible, rest hidden.
   * @param visibleCards - Cards already revealed.
   * @param hiddenCount - Number of cards to show face-down.
   */
  renderCards(visibleCards: ICard[], hiddenCount: number): void {
    this.canvasRenderer.drawCardsWithHidden(
      this.renderingContext,
      visibleCards,
      hiddenCount,
      this.hand1Canvas.width,
      this.hand1Canvas.height,
      this.imageMap,
      this.jokerMap
    );
  }

  /**
   * @desc Updates the points display.
   * @param points - Current points.
   */
  updatePoints(points: number): void {
    this.domManager.setTextContent('pointsDisplay', `${points}`);
  }

  /**
   * @desc Shows a status message.
   * @param message - Text to display.
   */
  showStatusMessage(message: string): void {
    this.domManager.setTextContent('statusMessage', message);
  }

  /**
   * @desc Enables or disables the guess buttons.
   * @param enabled - True to enable.
   */
  enableGuessButtons(enabled: boolean): void {
    this.domManager.setButtonDisabled('playGreaterButton', !enabled);
    this.domManager.setButtonDisabled('playLessThanButton', !enabled);
  }
}