/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Maps mathematical coordinates to canvas pixel positions.
 */

export class CoordinateSystem {
  private readonly drawWidth: number;
  private readonly drawHeight: number;
  private readonly offsetX: number;
  private readonly offsetY: number;

  /**
   * @param mathXMin - Left boundary of the mathematical domain.
   * @param mathXMax - Right boundary of the mathematical domain.
   * @param mathYMin - Bottom boundary of the mathematical range.
   * @param mathYMax - Top boundary of the mathematical range.
   * @param canvasWidthPixels - Width of the rendering canvas in pixels.
   * @param canvasHeightPixels - Height of the rendering canvas in pixels.
   */
  constructor(private readonly mathXMin: number, private readonly mathXMax: number, private readonly mathYMin: number, 
              private readonly mathYMax: number, private readonly canvasWidthPixels: number, private readonly canvasHeightPixels: number,
              marginLeft: number = 20, marginTop: number = 40, marginRight: number = 80, marginBottom: number = 40,) {
    this.mathXMin = Math.min(mathXMin, mathXMax);
    this.mathXMax = Math.max(mathXMin, mathXMax);
    this.mathYMin = Math.min(mathYMin, mathYMax);
    this.mathYMax = Math.max(mathYMin, mathYMax);

    this.drawWidth = canvasWidthPixels - marginLeft - marginRight;
    this.drawHeight = canvasHeightPixels - marginTop - marginBottom;
    this.offsetX = marginLeft;
    this.offsetY = marginTop;
  }

  /**
   * @desc Returns the minimum x value of the mathematical domain.
   * @returns The minimum x value in math space.
   */
  getMathXMin(): number { return this.mathXMin; }

  /**
   * @desc Returns the maximum x value of the mathematical domain.
   * @returns The maximum x value in math space.
   */
  getMathXMax(): number { return this.mathXMax; }

  /**
   * @desc Returns the minimum y value of the mathematical domain.
   * @returns The minimum y value in math space.
   */
  getMathYMin(): number { return this.mathYMin; }

  /**
   * @desc Returns the maximum y value of the mathematical domain.
   * @returns The maximum y value in math space.
   */
  getMathYMax(): number { return this.mathYMax; }

  /**
   * @desc Returns the width of the canvas in pixels.
   * @returns The width of the canvas in pixels.
   */
  getCanvasWidthPixels(): number { return this.canvasWidthPixels; }

  /**
   * @desc Returns the height of the canvas in pixels.
   * @returns The height of the canvas in pixels.
   */
  getCanvasHeightPixels(): number { return this.canvasHeightPixels; }

  /**
   * @desc Converts a mathematical x value to the corresponding canvas pixel x.
   * @param mathValue - x coordinate in mathematical space.
   * @returns Pixel x position on the canvas.
   */
  toCanvasX(mathValue: number): number {
    const ratio = (mathValue - this.mathXMin) / (this.mathXMax - this.mathXMin);
    return this.offsetX + ratio * this.drawWidth;
  }

  /**
   * @desc Converts a mathematical y value to the corresponding canvas pixel y.
   * Note: canvas y axis is inverted (top = 0), so we subtract from height.
   * @param mathValue - y coordinate in mathematical space.
   * @returns Pixel y position on the canvas.
   */
  toCanvasY(mathValue: number): number {
    const ratio = (mathValue - this.mathYMin) / (this.mathYMax - this.mathYMin);
    return this.offsetY + (1 - ratio) * this.drawHeight;
  }

  /**
   * @desc Converts a canvas pixel x to its mathematical equivalent.
   * @param pixelX - Pixel x position on the canvas.
   * @returns Corresponding x coordinate in mathematical space.
   */
  toMathX(pixelX: number): number {
    const ratio = (pixelX - this.offsetX) / this.drawWidth;
    return this.mathXMin + ratio * (this.mathXMax - this.mathXMin);
  }

  /**
   * @desc Computes a human-readable tick spacing that keeps ticks
   * at least minPixelGap pixels apart on the canvas.
   * @param minPixelGap - Minimum desired gap between ticks in pixels.
   * @returns A round tick spacing value in mathematical units.
   */
  computeNiceTickSpacing(minPixelGap: number = 60): number {
    const mathRange = this.mathXMax - this.mathXMin;
    const rawSpacing = (mathRange / this.drawWidth) * minPixelGap;

    const magnitude = Math.pow(10, Math.floor(Math.log10(rawSpacing)));
    const normalised = rawSpacing / magnitude;

    let niceFactor: number;
    if (normalised < 1.5) niceFactor = 1;
    else if (normalised < 3.5) niceFactor = 2;
    else if (normalised < 7.5) niceFactor = 5;
    else niceFactor = 10;

    return niceFactor * magnitude;
  }

}