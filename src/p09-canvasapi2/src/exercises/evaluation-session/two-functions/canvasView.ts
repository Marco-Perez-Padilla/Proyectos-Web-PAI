/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc  Wraps the HTML canvas element and provides safe access to it.
 */

export class CanvasView {
  private readonly canvasElement: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  /**
   * @param canvasElementId - The `id` attribute of the `<canvas>` element in the HTML.
   * @throws Error if the element is not found or is not a canvas.
   */
  constructor(canvasElementId: string) {
    const element = document.getElementById(canvasElementId);
    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error(`Element with id "${canvasElementId}" is not a <canvas> element.`,);
    }
    this.canvasElement = element;

    const context = this.canvasElement.getContext('2d');
    if (context === null) {
      throw new Error('Failed to obtain 2D rendering context from canvas.');
    }
    this.context = context;
  }

  /**
   * @desc Returns the 2D rendering context for drawing on the canvas.
   * @returns The 2D rendering context.
   */
  getRenderingContext(): CanvasRenderingContext2D {
    return this.context;
  }

  /**
   * @desc Returns the canvas width in CSS pixels.
   * @returns The canvas width in CSS pixels.
   */
  getWidth(): number {
    return this.canvasElement.width;
  }

  /**
   * @desc Returns the canvas height in CSS pixels.
   * @returns The canvas height in CSS pixels.
   */
  getHeight(): number {
    return this.canvasElement.height;
  }

  /**
   * @desc Returns the underlying HTMLCanvasElement.
   * @returns The HTMLCanvasElement associated with this view.
   */
  getCanvasElement(): HTMLCanvasElement {
    return this.canvasElement;
  }

  /**
   * @desc Clears the entire canvas, making it fully transparent.
   */
  clear(): void {
    this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
  }

  /**
   * @desc Fills the canvas with a solid background colour.
   * @param colour - Any CSS colour string 
   */
  fillBackground(colour: string): void {
    this.context.save();
    this.context.fillStyle = colour;
    this.context.fillRect(0, 0, this.getWidth(), this.getHeight());
    this.context.restore();
  }
}