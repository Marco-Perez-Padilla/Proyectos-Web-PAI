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

export class CanvasRenderer {
  /**
   * @desc COnstructor for CanvasRenderer
   * @param renderingContext - Storage of the rendereing context
   */
  constructor(private readonly renderingContext: CanvasRenderingContext2D) {}

  /**
   * @desc clears the canvas
   * @param canvasWidth  Width (in pixels) of the canvas
   * @param canvasHeight Height (in pixels) of the canvas
   */
  clear(canvasWidth: number, canvasHeight: number): void {
    this.renderingContext.clearRect(0, 0, canvasWidth, canvasHeight);
  }
}