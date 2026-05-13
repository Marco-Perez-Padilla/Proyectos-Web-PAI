/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Draws coordinate axes, grid lines and tick marks on the main canvas.
 */

import { CoordinateMapper } from './coordinate-mapper.js';

/**
 * @desc Defines the style properties for the axes, grid and tick marks.
 */
export interface AxisStyle {
  axisColor: string;
  gridColor: string;
  tickFont: string;
  tickLength: number;
}

export class AxisRenderer {
  /**
   * @desc Constructor for AxisRenderer class
   * @param context, the 2D rendering context of the main canvas
   * @param mapper, an instance of CoordinateMapper used to convert mathematical coordinates to pixel coordinates
   * @param style, the style to be used for rendering the axes, grid and tick marks (colors, fonts, etc.)
   */
  constructor(private readonly context: CanvasRenderingContext2D, private readonly mapper: CoordinateMapper, 
              private readonly style: AxisStyle,) {}

  /**
   * @desc Draws the coordinate axes, grid lines and tick marks on the canvas. If an initial height is provided, it also draws a dashed line representing that height.
   * @param initialHeight, if greater than 0, is drawn as a dashed line across the canvas to indicate the initial height of the projectile.
   */
  drawAxes(initialHeight: number): void {
    this.drawGrid();
    this.drawXAxis();
    this.drawYAxis();
    if (initialHeight > 0) this.drawInitialHeightLine(initialHeight);
  }

  /**
   * @desc Draws the grid lines on the canvas based on the tick spacing calculated from the coordinate mapper. The grid lines are drawn in a light color defined in the style properties.
   */
  private drawGrid(): void {
    const tickSpacingX = this.mapper.niceTickSpacing(this.mapper.getMathXMax(), this.mapper.drawableWidth());
    const tickSpacingY = this.mapper.niceTickSpacing(this.mapper.getMathYMax(), this.mapper.drawableHeight());
    this.context.save();
    this.context.strokeStyle = this.style.gridColor;
    this.context.lineWidth = 0.5;
    for (let mathX = 0; mathX <= this.mapper.getMathXMax(); mathX += tickSpacingX) {
      const pixelX = this.mapper.toPixelX(mathX);
      this.context.beginPath();
      this.context.moveTo(pixelX, this.mapper.getMarginTop());
      this.context.lineTo(pixelX, this.mapper.getMarginTop() + this.mapper.drawableHeight());
      this.context.stroke();
    }
    for (let mathY = 0; mathY <= this.mapper.getMathYMax(); mathY += tickSpacingY) {
      const pixelY = this.mapper.toPixelY(mathY);
      this.context.beginPath();
      this.context.moveTo(this.mapper.getMarginLeft(), pixelY);
      this.context.lineTo(this.mapper.getMarginLeft() + this.mapper.drawableWidth(), pixelY);
      this.context.stroke();
    }
    this.context.restore();
  }

  /**
   * @desc Draws the x-axis on the canvas, including the axis line, arrowhead, label and tick marks. The axis is drawn in a color defined in the style properties, and the tick marks are labeled with their corresponding mathematical values.
   */
  private drawXAxis(): void {
    const axisPixelY = this.mapper.toPixelY(0);
    const axisEndPixelX = this.mapper.getMarginLeft() + this.mapper.drawableWidth() + 12;
    this.context.save();
    this.context.strokeStyle = this.style.axisColor;
    this.context.fillStyle = this.style.axisColor;
    this.context.lineWidth = 1.5;
    this.context.beginPath();
    this.context.moveTo(this.mapper.getMarginLeft(), axisPixelY);
    this.context.lineTo(axisEndPixelX, axisPixelY);
    this.context.stroke();
    this.drawAxisArrowhead(axisEndPixelX, axisPixelY, 'right');
    this.context.font = 'italic 13px serif';
    this.context.textAlign = 'left';
    this.context.textBaseline = 'bottom';
    this.context.fillText('x (m)', axisEndPixelX + 4, axisPixelY - 2);
    this.drawXTickMarks(axisPixelY);
    this.context.font = this.style.tickFont;
    this.context.textAlign = 'right';
    this.context.textBaseline = 'top';
    this.context.fillText('0', this.mapper.toPixelX(0) - 5, axisPixelY + 4);
    this.context.restore();
  }

  /**
   * @desc Draws the tick marks along the x-axis, labeling them with their corresponding mathematical values. The tick spacing is calculated using the coordinate mapper's niceTickSpacing method, and the tick marks are drawn in a color defined in the style properties.
   * @param axisPixelY, the pixel y-coordinate of the x-axis, used to position the tick marks and their labels correctly along the axis.
   */
  private drawXTickMarks(axisPixelY: number): void {
    const tickSpacingX = this.mapper.niceTickSpacing(this.mapper.getMathXMax(), this.mapper.drawableWidth());
    const tickLength = this.style.tickLength;
    this.context.font = this.style.tickFont;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';
    for (let mathX = tickSpacingX; mathX <= this.mapper.getMathXMax(); mathX += tickSpacingX) {
      const pixelX = this.mapper.toPixelX(mathX);
      this.context.beginPath();
      this.context.moveTo(pixelX, axisPixelY - tickLength);
      this.context.lineTo(pixelX, axisPixelY + tickLength);
      this.context.stroke();
      this.context.fillText(String(Math.round(mathX)), pixelX, axisPixelY + tickLength + 2);
    }
  }

