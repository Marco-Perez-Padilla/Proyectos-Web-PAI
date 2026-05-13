/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Draws the coordinate axes, and numeric labels.
 */

import { Drawable } from './drawable.js';
import { CoordinateSystem } from './coordinateSystem.js';

/**
 * @desc Auxiliar style configuration for axis and grid rendering
 */
export interface AxisStyle {
  axisColour: string;
  gridColour: string;
  tickLabelFont: string;
  tickLengthPixels: number;
}

export class AxisRenderer implements Drawable {
  private readonly ARROW_SIZE = 8;
  private readonly TICK_LABEL_OFFSET = 4;

  /**
   * @param coordinateSystem - Mapping between math space and pixel space.
   * @param style - Colours, fonts, and sizes for axes, ticks, and grid.
   * @param tickSpacingMathUnits - Gap between ticks in mathematical units.
   */
  constructor(private readonly coordinateSystem: CoordinateSystem, private readonly style: AxisStyle,
              private readonly tickSpacingMathUnits = 1,) {}

  /**
   * @desc Draws grid lines, axes, ticks, and numeric labels onto the context.
   * @param context - The canvas 2D context to draw onto.
   */
  draw(context: CanvasRenderingContext2D): void {
    this.drawGrid(context);
    this.drawXAxis(context);
    this.drawYAxis(context);
  }

  /**
   * @desc Draws faint vertical and horizontal grid lines at every tick position.
   * @param context - The canvas 2D context to draw onto.
   */
  private drawGrid(context: CanvasRenderingContext2D): void {
    context.save();
    context.strokeStyle = this.style.gridColour;
    context.lineWidth = 0.5;

    const xStart = Math.ceil(this.coordinateSystem.getMathXMin() / this.tickSpacingMathUnits) * this.tickSpacingMathUnits;
    for (let mathX = xStart; mathX <= this.coordinateSystem.getMathXMax(); mathX += this.tickSpacingMathUnits) {
      const pixelX = this.coordinateSystem.toCanvasX(mathX);
      context.beginPath();
      context.moveTo(pixelX, 0);
      context.lineTo(pixelX, this.coordinateSystem.getCanvasHeightPixels());
      context.stroke();
    }

    const yStart = Math.ceil(this.coordinateSystem.getMathYMin() / this.tickSpacingMathUnits) * this.tickSpacingMathUnits;
    for (let mathY = yStart; mathY <= this.coordinateSystem.getMathYMax(); mathY += this.tickSpacingMathUnits) {
      const pixelY = this.coordinateSystem.toCanvasY(mathY);
      context.beginPath();
      context.moveTo(0, pixelY);
      context.lineTo(this.coordinateSystem.getCanvasWidthPixels(), pixelY);
      context.stroke();
    }

    context.restore();
  }

  /**
   * @desc Draws the horizontal x-axis with tick marks and numeric labels.
   * @param context - The canvas 2D context to draw onto.
   */
  private drawXAxis(context: CanvasRenderingContext2D): void {
    const axisPixelY = this.coordinateSystem.toCanvasY(0);
    const extendedMathX = this.coordinateSystem.getMathXMax() + this.tickSpacingMathUnits / 2;
    const endPixelX = this.coordinateSystem.toCanvasX(extendedMathX);
    const startPixelX = this.coordinateSystem.toCanvasX(this.coordinateSystem.getMathXMin());

    context.save();
    context.strokeStyle = this.style.axisColour;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(startPixelX, axisPixelY);
    context.lineTo(endPixelX, axisPixelY);
    context.stroke();

    this.drawArrowHead(context, endPixelX, axisPixelY, 'right');

    context.font = 'italic 13px serif';
    context.fillStyle = this.style.axisColour;
    context.textAlign = 'left';
    context.textBaseline = 'bottom';
    context.fillText('x', endPixelX - 2, axisPixelY - 8);

    context.font = this.style.tickLabelFont;
    context.fillStyle = this.style.axisColour;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    const xStart = Math.ceil(this.coordinateSystem.getMathXMin() / this.tickSpacingMathUnits) * this.tickSpacingMathUnits;
    for (let mathX = xStart; mathX <= this.coordinateSystem.getMathXMax(); mathX += this.tickSpacingMathUnits) {
      if (Math.abs(mathX) < 1e-10) continue; 
      const pixelX = this.coordinateSystem.toCanvasX(mathX);
      context.beginPath();
      context.moveTo(pixelX, axisPixelY - this.style.tickLengthPixels);
      context.lineTo(pixelX, axisPixelY + this.style.tickLengthPixels);
      context.stroke();
      context.fillText(
        String(Math.round(mathX)),
        pixelX,
        axisPixelY + this.style.tickLengthPixels + this.TICK_LABEL_OFFSET
      );
    }

    if (this.coordinateSystem.getMathYMin() <= 0 && this.coordinateSystem.getMathYMax() >= 0) {
      context.fillStyle = this.style.axisColour;
      context.textAlign = 'right';
      context.textBaseline = 'top';
      context.fillText('0', this.coordinateSystem.toCanvasX(0) - this.TICK_LABEL_OFFSET, axisPixelY + 2);
    }

    context.restore();
  }

