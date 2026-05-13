/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 13 2026
 * @desc Archivo con clase base Shape y clases que heredan de la misma
 */


/**
 * @desc Circle class. Extends Shape, implements getArea and draw for a circle figure.
 */
export class Circle {
  /**
   * @desc Constructor for the Circle class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param radius - Radius of the circle
   */
  constructor(private readonly colour: string, private readonly coordX: number, 
    private readonly coordY: number, private readonly radius: number) {}

  /**
   * @desc Computes the area of the circle.
   * @returns {number} Area of the circle
   */
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  /**
   * @desc Draws the whole circle on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    this.drawCircle(context);
    this.drawCenterPoint(context);
    this.drawCenterCoords(context);
  }

  /**
   * @desc Draws the circle on a canvas.
   * @param context - Canvas 2D rendering context
   */
  private drawCircle(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.coordX, this.coordY, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.colour;
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
  }

  /**
   * @desc Draws a center point on the circles
   * @param context - Canvas 2D rendering context
   */
  private drawCenterPoint(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.coordX, this.coordY, 2, 0, 2 * Math.PI); 
    context.fillStyle = "black";
    context.fill();
  }

  /**
   * @desc Draws the center coords
   * @param context - Canvas 2D rendering context
   */
  private drawCenterCoords(context: CanvasRenderingContext2D): void {
    context.fillStyle = "black";
    context.font = "12px Arial";
    const text = `(${this.coordX.toFixed(0)}, ${this.coordY.toFixed(0)})`;
    context.fillText(text, this.coordX, this.coordY);
  }
}
