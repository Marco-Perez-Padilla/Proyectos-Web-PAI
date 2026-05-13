/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería yCoord Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc View for the graphic object application
 */

import { Position} from "./graphic-object-model.js";

export class GraphicObjectView {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly margin: number;

  private circlePosition: Position = { xCoord: 0, yCoord: 0 };
  private readonly radius: number = 30;

  constructor(canvasId: string, margin: number = 20) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;
    this.margin = margin;

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }

  /**
   * @desc Returns canvas size
   */
  getCanvasSize(): { width: number; height: number } {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }

  /**
   * @desc Sets circle position with constraints
   */
  setCirclePosition(position: Position): void {
    const width = this.canvas.width;
    const height = this.canvas.height;

    const halfHeight = height / 2;

    this.circlePosition = {
      xCoord: Math.max(this.radius, Math.min(position.xCoord, width - this.radius)),
      yCoord: Math.max(this.radius, Math.min(position.yCoord, halfHeight - this.radius))
    };
  }

  /**
   * @desc Resizes canvas according to window size.
   */
  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth - this.margin;
    this.canvas.height = window.innerHeight - this.margin;
    this.render();
  }

  /**
   * @desc Main render method.
   */
  render(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.clear();
    this.drawTopArea(width, height);
    this.drawBottomArea(width, height);
  }

  private clear(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @desc Draws upper half and the movable object inside it
   */
  private drawTopArea(width: number, height: number): void {
    const halfHeight = height / 2;
    this.context.fillStyle = 'steelblue';
    this.context.fillRect(0, 0, width, halfHeight);
    this.context.beginPath();
    this.context.arc(
      this.circlePosition.xCoord,
      this.circlePosition.yCoord,
      this.radius,
      0,
      Math.PI * 2
    );
    this.context.fillStyle = 'red';
    this.context.fill();
  }

  /**
   * @desc Draws bottom half (controls area)
   */
  private drawBottomArea(width: number, height: number): void {
    this.context.fillStyle = 'gray';
    this.context.fillRect(0, height / 2, width, height / 2);
  }
}