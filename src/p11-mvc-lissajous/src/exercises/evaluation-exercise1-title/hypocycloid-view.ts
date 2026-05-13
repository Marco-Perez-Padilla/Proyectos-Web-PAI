/**
 * @file view.ts
 * @desc Vista que dibuja el plano y los puntos, pero no conoce el modelo.
 *       Recibe los puntos a través del método render().
 */

import { CanvasRenderer } from './canvas-renderer.js';
import { AxisRenderer } from './axis-renderer.js';
import type { Point } from './hypocycloid-model.js';
import { GridRenderer } from './grid-renderer.js';

export class HypocycloidView {
  private renderingContext: CanvasRenderingContext2D;
  private canvasRenderer: CanvasRenderer;
  private axisRenderer: AxisRenderer;
  private gridRenderer: GridRenderer;
  private canvasWidth = 0;
  private canvasHeight = 0;

  /**
   * @desc Constructor for HypocycloidView. Initializes renderers and sets up resize handling.
   * @param canvasElement - The HTML canvas element
   */
  constructor(private readonly canvasElement: HTMLCanvasElement) {
    const context = canvasElement.getContext('2d');
    if (!context) throw new Error('No se pudo obtener el contexto 2D');

    this.renderingContext = context;
    this.canvasRenderer = new CanvasRenderer(this.renderingContext);
    this.axisRenderer = new AxisRenderer(this.renderingContext);
    this.gridRenderer     = new GridRenderer(this.renderingContext);
  }

  /**
   * @desc Renders one frame: clears the canvas, draws the grid, then draws the points
   * @param points - Array of {xPoint, yPoint} coordinates relative to the origin
   */
  render(points: Point[]): void {
    this.canvasRenderer.clear(this.canvasWidth, this.canvasHeight);
    this.gridRenderer.draw(this.canvasWidth, this.canvasHeight);
    this.axisRenderer.drawAxes(this.canvasWidth, this.canvasHeight);
    for (const point of points) {
      this.axisRenderer.drawPoint(point, this.canvasWidth, this.canvasHeight);
    }
  }
}