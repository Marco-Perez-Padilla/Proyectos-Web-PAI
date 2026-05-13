/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Draws launch result text on the info canvas (panel P2).
 */

/**
 * @desc Interface for the style of the info text.
 */
export interface InfoStyle {
  font: string;
  color: string;
}

export class InfoRenderer {
  /**
   * @desc Constructor for InfoRenderer class
   * @param context, the 2D rendering context of the info canvas
   * @param canvasWidth, the width of the info canvas in pixels
   * @param canvasHeight, the height of the info canvas in pixels
   * @param style, the style to be used for rendering the text (font and color)
   */
  constructor(private readonly context: CanvasRenderingContext2D, private readonly canvasWidth: number,
              private readonly canvasHeight: number, private readonly style: InfoStyle,) {}

  /**
   * @desc Clears the info canvas.
   */
  clear(): void {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  /**
   * @desc Draws the launch summary text on the info canvas.
   * @param flightTime, horizontalRange, maxHeight
   * @param horizontalRange, horizontal range in meters
   * @param maxHeight, maximum height in meters
   */
  drawLaunchSummary(flightTime: number, horizontalRange: number, maxHeight: number): void {
    const centerY = this.canvasHeight / 2;
    const columnWidth = this.canvasWidth / 3;
    this.context.save();
    this.context.font = this.style.font;
    this.context.fillStyle = this.style.color;
    this.context.textBaseline = 'middle';
    this.context.fillText(`t: ${flightTime.toFixed(2)} s`, 20, centerY);
    this.context.fillText(`x: ${horizontalRange.toFixed(1)} m`, columnWidth, centerY);
    this.context.fillText(`y max: ${maxHeight.toFixed(1)} m`, 2 * columnWidth, centerY);
    this.context.restore();
  }
}