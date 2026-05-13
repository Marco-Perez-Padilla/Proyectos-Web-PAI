/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class responsible of managing canvas resizing
 */

/**
 * @desc Manages canvas resize events. Single responsibility: resize only.
 */
export class ResizeManager {

  /**
   * @desc Constructor for ResizeManager
   * @param canvasElement - The HTML canvas element to manage
   */
  constructor(private readonly canvasElement: HTMLCanvasElement) {}

  /**
   * @desc Resizes the canvas to match its current CSS dimensions.
   * @returns The new width and height of the canvas
   */
  resize(): { width: number; height: number } {
    this.canvasElement.width  = this.canvasElement.clientWidth;
    this.canvasElement.height = this.canvasElement.clientHeight;
    return {
      width:  this.canvasElement.width,
      height: this.canvasElement.height,
    };
  }

  /**
   * @desc Registers a callback to be invoked whenever the window is resized.
   * @param resizeCallback - Function to call on resize
   */
  onResize(resizeCallback: () => void): void {
    window.addEventListener('resize', resizeCallback);
  }
}