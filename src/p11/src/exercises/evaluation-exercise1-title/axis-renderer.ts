/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Draws the coordinate axes, grid lines, and numeric labels.
 */

export class AxisRenderer {
  private static readonly MIN = -5;
  private static readonly MAX = 5;

  constructor(private readonly renderingContext: CanvasRenderingContext2D) {}

  /**
   * @desc Draws the axis of the canvas
   * @param canvasWidth  Width (in pixels) of the canvas
   * @param canvasHeight Height (in pixels) of the canvas
   */
  drawAxes(canvasWidth: number, canvasHeight: number): void {
    const context = this.renderingContext;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    context.save();
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.lineWidth = 1.5;
    context.font = '12px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.beginPath();
    context.moveTo(0, centerY);
    context.lineTo(canvasWidth, centerY);
    context.stroke();

    context.beginPath();
    context.moveTo(centerX, 0);
    context.lineTo(centerX, canvasHeight);
    context.stroke();

    const stepPx = this.getStepPixels(canvasWidth, canvasHeight);
    const stepValue = 1; 

    for (let xVal = AxisRenderer.MIN; xVal <= AxisRenderer.MAX; xVal += stepValue) {
      const xPixel = centerX + xVal * stepPx;
      if (xPixel < 0 || xPixel > canvasWidth) continue;

      context.beginPath();
      context.moveTo(xPixel, centerY - 5);
      context.lineTo(xPixel, centerY + 5);
      context.stroke();

      if (xVal !== 0) {
        context.fillText(xVal.toString(), xPixel, centerY + 15);
      }
    }

    for (let yVal = AxisRenderer.MIN; yVal <= AxisRenderer.MAX; yVal += stepValue) {
      const yPixel = centerY - yVal * stepPx; 
      if (yPixel < 0 || yPixel > canvasHeight) continue;

      context.beginPath();
      context.moveTo(centerX - 5, yPixel);
      context.lineTo(centerX + 5, yPixel);
      context.stroke();

      if (yVal !== 0) {
        context.fillText(yVal.toString(), centerX - 10, yPixel);
      }
    }

    context.fillText('X', canvasWidth - 10, centerY - 5);
    context.fillText('Y', centerX + 10, 15);

    context.restore();
  }

  /**
   * @desc Draws the points in the canvas, converting from mathematical coords to pixels
   * @param point Point to be drawed 
   * @param canvasWidth  Width (in pixels) of the canvas
   * @param canvasHeight Height (in pixels) of the canvas
   */
  drawPoint(point: { xPoint: number; yPoint: number }, canvasWidth: number, canvasHeight: number): void {
    const context = this.renderingContext;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const stepPx = this.getStepPixels(canvasWidth, canvasHeight);

    const pointX = centerX + point.xPoint * stepPx;
    const pointY = centerY - point.yPoint * stepPx; 

    context.save();
    context.fillStyle = 'red';
    context.shadowBlur = 0;
    context.beginPath();
    context.arc(pointX, pointY, 5, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }

  /**
   * @desc Gets the step between ticks based on canvas size
   * @param canvasWidth  Width (in pixels) of the canvas
   * @param canvasHeight Height (in pixels) of the canvas
   * @returns {number} Number of pixels of the steps
   */
  private getStepPixels(canvasWidth: number, canvasHeight: number): number {
    const range = AxisRenderer.MAX - AxisRenderer.MIN; 
    const minDimension = Math.min(canvasWidth, canvasHeight);
    return minDimension / range;
  }
}