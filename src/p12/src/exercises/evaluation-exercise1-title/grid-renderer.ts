/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Draws the background grid on a canvas
 */

export class GridRenderer {
  private readonly context: CanvasRenderingContext2D;

  /**
   * @desc Creates a grid renderer using the given canvas context.
   * @param context The 2D rendering context
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * @desc Draws vertical and horizontal grid lines.
   * @param axisXMin Leftmost axis value
   * @param axisXMax Rightmost axis value
   * @param axisYMin Bottom axis value
   * @param axisYMax Top axis value
   * @param toCanvasX Function that converts x-axis values to canvas pixel coordinates
   * @param toCanvasY Function that converts y-axis values to canvas pixel coordinates
   * @param canvasWidth Actual canvas width in pixels
   * @param canvasHeight Actual canvas height in pixels
   */
  draw(
    axisXMin: number,
    axisXMax: number,
    axisYMin: number,
    axisYMax: number,
    toCanvasX: (valueX: number) => number,
    toCanvasY: (valueY: number) => number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    const context = this.context;
    const stepX = this.calculateStep(axisXMin, axisXMax);
    const stepY = this.calculateStep(axisYMin, axisYMax);

    context.strokeStyle = '#e0e0e0';
    context.lineWidth = 0.5;

    for (let gridX = Math.ceil(axisXMin / stepX) * stepX; gridX <= axisXMax; gridX += stepX) {
      const canvasX = toCanvasX(gridX);
      context.beginPath();
      context.moveTo(canvasX, 0);
      context.lineTo(canvasX, canvasHeight);
      context.stroke();
    }

    for (let gridY = Math.ceil(axisYMin / stepY) * stepY; gridY <= axisYMax; gridY += stepY) {
      const canvasY = toCanvasY(gridY);
      context.beginPath();
      context.moveTo(0, canvasY);
      context.lineTo(canvasWidth, canvasY);
      context.stroke();
    }
  }

  /**
   * @desc Computes a nice step size for axis ticks.
   * @param minValue Axis lower bound
   * @param maxValue Axis upper bound
   * @returns Suitable step size
   */
  private calculateStep(minValue: number, maxValue: number): number {
    const range = maxValue - minValue;
    const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
    const residual = range / magnitude;
    if (residual <= 2) return magnitude * 0.5;
    if (residual <= 5) return magnitude;
    return magnitude * 2;
  }
}