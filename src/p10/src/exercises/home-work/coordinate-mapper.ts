/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Maps mathematical coordinates to canvas pixel coordinates.
 */

export class CoordinateMapper {
  private mathXMax = 200;
  private mathYMax = 100;

  private readonly marginLeft = 65;
  private readonly marginTop = 35;
  private readonly marginRight = 20;
  private readonly marginBottom = 42;

  /**
   * @desc Constructor for CoordinateMapper class
   * @param canvasWidth, the width of the canvas in pixels
   * @param canvasHeight, the height of the canvas in pixels
   */
  constructor(private readonly canvasWidth: number, private readonly canvasHeight: number,) {}

  /**
   * @desc Sets the maximum mathematical coordinates and adds a 10% margin for better visualization.
   * @param xMax, the maximum x value in mathematical coordinates
   * @param yMax, the maximum y value in mathematical coordinates
   */
  setScale(xMax: number, yMax: number): void {
    this.mathXMax = xMax * 1.1;
    this.mathYMax = Math.max(yMax, 1) * 1.1;
  }

  /**
   * @desc Converts a mathematical x coordinate to a pixel x coordinate on the canvas.
   * @param mathX, the x coordinate in mathematical terms
   * @returns {number} the corresponding pixel x coordinate on the canvas
   */
  toPixelX(mathX: number): number {
    return this.marginLeft + (mathX / this.mathXMax) * this.drawableWidth();
  }

  /**
   * @desc Converts a mathematical y coordinate to a pixel y coordinate on the canvas.
   * @param mathY, the y coordinate in mathematical terms
   * @returns {number} the corresponding pixel y coordinate on the canvas
   */
  toPixelY(mathY: number): number {
    return this.marginTop + (1 - mathY / this.mathYMax) * this.drawableHeight();
  }

  /**
   * @desc Calculates a "nice" tick spacing for the axes based on the range of values and the drawable size of the canvas.
   * This method ensures that the ticks are spaced in a way that is visually appealing and easy to read, using common intervals like 1, 2, 5, 10, etc.
   * @param range, the range of values to be displayed on the axis (e.g., mathXMax or mathYMax)
   * @param drawSize, the drawable size of the canvas in pixels (e.g., drawableWidth or drawableHeight)
   * @param minGapPixels, the minimum gap in pixels between ticks (default is 60)
   * @returns {number} the calculated tick spacing in mathematical units
   */
  niceTickSpacing(range: number, drawSize: number, minGapPixels = 60): number {
    if (range <= 0 || drawSize <= 0) return 1;
    const rawSpacing = (range / drawSize) * minGapPixels;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawSpacing)));
    const normalized = rawSpacing / magnitude;
    if (normalized < 1.5) return magnitude;
    if (normalized < 3.5) return 2 * magnitude;
    if (normalized < 7.5) return 5 * magnitude;
    return 10 * magnitude;
  }

  /**
   * @desc Getter for the maximum mathematical x coordinate, which is used to determine the scale of the x-axis and the spacing of tick marks.
   * @returns {number} the maximum mathematical x coordinate
   */
  getMathXMax(): number { return this.mathXMax; }

  /**
   * @desc Getter for the maximum mathematical y coordinate, which is used to determine the scale of the y-axis and the spacing of tick marks.
   * @returns {number} the maximum mathematical y coordinate
   */
  getMathYMax(): number { return this.mathYMax; }

  /**
   * @desc Getter for the left margin in pixels, which is used to position the y-axis and to calculate the drawable area of the canvas.
   * @returns {number} the left margin in pixels
   */
  getMarginLeft(): number { return this.marginLeft; }

  /**
   * @desc Getter for the top margin in pixels, which is used to position the x-axis and to calculate the drawable area of the canvas.
   * @returns {number} the top margin in pixels
   */
  getMarginTop(): number { return this.marginTop; }

  /**
   * @desc Getter for the right margin in pixels, which is used to position the y-axis and to calculate the drawable area of the canvas.
   * @returns {number} the right margin in pixels
   */
  getMarginRight(): number { return this.marginRight; }

  /**
   * @desc Getter for the bottom margin in pixels, which is used to position the x-axis and to calculate the drawable area of the canvas.
   * @returns {number} the bottom margin in pixels
   */
  getMarginBottom(): number { return this.marginBottom; }

  /**
   * @desc Calculates the drawable width of the canvas by subtracting the left and right margins from the total canvas width. This value is used to determine how much horizontal space is available for drawing the axes, tick marks, and data points.
   * @returns {number} the drawable width of the canvas in pixels
   */
  drawableWidth(): number { return this.canvasWidth - this.marginLeft - this.marginRight; }

  /**
   * @desc Calculates the drawable height of the canvas by subtracting the top and bottom margins from the total canvas height. This value is used to determine how much vertical space is available for drawing the axes, tick marks, and data points.
   * @returns {number} the drawable height of the canvas in pixels
   */
  drawableHeight(): number { return this.canvasHeight - this.marginTop - this.marginBottom; }
}