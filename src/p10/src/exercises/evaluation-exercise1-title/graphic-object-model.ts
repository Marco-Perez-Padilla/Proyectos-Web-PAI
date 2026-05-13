/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 13 2026
 * @desc Model that stores and updates the position of a circular object with bounded movement.
 */

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
  xCoord: number;
  yCoord: number;
}

export class GraphicObjectModel {
  constructor(private position: Position = { xCoord: 0, yCoord: 0 }, private readonly radius: number = 30,
              private step: number = 10, private canvasWidth: number = 0, private canvasHeight: number = 0) {}

  /**
   * @desc Sets the limits of the canvas and initializes the position of the object.
   * @param width, width of the canvas in pixels
   * @param height, height of the canvas in pixels
   */
  setBounds(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.position = {
      xCoord: width / 2,
      yCoord: height / 4,
    };
  }

  /**
   * @desc Sets the number of pixels the object moves per button press.
   * @param step - movement step in pixels (must be positive)
   */
  setStep(step: number): void {
    if (step > 0) {
      this.step = step;
    }
  }

  /**
   * @desc Returns the current step value.
   */
  getStep(): number {
    return this.step;
  }
  
  /**
   * @desc Returns the current position of the object.
   * @returns the current x and y coordinates
   */
  getPosition(): Position {
    return { ...this.position };
  }

  /**
   * @desc Moves the object in the given direction while respecting canvas boundaries.
   * @param direction, movement direction (up, down, left, right)
   */
  move(direction: Direction): void {
    if (direction === 'up') {
      this.position.yCoord = Math.max(this.radius, this.position.yCoord - this.step);
    }
    if (direction === 'down') {
      this.position.yCoord = Math.min(
        this.canvasHeight / 2 - this.radius,
        this.position.yCoord + this.step
      );
    }
    if (direction === 'left') {
      this.position.xCoord = Math.max(this.radius, this.position.xCoord - this.step);
    }
    if (direction === 'right') {
      this.position.xCoord = Math.min(
        this.canvasWidth - this.radius,
        this.position.xCoord + this.step
      );
    }
  }
}