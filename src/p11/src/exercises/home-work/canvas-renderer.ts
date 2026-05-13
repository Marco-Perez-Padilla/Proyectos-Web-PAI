/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class responsible of rendering the canvas. 
 */

/**
 * @desc Handles clearing the canvas. Single responsibility: clear only.
 */
export class CanvasRenderer {
  
  /**
   * @desc Constructor for CanvasRenderer.
   * @param renderingContext - The 2D rendering context of the canvas
   */
  constructor(private readonly renderingContext: CanvasRenderingContext2D) {}

  /**
   * @desc Clears the entire canvas area.
   * @param canvasWidth - Current canvas width in pixels
   * @param canvasHeight - Current canvas height in pixels
   */
  clear(canvasWidth: number, canvasHeight: number): void {
    this.renderingContext.clearRect(0, 0, canvasWidth, canvasHeight);
  }
}