  /**
   * @desc Draws the y-axis on the canvas, including the axis line, arrowhead, label and tick marks. The axis is drawn in a color defined in the style properties, and the tick marks are labeled with their corresponding mathematical values.
   */
  private drawYAxis(): void {
    const axisPixelX = this.mapper.toPixelX(0);
    const axisTopPixelY = this.mapper.getMarginTop() - 12;
    const axisBottomPixelY = this.mapper.getMarginTop() + this.mapper.drawableHeight();
    this.context.save();
    this.context.strokeStyle = this.style.axisColor;
    this.context.fillStyle = this.style.axisColor;
    this.context.lineWidth = 1.5;
    this.context.beginPath();
    this.context.moveTo(axisPixelX, axisBottomPixelY);
    this.context.lineTo(axisPixelX, axisTopPixelY);
    this.context.stroke();
    this.drawAxisArrowhead(axisPixelX, axisTopPixelY, 'up');
    this.context.font = 'italic 13px serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'bottom';
    this.context.fillText('y (m)', axisPixelX, axisTopPixelY - 4);
    this.drawYTickMarks(axisPixelX);
    this.context.restore();
  }

  /**
   * @desc Draws the tick marks along the y-axis, labeling them with their corresponding mathematical values. The tick spacing is calculated using the coordinate mapper's niceTickSpacing method, and the tick marks are drawn in a color defined in the style properties.
   * @param axisPixelX, the pixel x-coordinate of the y-axis, used to position the tick marks and their labels correctly along the axis.
   */
  private drawYTickMarks(axisPixelX: number): void {
    const tickSpacingY = this.mapper.niceTickSpacing(this.mapper.getMathYMax(), this.mapper.drawableHeight());
    const tickLength = this.style.tickLength;
    this.context.font = this.style.tickFont;
    this.context.textAlign = 'right';
    this.context.textBaseline = 'middle';
    for (let mathY = tickSpacingY; mathY <= this.mapper.getMathYMax(); mathY += tickSpacingY) {
      const pixelY = this.mapper.toPixelY(mathY);
      this.context.beginPath();
      this.context.moveTo(axisPixelX - tickLength, pixelY);
      this.context.lineTo(axisPixelX + tickLength, pixelY);
      this.context.stroke();
      this.context.fillText(String(Math.round(mathY)), axisPixelX - tickLength - 3, pixelY);
    }
  }

  /**
   * @desc Draws a dashed line across the canvas to indicate the initial height of the projectile. The line is drawn in a light color defined in the style properties, and is labeled with the initial height value for clarity.
   * @param initialHeight, the initial height of the projectile, which is converted to pixel coordinates using the coordinate mapper and used to position the dashed line correctly on the canvas.
   */
  private drawInitialHeightLine(initialHeight: number): void {
    const heightPixelY = this.mapper.toPixelY(initialHeight);
    const originPixelX = this.mapper.toPixelX(0);
    this.context.save();
    this.context.setLineDash([5, 4]);
    this.context.strokeStyle = 'lightcoral';
    this.context.lineWidth = 1;
    this.context.beginPath();
    this.context.moveTo(originPixelX, heightPixelY);
    this.context.lineTo(this.mapper.getMarginLeft() + this.mapper.drawableWidth(), heightPixelY);
    this.context.stroke();
    this.context.fillStyle = 'lightcoral';
    this.context.font = this.style.tickFont;
    this.context.textAlign = 'left';
    this.context.textBaseline = 'bottom';
    this.context.fillText(`h₀ = ${initialHeight} m`, originPixelX + 6, heightPixelY - 2);
    this.context.restore();
  }

  /**
   * @desc Draws an arrowhead at the end of the axis line to indicate the positive direction. The arrowhead is drawn as a filled triangle, with its size and orientation determined by the specified direction ('right' for x-axis and 'up' for y-axis). The color of the arrowhead is defined in the style properties.
   * @param tipPixelX, the pixel x-coordinate of the tip of the arrowhead, used to position the arrowhead correctly at the end of the axis line.
   * @param tipPixelY, the pixel y-coordinate of the tip of the arrowhead, used to position the arrowhead correctly at the end of the axis line.
   * @param direction, a string that specifies the orientation of the arrowhead, where 'right' indicates an arrow pointing to the right (for the x-axis) and 'up' indicates an arrow pointing upwards (for the y-axis).
   */
  private drawAxisArrowhead(tipPixelX: number, tipPixelY: number, direction: 'right' | 'up'): void {
    const arrowSize = 8;
    this.context.save();
    this.context.fillStyle = this.style.axisColor;
    this.context.beginPath();
    if (direction === 'right') {
      this.context.moveTo(tipPixelX, tipPixelY);
      this.context.lineTo(tipPixelX - arrowSize, tipPixelY - arrowSize / 2);
      this.context.lineTo(tipPixelX - arrowSize, tipPixelY + arrowSize / 2);
    } else {
      this.context.moveTo(tipPixelX, tipPixelY);
      this.context.lineTo(tipPixelX - arrowSize / 2, tipPixelY + arrowSize);
      this.context.lineTo(tipPixelX + arrowSize / 2, tipPixelY + arrowSize);
    }
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }
}