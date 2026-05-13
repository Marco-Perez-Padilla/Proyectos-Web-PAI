/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class responsible of rendering a background grid on the canvas. Stateless, with a single method to draw the grid based on current canvas dimensions.
 */

/**
 * @desc Draws a background grid on the canvas. Stateless.
 */
export class GridRenderer {
  private static readonly STEP = 20;

  /**
   * @desc Constructor for GridRenderer
   * @param renderingContext - The 2D rendering context of the canvas
   */
  constructor(private readonly renderingContext: CanvasRenderingContext2D) {}

  /**
   * @desc Renders evenly-spaced horizontal and vertical grid lines.
   * @param canvasWidth - Current canvas width in pixels
   * @param canvasHeight - Current canvas height in pixels
   */
  draw(canvasWidth: number, canvasHeight: number): void {
    const step = GridRenderer.STEP;
    this.renderingContext.strokeStyle = 'lightgray';
    this.renderingContext.lineWidth = 0.5;

    for (let xCoordinate = 0; xCoordinate <= canvasWidth; xCoordinate += step) {
      this.renderingContext.beginPath();
      this.renderingContext.moveTo(xCoordinate, 0);
      this.renderingContext.lineTo(xCoordinate, canvasHeight);
      this.renderingContext.stroke();
    }

    for (let yCoordinate = 0; yCoordinate <= canvasHeight; yCoordinate += step) {
      this.renderingContext.beginPath();
      this.renderingContext.moveTo(0, yCoordinate);
      this.renderingContext.lineTo(canvasWidth, yCoordinate);
      this.renderingContext.stroke();
    }
  }
}