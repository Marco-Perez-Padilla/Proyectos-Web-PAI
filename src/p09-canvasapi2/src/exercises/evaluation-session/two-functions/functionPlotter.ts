/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Plots a mathematical function curve on the canvas.
 */

import { Drawable } from './drawable.js';
import { MathFunction } from './mathFunction.js';
import { CoordinateSystem } from './coordinateSystem.js';

/**
 * @desc Auxiliar style configuration for function curve rendering.
 */
export interface PlotStyle {
  curveColour: string;
  curveLineWidth: number;
}

export class FunctionPlotter implements Drawable {

  /**
   * @param mathFunction - The function to plot (replaceable via setMathFunction).
   * @param coordinateSystem - Mapping between math space and pixel space.
   * @param style - Colours and line widths for the curve.
   * @param samplingResolution - Number of sample points (default 2000).
   */
  constructor(private mathFunction: MathFunction, private readonly coordinateSystem: CoordinateSystem,
              private readonly style: PlotStyle, private readonly samplingResolution = 2000,) {}

  /**
   * @desc Replaces the current mathematical function with a new one.
   * @param newMathFunction - The replacement function.
   */
  setMathFunction(newMathFunction: MathFunction): void {
    this.mathFunction = newMathFunction;
  }

  /**
   * @desc Returns the currently active mathematical function.
   * @returns The currently active mathematical function.
   */
  getMathFunction(): MathFunction {
    return this.mathFunction;
  }

  /**
   * @desc Samples the function across the visible domain and draws the curve.
   * @param renderingContext - The canvas 2D context to draw onto.
   */
  draw(renderingContext: CanvasRenderingContext2D): void {
    const coordinateSystem = this.coordinateSystem;
    const domainWidth = coordinateSystem.getMathXMax() - coordinateSystem.getMathXMin();
    const stepSize = domainWidth / this.samplingResolution;

    renderingContext.strokeStyle = this.style.curveColour;
    renderingContext.lineWidth = this.style.curveLineWidth;
    renderingContext.lineJoin = 'round';
    renderingContext.lineCap = 'round';
    renderingContext.beginPath();

    let penIsDown = false;

    for (let sampleIndex = 0; sampleIndex <= this.samplingResolution; sampleIndex++) {
      const mathX = coordinateSystem.getMathXMin() + sampleIndex * stepSize;
      const mathY = this.mathFunction.evaluate(mathX);
      
      if (!isFinite(mathY) || !this.isInImage(mathY)) {
        penIsDown = false;
        continue;
      }

      const clampedMathY = Math.max(
        coordinateSystem.getMathYMin() - 1,
        Math.min(coordinateSystem.getMathYMax() + 1, mathY),
      );

      const pixelX = coordinateSystem.toCanvasX(mathX);
      const pixelY = coordinateSystem.toCanvasY(clampedMathY);

      if (!penIsDown) {
        renderingContext.moveTo(pixelX, pixelY);
        penIsDown = true;
      } else {
        renderingContext.lineTo(pixelX, pixelY);
      }
    }

    renderingContext.stroke();
  }

  /**
   * @desc Checks if a given mathY value is within the vertical bounds of the coordinate system.
   * @param mathY - The mathematical y-value to check.
   * @returns {boolean} True if mathY is within the vertical bounds, false otherwise.
   */
  private isInImage(mathY: number): boolean {
    return mathY >= this.coordinateSystem.getMathYMin() && mathY <= this.coordinateSystem.getMathYMax();
  }
}