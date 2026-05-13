/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 13 2026
 * @desc Archivo con clase Vista que pide el número de figuras, las genera y las dibuja.
 */

import { Shape, Square, Rectangle, Triangle, Circle, Polygon } from './shapes.js';

/**
 * @desc Class that manages interaction with user and graphical interface
 */
export class View {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly NUMBER_OF_SHAPE_TYPES = 5;
  private readonly MIN_SIDE_SIZE         = 20;
  private readonly SIDE_SIZE_RANGE       = 80;
  private readonly MIN_RADIUS            = 10;
  private readonly RADIUS_RANGE          = 50;
  private readonly MIN_POLYGON_SIDES     = 3;
  private readonly MAX_POLYGON_SIDES     = 20;

  /**
   * @desc Constructor for the View class. Retrieves the canvas element and its 2D context.
   * @param canvasId - ID of the HTML canvas element
   * @throws {Error} If the 2D context cannot be obtained from the canvas
   */
  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto 2D');
    this.context = context;
  }

  /**
   * @desc Asks the user for a number of figures and draws them on the canvas
   */
  public run(): void {
    const input = prompt('Número de figuras a dibujar:');
    if (input === null) return;
    const num = parseInt(input, 10);
    if (isNaN(num) || num <= 0) {
      alert('Número inválido');
      return;
    }
    const shapes = this.generateRandomShapes(num);
    this.drawShapes(shapes);
  }

  /**
   * @desc Generates random shapes, each kind with equal probability
   * @param count - Number of shapes to be generated
   * @returns {Shape[]} Array of randomly generated shapes
   */
  private generateRandomShapes(count: number): Shape[] {
    const shapes: Shape[] = [];
    const colours = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];
    for (let shape = 0; shape < count; shape++) {
      const type = Math.floor(Math.random() * this.NUMBER_OF_SHAPE_TYPES);
      const colour = colours[Math.floor(Math.random() * colours.length)];
      const coordX = Math.random() * this.canvas.width;
      const coordY = Math.random() * this.canvas.height;
      switch (type) {
        case 0:
          shapes.push(new Square(colour, coordX, coordY, this.MIN_SIDE_SIZE + Math.random() * this.SIDE_SIZE_RANGE));
          break;
        case 1:
          shapes.push(new Rectangle(colour, coordX, coordY, this.MIN_SIDE_SIZE + Math.random() * this.SIDE_SIZE_RANGE, this.MIN_SIDE_SIZE + Math.random() * this.SIDE_SIZE_RANGE));
          break;
        case 2:
          shapes.push(new Triangle(colour, coordX, coordY, this.MIN_SIDE_SIZE + Math.random() * this.SIDE_SIZE_RANGE));
          break;
        case 3:
          shapes.push(new Circle(colour, coordX, coordY, this.MIN_RADIUS + Math.random() * this.RADIUS_RANGE));
          break;
        case 4: {
          const sides = this.MIN_POLYGON_SIDES + Math.floor(Math.random() * (this.MAX_POLYGON_SIDES - this.MIN_POLYGON_SIDES + 1));
          shapes.push(new Polygon(colour, coordX, coordY, sides, this.MIN_RADIUS + Math.random() * this.RADIUS_RANGE));
          break;
        }
      }
    }
    return shapes;
  }

  /**
   * @desc Draws all shapes on the canvas by calling the draw method of each one
   * @param shapes - Array of shapes to be drawn
   */
  private drawShapes(shapes: Shape[]): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    shapes.forEach(shape => shape.draw(this.context));
  }
}