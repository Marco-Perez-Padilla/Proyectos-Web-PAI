/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Coordinates grid, axes, rectangle, and function drawing on a canvas
 */

import { GridRenderer } from './grid-renderer.js';
import { AxisRenderer } from './axis-renderer.js';
import { CurveRenderer } from './curve-renderer.js';

export class CanvasRenderer {
  private readonly context: CanvasRenderingContext2D;
  private readonly gridRenderer: GridRenderer;
  private readonly axisRenderer: AxisRenderer;
  private readonly curveRenderer: CurveRenderer;

  /**
   * @desc Creates the renderer and sets up sub-renderers.
   * @param canvasElement The HTML canvas to draw on
   * @throws If 2D context cannot be obtained
   */
  constructor(private readonly canvasElement: HTMLCanvasElement) {
    const maybeContext = canvasElement.getContext('2d');
    if (!maybeContext) throw new Error('Cannot get 2D context');
    this.context = maybeContext;

    this.gridRenderer = new GridRenderer(this.context);
    this.axisRenderer = new AxisRenderer(this.context);
    this.curveRenderer = new CurveRenderer(this.context);
  }

  /**
   * @desc Clears the canvas and adjusts its size to match CSS dimensions.
   */
  clear(): void {
    const displayWidth = this.canvasElement.offsetWidth || 300;
    const displayHeight = this.canvasElement.offsetHeight || 150;
    if (this.canvasElement.width !== displayWidth || this.canvasElement.height !== displayHeight) {
      this.canvasElement.width = displayWidth;
      this.canvasElement.height = displayHeight;
    }
    this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  /**
   * @desc Draws grid, axes, and the integration rectangle.
   * @param axisXMin Leftmost axis value
   * @param axisXMax Rightmost axis value
   * @param axisYMin Bottom axis value
   * @param axisYMax Top axis value
   */
  drawGridAndAxes(axisXMin: number, axisXMax: number,
                  axisYMin: number, axisYMax: number): void {
    const canvasWidth = this.canvasElement.width;
    const canvasHeight = this.canvasElement.height;
    const scaleX = canvasWidth / (axisXMax - axisXMin);
    const scaleY = canvasHeight / (axisYMax - axisYMin);
    const toCanvasX = (valueX: number) => (valueX - axisXMin) * scaleX;
    const toCanvasY = (valueY: number) => canvasHeight - (valueY - axisYMin) * scaleY;

    // Fondo blanco
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, canvasWidth, canvasHeight);

    this.gridRenderer.draw(axisXMin, axisXMax, axisYMin, axisYMax, toCanvasX, toCanvasY, canvasWidth, canvasHeight);
    this.axisRenderer.draw(axisXMin, axisXMax, axisYMin, axisYMax, toCanvasX, toCanvasY, canvasWidth, canvasHeight);
  }

  /**
   * @desc Draws the bounding rectangle over the integration region.
   * @param xMinValue Left integration bound
   * @param xMaxValue Right integration bound
   * @param yMaxValue Maximum y for the rectangle
   * @param axisXMin Axis range
   * @param axisXMax Axis range
   * @param axisYMin Axis range
   * @param axisYMax Axis range
   */
  drawRectangle(xMinValue: number, xMaxValue: number,
                yMaxValue: number, axisXMin: number,
                axisXMax: number, axisYMin: number,
                axisYMax: number): void {
    const canvasWidth = this.canvasElement.width;
    const canvasHeight = this.canvasElement.height;
    const scaleX = canvasWidth / (axisXMax - axisXMin);
    const scaleY = canvasHeight / (axisYMax - axisYMin);
    const toCanvasX = (v: number) => (v - axisXMin) * scaleX;
    const toCanvasY = (v: number) => canvasHeight - (v - axisYMin) * scaleY;

    const rectLeft = Math.max(0, toCanvasX(xMinValue));
    const rectRight = Math.min(canvasWidth, toCanvasX(xMaxValue));
    const rectTop = toCanvasY(yMaxValue);
    const rectBottom = toCanvasY(0);

    this.context.strokeStyle = 'gray';
    this.context.lineWidth = 2;
    this.context.strokeRect(rectLeft, rectTop, rectRight - rectLeft, rectBottom - rectTop);
  }

  /**
   * @desc Draws the function curve from sampled data points.
   * @param dataPoints Array of points in data coordinates (x, y)
   * @param axisXMin Axis range
   * @param axisXMax Axis range
   * @param axisYMin Axis range
   * @param axisYMax Axis range
   */
  drawFunction(
    dataPoints: readonly { x: number; y: number }[],
    axisXMin: number,
    axisXMax: number,
    axisYMin: number,
    axisYMax: number
  ): void {
    if (dataPoints.length === 0) return;

    const canvasWidth = this.canvasElement.width;
    const canvasHeight = this.canvasElement.height;
    const scaleX = canvasWidth / (axisXMax - axisXMin);
    const scaleY = canvasHeight / (axisYMax - axisYMin);
    const toCanvasX = (valueX: number) => (valueX - axisXMin) * scaleX;
    const toCanvasY = (valueY: number) => canvasHeight - (valueY - axisYMin) * scaleY;

    const pixelPoints = dataPoints.map(point => ({
      xPixel: toCanvasX(point.x),
      yPixel: toCanvasY(point.y),
    }));

    this.curveRenderer.draw(pixelPoints);
  }
}