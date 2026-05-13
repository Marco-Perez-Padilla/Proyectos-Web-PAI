/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Simple canvas renderer for cards, drawing preloaded images.
 */

import { ICard } from './interfaces.js';

export class CanvasRenderer {
  /**
   * @desc Draws the cards as rectangles with the card image inside, highlighting selected ones.
   * @param renderingContext - The 2D rendering context.
   * @param cards - The cards to display.
   * @param selectedIndices - Indices of the selected cards.
   * @param canvasWidth - Width in pixels.
   * @param canvasHeight - Height in pixels.
   * @param imageMap - A map of imagePath -> HTMLImageElement with preloaded images.
   */
  drawCards(
    renderingContext: CanvasRenderingContext2D,
    cards: ICard[],
    selectedIndices: Set<number>,
    canvasWidth: number,
    canvasHeight: number,
    imageMap: Map<string, HTMLImageElement>
  ): void {
    renderingContext.clearRect(0, 0, canvasWidth, canvasHeight);
    const cardWidth = 120;
    const cardHeight = 180;
    const spacing = 10;
    const startX = (canvasWidth - (cards.length * (cardWidth + spacing) - spacing)) / 2;
    const verticalCenter = canvasHeight / 2 - cardHeight / 2;

    cards.forEach((card, index) => {
      const cardX = startX + index * (cardWidth + spacing);
      const cardY = verticalCenter;

      if (selectedIndices.has(index)) {
        renderingContext.strokeStyle = 'gold';
        renderingContext.lineWidth = 4;
        renderingContext.strokeRect(cardX - 2, cardY - 2, cardWidth + 4, cardHeight + 4);
      }

      renderingContext.fillStyle = 'white';
      renderingContext.fillRect(cardX, cardY, cardWidth, cardHeight);
      renderingContext.strokeStyle = 'black';
      renderingContext.lineWidth = 2;
      renderingContext.strokeRect(cardX, cardY, cardWidth, cardHeight);

      const image = imageMap.get(card.imagePath);
      if (image && image.complete && image.naturalWidth > 0) {
        renderingContext.drawImage(image, cardX + 2, cardY + 2, cardWidth - 4, cardHeight - 4);
      } else {
        renderingContext.fillStyle = 'black';
        renderingContext.font = '14px sans-serif';
        renderingContext.textAlign = 'center';
        renderingContext.fillText(card.rank, cardX + cardWidth / 2, cardY + 40);
        renderingContext.fillText(card.suit, cardX + cardWidth / 2, cardY + 70);
      }
    });
  }

  /**
   * @desc Draws visible cards plus hidden face-down cards.
   * @param renderingContext - Canvas 2D context.
   * @param visibleCards - Cards to show face-up.
   * @param hiddenCount - Number of face-down cards to draw after the visible ones.
   * @param canvasWidth - Canvas width.
   * @param canvasHeight - Canvas height.
   * @param imageMap - Map of image paths to preloaded HTMLImageElements.
   */
  drawCardsWithHidden(
    renderingContext: CanvasRenderingContext2D,
    visibleCards: ICard[],
    hiddenCount: number,
    canvasWidth: number,
    canvasHeight: number,
    imageMap: Map<string, HTMLImageElement>,
    jokerMap: Map<string, HTMLImageElement>
  ): void {
    renderingContext.clearRect(0, 0, canvasWidth, canvasHeight);
    const cardWidth = 80;
    const cardHeight = 120;
    const spacing = 10;
    const totalCards = visibleCards.length + hiddenCount;
    const startX = (canvasWidth - (totalCards * (cardWidth + spacing) - spacing)) / 2;
    const verticalCenter = canvasHeight / 2 - cardHeight / 2;

    visibleCards.forEach((card, index) => {
      const cardX = startX + index * (cardWidth + spacing);
      const cardY = verticalCenter;
      this.drawCardFaceUp(renderingContext, card, cardX, cardY, cardWidth, cardHeight, imageMap);
    });

    for (let hiddenIndex = 0; hiddenIndex < hiddenCount; hiddenIndex++) {
      const cardX = startX + (visibleCards.length + hiddenIndex) * (cardWidth + spacing);
      const cardY = verticalCenter;
      this.drawCardFaceDown(renderingContext, cardX, cardY, cardWidth, cardHeight, jokerMap);
    }
  }

  /**
   * @desc Draws a single face-up card with its image.
   * @param renderingContext - Canvas 2D context.
   * @param card - Card data.
   * @param cardX - X position.
   * @param cardY - Y position.
   * @param cardWidth - Width of the card.
   * @param cardHeight - Height of the card.
   * @param imageMap - Preloaded images.
   */
  private drawCardFaceUp(
    renderingContext: CanvasRenderingContext2D,
    card: ICard,
    cardX: number,
    cardY: number,
    cardWidth: number,
    cardHeight: number,
    imageMap: Map<string, HTMLImageElement>
  ): void {
    renderingContext.fillStyle = 'white';
    renderingContext.fillRect(cardX, cardY, cardWidth, cardHeight);
    renderingContext.strokeStyle = 'black';
    renderingContext.lineWidth = 2;
    renderingContext.strokeRect(cardX, cardY, cardWidth, cardHeight);

    const image = imageMap.get(card.imagePath);
    if (image && image.complete && image.naturalWidth > 0) {
      renderingContext.drawImage(image, cardX + 2, cardY + 2, cardWidth - 4, cardHeight - 4);
    } else {
      renderingContext.fillStyle = 'black';
      renderingContext.font = '14px sans-serif';
      renderingContext.textAlign = 'center';
      renderingContext.fillText(card.rank, cardX + cardWidth / 2, cardY + 40);
      renderingContext.fillText(card.suit, cardX + cardWidth / 2, cardY + 70);
    }
  }

  /**
   * @desc Draws a face-down card with the unique Joker image from jokerMap.
   * @param renderingContext - Canvas 2D context.
   * @param cardX - X position.
   * @param cardY - Y position.
   * @param cardWidth - Width of the card.
   * @param cardHeight - Height of the card.
   * @param jokerMap - Map containing the unique Joker image.
   */
  private drawCardFaceDown(
    renderingContext: CanvasRenderingContext2D,
    cardX: number,
    cardY: number,
    cardWidth: number,
    cardHeight: number,
    jokerMap: Map<string, HTMLImageElement>
  ): void {
    renderingContext.fillStyle = 'white';
    renderingContext.fillRect(cardX, cardY, cardWidth, cardHeight);
    renderingContext.strokeStyle = 'black';
    renderingContext.lineWidth = 2;
    renderingContext.strokeRect(cardX, cardY, cardWidth, cardHeight);
    const jokerImage = jokerMap.values().next().value;
    if (jokerImage && jokerImage.complete && jokerImage.naturalWidth > 0) {
      renderingContext.drawImage(jokerImage, cardX + 2, cardY + 2, cardWidth - 4, cardHeight - 4);
    } else {
      renderingContext.fillStyle = 'black';
      renderingContext.font = '14px sans-serif';
      renderingContext.textAlign = 'center';
      renderingContext.fillText('?', cardX + cardWidth / 2, cardY + cardHeight / 2 + 5);
    }
  }
}