  /**
   * @desc Draws the vertical y-axis with tick marks and numeric labels.
   * @param context - The canvas 2D context to draw onto.
   */
  private drawYAxis(context: CanvasRenderingContext2D): void {
    const axisPixelX = this.coordinateSystem.toCanvasX(0);
    
    let rawMin = this.coordinateSystem.getMathYMin();
    let rawMax = this.coordinateSystem.getMathYMax();
    
    const mathYMin = Math.min(rawMin, rawMax);
    const mathYMax = Math.max(rawMin, rawMax);
    
    const extendedMathY = mathYMax + this.tickSpacingMathUnits / 2;
    const endPixelY = this.coordinateSystem.toCanvasY(extendedMathY);
    const startPixelY = this.coordinateSystem.toCanvasY(mathYMin);
    
    context.save();
    context.strokeStyle = this.style.axisColour;
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(axisPixelX, startPixelY);
    context.lineTo(axisPixelX, endPixelY);
    context.stroke();
    
    this.drawArrowHead(context, axisPixelX, endPixelY, 'up');
    
    context.font = 'italic 13px serif';
    context.fillStyle = this.style.axisColour;
    context.textAlign = 'center';
    context.textBaseline = 'bottom';
    context.fillText('y', axisPixelX, endPixelY - this.ARROW_SIZE - 2);
    
    context.font = this.style.tickLabelFont;
    context.fillStyle = this.style.axisColour;
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    
    const yStart = Math.ceil(mathYMin / this.tickSpacingMathUnits) * this.tickSpacingMathUnits;
    for (let mathY = yStart; mathY <= mathYMax; mathY += this.tickSpacingMathUnits) {
      if (Math.abs(mathY) < 1e-10) continue;
      const pixelY = this.coordinateSystem.toCanvasY(mathY);
      context.beginPath();
      context.moveTo(axisPixelX - this.style.tickLengthPixels, pixelY);
      context.lineTo(axisPixelX + this.style.tickLengthPixels, pixelY);
      context.stroke();
      context.fillText(
        String(Math.round(mathY)),
        axisPixelX - this.style.tickLengthPixels - this.TICK_LABEL_OFFSET,
        pixelY
      );
    }
    
    context.restore();
  }

  /**
   * @desc Draws a small arrowhead at the given position pointing in the given direction.
   * @param context - Canvas 2D context.
   * @param tipPixelX - Pixel x of the arrowhead tip.
   * @param tipPixelY - Pixel y of the arrowhead tip.
   * @param direction - Cardinal direction the arrow points toward.
   */
  private drawArrowHead(context: CanvasRenderingContext2D, tipPixelX: number, tipPixelY: number, direction: 'right' | 'up',): void {
    const size = this.ARROW_SIZE;
    context.fillStyle = this.style.axisColour;
    context.beginPath();

    if (direction === 'right') {
      context.moveTo(tipPixelX, tipPixelY);
      context.lineTo(tipPixelX - size, tipPixelY - size / 2);
      context.lineTo(tipPixelX - size, tipPixelY + size / 2);
    } else {
      context.moveTo(tipPixelX, tipPixelY);
      context.lineTo(tipPixelX - size / 2, tipPixelY + size);
      context.lineTo(tipPixelX + size / 2, tipPixelY + size);
    }

    context.closePath();
    context.fill();
  }
}