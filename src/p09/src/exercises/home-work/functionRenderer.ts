/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Facade that orchestrates the entire rendering pipeline.
 */

import { CanvasView } from './canvasView.js';
import { CoordinateSystem } from './coordinateSystem.js';
import { AxisRenderer, AxisStyle } from './axisRenderer.js';
import { FunctionPlotter, PlotStyle } from './functionPlotter.js';
import { MathFunction } from './mathFunction.js';
import { SineFunction } from './implementedFunctions.js';

/**
 * @desc Central style configuration for the renderer.
 */
export interface RendererStyle {
  backgroundColor: string;

  axis: AxisStyle;

  functionPlot: PlotStyle;

  label: {
    font: string;
    textColor: string;
    backgroundColor: string;
    padding: number;
  };
}

export class FunctionRenderer {
  private readonly canvasView: CanvasView;
  private readonly coordinateSystem: CoordinateSystem;
  private readonly axisRenderer: AxisRenderer;
  private readonly functionPlotter: FunctionPlotter;
  private readonly style: RendererStyle;

  /**
   * @param canvasElementId - The ID of the canvas element to render on.
   * @param mathXMin - Minimum X value in the mathematical coordinate system.
   * @param mathXMax - Maximum X value in the mathematical coordinate system.
   * @param mathYMin - Minimum Y value in the mathematical coordinate system.
   * @param mathYMax - Maximum Y value in the mathematical coordinate system.
   * @param initialMathFunction - The initial mathematical function to plot.
   * @param tickSpacing - Spacing between ticks on the axes in mathematical units.
   * @param style - Optional custom styles for the renderer.
   */
  constructor(canvasElementId: string, mathXMin = -10, mathXMax = 10, mathYMin = -6, mathYMax = 6,
              initialMathFunction: MathFunction = new SineFunction(), style?: Partial<RendererStyle>,) {
    this.canvasView = new CanvasView(canvasElementId);
    const canvasElement = this.canvasView.getCanvasElement();

    // Extraer propiedades CSS usando getComputedStyle
    const computed = getComputedStyle(canvasElement);

    this.style = {
      backgroundColor: computed.backgroundColor || 'white',
      axis: {
        axisColour: computed.getPropertyValue('--axis-color').trim() || 'black',
        gridColour: computed.getPropertyValue('--grid-color').trim() || 'lightgrey',
        tickLabelFont: computed.getPropertyValue('--tick-font').trim() || '10px monospace',
        tickLengthPixels: parseInt(computed.getPropertyValue('--tick-length') || '4', 10),
      },
      functionPlot: {
        curveColour: computed.getPropertyValue('--curve-color').trim() || 'red',
        curveLineWidth: parseInt(computed.getPropertyValue('--curve-width') || '2', 10),
      },
      label: {
        font: computed.getPropertyValue('--label-font').trim() || 'bold 14px monospace',
        textColor: computed.getPropertyValue('--label-color').trim() || 'red',
        backgroundColor: computed.getPropertyValue('--label-bg').trim() || 'white',
        padding: parseInt(computed.getPropertyValue('--label-padding') || '10', 10),
      },
      ...style,
    };

    const MARGIN = 40;
    this.coordinateSystem = new CoordinateSystem(
      mathXMin, mathXMax,
      mathYMin, mathYMax,
      this.canvasView.getWidth(),
      this.canvasView.getHeight(),
      MARGIN, MARGIN, MARGIN, MARGIN,
    );

    const adaptedTickSpacing = this.coordinateSystem.computeNiceTickSpacing();
    this.axisRenderer = new AxisRenderer(this.coordinateSystem, this.style.axis, adaptedTickSpacing);
    
    this.functionPlotter = new FunctionPlotter(
      initialMathFunction,
      this.coordinateSystem,
      this.style.functionPlot,
    );
  }

  /**
   * @desc Updates the mathematical function being plotted and re-renders the canvas.
   * @param newMathFunction - The new mathematical function to plot.
   */
  setMathFunction(newMathFunction: MathFunction): void {
    this.functionPlotter.setMathFunction(newMathFunction);
    this.render();
  }

  /**
   * @desc Retrieves the label of the currently active mathematical function.
   * @returns The label of the active mathematical function.
   */
  getActiveFunctionLabel(): string {
    return this.functionPlotter.getMathFunction().label;
  }

  /**
   * @desc Executes the rendering pipeline to draw the axes, function plot, and function label on the canvas.
   */
  render(): void {
    const context = this.canvasView.getRenderingContext();
    this.canvasView.fillBackground(this.style.backgroundColor);
    this.axisRenderer.draw(context);
    this.functionPlotter.draw(context);
    this.drawFunctionLabel(context);
  }

  /**
   * @desc Draws the label of the currently active mathematical function on the canvas.
   * @param context - The rendering context of the canvas to draw on.
   */
  private drawFunctionLabel(context: CanvasRenderingContext2D): void {
    const labelText = this.functionPlotter.getMathFunction().label;
    const labelStyle = this.style.label;

    context.font = labelStyle.font;
    context.textAlign = 'left';
    context.textBaseline = 'top';

    const padding = labelStyle.padding;
    const width = context.measureText(labelText).width;
    const height = 18;

    context.fillStyle = labelStyle.backgroundColor;
    context.fillRect(padding - 4, padding - 3, width + 8, height + 2);

    context.fillStyle = labelStyle.textColor;
    context.fillText(labelText, padding, padding);
  }
}