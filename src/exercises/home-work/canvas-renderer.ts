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
  drawCards(renderingContext: CanvasRenderingContext2D, cards: ICard[],
            selectedIndices: Set<number>, canvasWidth: number,
            canvasHeight: number, imageMap: Map<string, HTMLImageElement>): void {
            renderingContext.clearRect(0, 0, canvasWidth, canvasHeight);
    const cardWidth = 80;
    const cardHeight = 120;
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
}