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

import { Circle } from './circles.js';

/**
 * @desc Class that manages interaction with user and graphical interface
 */
export class View {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly MIN_RADIUS            = 10;
  private readonly RADIUS_RANGE          = 50;

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
   * @desc Draws a hardcoded number of circles on the canvas. Example: 5
   */
  public run(numberCircles: number): void {
    const circles: Circle[] = this.generateRandomCircles(numberCircles);
    this.drawCircles(circles);
  }

  /**
   * @desc Generates random circles, each kind with equal probability
   * @param count - Number of circles to be generated
   * @returns {Shape[]} Array of randomly generated circles
   */
  private generateRandomCircles(count: number): Circle[] {
    const circles: Circle[] = [];
    const colours = ['red', 'green', 'blue', 'yellow', 'purple'];
    const usedColours: string[] = [];
    let circleCount: number = 0;
    while (circleCount < count) {
      const colour = colours[Math.floor(Math.random() * colours.length)];
      const coordX = Math.random() * this.canvas.width;
      const coordY = Math.random() * this.canvas.height;
      circles.push(new Circle(colour, coordX, coordY, this.MIN_RADIUS + Math.random() * this.RADIUS_RANGE));
      usedColours.push(colour);
      circleCount++;
    }
    return circles;
  }

  /**
   * @desc Draws all circles on the canvas by calling the draw method of each one
   * @param circles - Array of circles to be drawn
   */
  private drawCircles(circles: Circle[]): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    circles.forEach(circle => circle.draw(this.context));
  }
}