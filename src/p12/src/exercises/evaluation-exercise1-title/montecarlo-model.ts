/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Model for Monte Carlo integration (minimal initial state)
 */

import type { IGraphState, IGraphStateObserver } from './interfaces.js';
declare const math: {
  evaluate: (expr: string, scope?: Record<string, unknown>) => unknown;
};

const AXIS_PADDING = 0.1;
const CURVE_SAMPLE_COUNT = 100;

export class MontecarloModel {
  
  private expression = '-(x-1)(x+1)';
  private xMinValue = -1;
  private xMaxValue = 1;
  private yMaxValue = 1;
  private observer: IGraphStateObserver | null = null;

  /**
   * @desc Registers the observer that receives state notifications.
   * @param observer Object implementing IGraphStateObserver
   */
  setObserver(observer: IGraphStateObserver): void {
    this.observer = observer;
  }

  /**
   * @desc Updates the mathematical expression and notifies.
   * @param newExpression New function expression
   */
  setExpression(newExpression: string): void {
    this.expression = newExpression;
    this.notify();
  }

  /**
   * @desc Updates left interval bound and notifies.
   * @param newXMin New x-min value
   */
  setXMin(newXMin: number): void {
    this.xMinValue = newXMin;
    this.notify();
  }

  /**
   * @desc Updates right interval bound and notifies.
   * @param newXMax New x-max value
   */
  setXMax(newXMax: number): void {
    this.xMaxValue = newXMax;
    this.notify();
  }

  /**
   * @desc Updates maximum y value and notifies.
   * @param newYMax New y-max value
   */
  setYMax(newYMax: number): void {
    this.yMaxValue = newYMax;
    this.notify();
  }

  /**
   * @desc Forces an initial notification to paint the canvas with default values.
   */
  start(): void {
    this.notify();
  }

  /**
   * @desc Builds the current state and sends it to the observer.
   */
  private notify(): void {
    if (!this.observer) return;
    const state = this.buildState();
    this.observer.onStateChanged(state);
  }

  /**
   * @desc Computes the axis ranges and samples the function.
   * @returns Current IGraphState
   */
  private buildState(): IGraphState {
    const curvePoints = this.sampleCurve();

    const axisXMin = -2;
    const axisXMax = 3;
    const axisYMin = -2;
    const axisYMax = 2;

    return {
      expression: this.expression,
      xMin: this.xMinValue,
      xMax: this.xMaxValue,
      yMax: this.yMaxValue,
      curvePoints,
      axisXMin,
      axisXMax,
      axisYMin,
      axisYMax,
    };
  }

  /**
   * @desc Samples the function at evenly spaced points in the interval.
   * @returns Array of {x, y} data points (uses only finite values)
   */
  private sampleCurve(): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const step = (this.xMaxValue - this.xMinValue) / CURVE_SAMPLE_COUNT;
    try {
      for (let i = 0; i <= CURVE_SAMPLE_COUNT; i++) {
        const x = this.xMinValue + i * step;
        const y = math.evaluate(this.expression, { x });
        if (Number.isFinite(y)) {
          points.push({ x, y: Number(y) });
        }
      }
    } catch {
    }
    return points;
  }
}