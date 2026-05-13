/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the Lissajous curve renderer, responsible for drawing the curve on the canvas.
 */

/**
 * @desc Draws a Lissajous curve from pre-computed points. Stateless.
 */
export class CurveRenderer {

  /**
   * @desc Constructor for CurveRenderer
   * @param renderingContext - The 2D rendering context of the canvas
   */
  constructor(private readonly renderingContext: CanvasRenderingContext2D) {}

  /**
   * @desc Renders the curve as connected line segments.
   * @param points - Array of {xPoint, yPoint} coordinates relative to the origin
   * @param originX - Canvas X coordinate of the curve origin
   * @param originY - Canvas Y coordinate of the curve origin
   */
  draw(points: { xPoint: number; yPoint: number }[], originX: number, originY: number,): void {
    if (points.length < 2) return;

    this.renderingContext.strokeStyle = 'navy';
    this.renderingContext.lineWidth = 1.5;
    this.renderingContext.lineJoin = 'round';
    this.renderingContext.beginPath();
    this.renderingContext.moveTo(originX + points[0].xPoint, originY + points[0].yPoint);

    for (const point of points) {
      this.renderingContext.lineTo(originX + point.xPoint, originY + point.yPoint);
    }
    this.renderingContext.stroke();
  }
}