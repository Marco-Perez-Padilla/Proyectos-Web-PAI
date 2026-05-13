/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc View layer for Monte Carlo integration (phase 2)
 */

import type { IGraphState } from './interfaces.js';
import { CanvasRenderer } from './canvas-renderer.js';

export class MontecarloView {
  private readonly canvasRenderer: CanvasRenderer;

  /**
   * @desc Initializes DOM references and canvas renderer.
   */
  constructor() {
    const appElement = document.getElementById('app');
    if (!appElement) throw new Error('Element #app not found');

    const canvasElement = appElement.querySelector('#plot-canvas') as HTMLCanvasElement;
    this.canvasRenderer = new CanvasRenderer(canvasElement);
  }

  /**
   * @desc Redraws the canvas with the given state.
   * @param state State snapshot from the model
   */
  render(state: IGraphState): void {
    this.canvasRenderer.clear();
    this.canvasRenderer.drawGridAndAxes(state.axisXMin, state.axisXMax, state.axisYMin, state.axisYMax);
    this.canvasRenderer.drawRectangle(state.xMin, state.xMax, state.yMax,
                                      state.axisXMin, state.axisXMax, state.axisYMin, state.axisYMax);
    this.canvasRenderer.drawFunction(state.curvePoints,
                                     state.axisXMin, state.axisXMax, state.axisYMin, state.axisYMax);
  }
}