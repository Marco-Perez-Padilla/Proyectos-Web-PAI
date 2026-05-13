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
 * @desc Abstract class Shape. Base class for all drawable geometric figures.
 */
export abstract class Shape {
  /**
   * @desc Constructor for the Shape class. Each figure will inherit from this class.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   */
  constructor(protected readonly colour: string, protected readonly coordX: number, protected readonly coordY: number) {}

  /**
   * @desc Abstract method that subclasses must implement. Computes the area of the shape.
   * @returns {number} Area of the shape
   */
  abstract getArea(): number;

  /**
   * @desc Abstract method that subclasses must implement. Draws the figure on a canvas.
   * @param context - Canvas 2D rendering context
   */
  abstract draw(context: CanvasRenderingContext2D): void;
}

/**
 * @desc Square class. Extends Shape, implements getArea and draw for a square figure.
 */
export class Square extends Shape {
  /**
   * @desc Constructor for the Square class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param side - Side length of the square
   */
  constructor(colour: string, coordX: number, coordY: number,
    private readonly side: number) {
    super(colour, coordX, coordY);
  }

  /**
   * @desc Computes the area of the square.
   * @returns {number} Area of the square
   */
  getArea(): number {
    return this.side * this.side;
  }

  /**
   * @desc Draws the square on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.colour;
    context.fillRect(this.coordX - this.side / 2, this.coordY - this.side / 2, this.side, this.side);
  }
}

/**
 * @desc Rectangle class. Extends Shape, implements getArea and draw for a rectangle figure.
 */
export class Rectangle extends Shape {
  /**
   * @desc Constructor for the Rectangle class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param width - Width of the rectangle
   * @param height - Height of the rectangle
   */
  constructor(colour: string, coordX: number, coordY: number, 
    private readonly width: number, private readonly height: number) {
    super(colour, coordX, coordY);
  }

  /**
   * @desc Computes the area of the rectangle.
   * @returns {number} Area of the rectangle
   */
  getArea(): number {
    return this.width * this.height;
  }

  /**
   * @desc Draws the rectangle on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.colour;
    context.fillRect(this.coordX - this.width / 2, this.coordY - this.height / 2, this.width, this.height);
  }
}

/**
 * @desc Triangle class. Extends Shape, implements getArea and draw for an equilateral triangle.
 */
export class Triangle extends Shape {
  /**
   * @desc Constructor for the Triangle class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param side - Side length of the equilateral triangle
   */
  constructor(colour: string, coordX: number, coordY: number, 
    private readonly side: number) {
    super(colour, coordX, coordY);
  }

  /**
   * @desc Computes the area of the equilateral triangle.
   * @returns {number} Area of the triangle
   */
  getArea(): number {
    return (Math.sqrt(3) / 4) * this.side * this.side;
  }

  /**
   * @desc Draws the equilateral triangle on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    const height = (Math.sqrt(3) / 2) * this.side;
    const coordX1 = this.coordX;
    const coordY1 = this.coordY - height / 2;
    const coordX2 = this.coordX - this.side / 2;
    const coordY2 = this.coordY + height / 2;
    const coordX3 = this.coordX + this.side / 2;
    const coordY3 = this.coordY + height / 2;

    context.beginPath();
    context.moveTo(coordX1, coordY1);
    context.lineTo(coordX2, coordY2);
    context.lineTo(coordX3, coordY3);
    context.closePath();
    context.fillStyle = this.colour;
    context.fill();
  }
}

/**
 * @desc Circle class. Extends Shape, implements getArea and draw for a circle figure.
 */
export class Circle extends Shape {
  /**
   * @desc Constructor for the Circle class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param radius - Radius of the circle
   */
  constructor(colour: string, coordX: number, coordY: number, 
    private readonly radius: number) {
    super(colour, coordX, coordY);
  }

  /**
   * @desc Computes the area of the circle.
   * @returns {number} Area of the circle
   */
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  /**
   * @desc Draws the circle on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.coordX, this.coordY, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.colour;
    context.fill();
  }
}

/**
 * @desc Optional code: Polygon class. Extends Shape, implements getArea and draw for a regular polygon of N sides.
 *       Developed to avoid doing a class for each regular polygon. Sides are assummed to be equal in these cases
 */
export class Polygon extends Shape {
  /**
   * @desc Constructor for the Polygon class. Calls the Shape constructor.
   * @param colour - Color in CSS format
   * @param coordX - X coordinate of the center
   * @param coordY - Y coordinate of the center
   * @param sides - Number of sides of the polygon (must be >= 3)
   * @param radius - Circumradius (distance from center to vertex)
   */
  constructor(colour: string, coordX: number, coordY: number, 
    private readonly sides: number, private readonly radius: number) {
    super(colour, coordX, coordY);
  }

  /**
   * @desc Computes the area of the regular polygon.
   * @returns {number} Area of the polygon
   * @see {@link https://es.wikipedia.org/wiki/Pol%C3%ADgono_regular}
   */
  getArea(): number {
    return (this.sides * this.radius * this.radius * Math.sin((2 * Math.PI) / this.sides)) / 2;
  }

  /**
   * @desc Draws the regular polygon on a canvas.
   * @param context - Canvas 2D rendering context
   */
  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    for (let vertex = 0; vertex < this.sides; vertex++) {
      const angle = (2 * Math.PI * vertex) / this.sides - Math.PI / 2;
      const coordX = this.coordX + this.radius * Math.cos(angle);
      const coordY = this.coordY + this.radius * Math.sin(angle);
      if (vertex === 0) {
        context.moveTo(coordX, coordY);
      } else {
        context.lineTo(coordX, coordY);
      }
    }
    context.closePath();
    context.fillStyle = this.colour;
    context.fill();
  }
}