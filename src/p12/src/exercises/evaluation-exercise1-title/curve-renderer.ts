/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería yPoint Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Draws a curve from a list of pixel-coordinate points on a canvas
 */

export class CurveRenderer {
  private readonly context: CanvasRenderingContext2D;

  /**
   * @desc Creates the curve renderer.
   * @param context The 2D rendering context of the canvas
   */
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  /**
   * @desc Draws a polyline connecting the given points.
   * @param pixelPoints Array of points in canvas pixel coordinates (xPoint, yPoint)
   */
  draw(pixelPoints: readonly { xPixel: number; yPixel: number }[]): void {
    if (pixelPoints.length < 2) return;

    this.context.strokeStyle = '#5C068C'; // púrpura ULL
    this.context.lineWidth = 2;
    this.context.lineJoin = 'round';
    this.context.beginPath();
    this.context.moveTo(pixelPoints[0].xPixel, pixelPoints[0].yPixel);

    for (let pointIndex = 1; pointIndex < pixelPoints.length; pointIndex++) {
      this.context.lineTo(pixelPoints[pointIndex].xPixel, pixelPoints[pointIndex].yPixel);
    }
    this.context.stroke();
  }
}