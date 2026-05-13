/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the Lissajous curve view, responsible for rendering the curve and managing the canvas.
 */

import { CanvasRenderer } from './canvas-renderer.js';
import { GridRenderer } from './grid-renderer.js';
import { CurveRenderer } from './curve-renderer.js';
import { ResizeManager } from './resize-manager.js';
import { ControlsBinder } from './controls-binder.js';
import { Parameters } from './parameters.js';
import { SliderUpdater } from './slider-updater.js';

type ParameterChangeCallback = (key: keyof Parameters, value: number | boolean) => void;

/**
 * @desc Main view for the Lissajous application. Single responsibility: canvas rendering.
 */
export class LissajousView {
  private readonly renderingContext: CanvasRenderingContext2D;
  private readonly canvasRenderer: CanvasRenderer;
  private readonly gridRenderer: GridRenderer;
  private readonly curveRenderer: CurveRenderer;
  private readonly resizeManager: ResizeManager;
  private canvasWidth = 0;
  private canvasHeight = 0;

  /**
   * @desc Constructor for LissajousView. Initializes renderers and sets up resize handling.
   * @param canvasElement - The HTML canvas element
   * @param parameters - Shared parameters used to initialise control values
   * @throws {Error} If the 2D rendering context cannot be obtained
   */
  constructor(private readonly canvasElement: HTMLCanvasElement, parameters: Parameters,) {
    const context = canvasElement.getContext('2d');
    if (!context) throw new Error('Canvas 2D context not available');

    this.renderingContext = context;
    this.canvasRenderer   = new CanvasRenderer(this.renderingContext);
    this.gridRenderer     = new GridRenderer(this.renderingContext);
    this.curveRenderer    = new CurveRenderer(this.renderingContext);
    this.resizeManager    = new ResizeManager(canvasElement);

    this.handleResize();
    this.resizeManager.onResize(() => this.handleResize());
  }

  /**
   * @desc Registers the callback and wires all DOM controls via ControlsBinder.
   * @param parameters - Shared parameters used to initialise control values
   * @param callback - Function invoked with the changed key and new value
   */
  bindControls(parameters: Parameters, callback: ParameterChangeCallback): void {
    new ControlsBinder(parameters, callback).bind();
  }

  /**
   * @desc Renders one frame: clears the canvas, draws the grid, then draws the curve.
   * @param points - Array of {xPoint, yPoint} coordinates relative to the origin
   */
  render(points: { xPoint: number; yPoint: number }[]): void {
    this.canvasRenderer.clear(this.canvasWidth, this.canvasHeight);
    this.gridRenderer.draw(this.canvasWidth, this.canvasHeight);
    this.curveRenderer.draw(points, this.canvasWidth / 2, this.canvasHeight / 2);
  }

  /**
   * @desc Handles window resize events by updating canvas dimensions.
   */
  private handleResize(): void {
    const dimensions  = this.resizeManager.resize();
    this.canvasWidth  = dimensions.width;
    this.canvasHeight = dimensions.height;
  }

  /**
   * @desc Updates the φ input and slider to reflect the current animated value.
   * @param phaseShift - Current phase shift value from the model
   */
  syncPhiDisplay(phaseShift: number): void {
    const sliderElement = document.getElementById('slider-phi') as HTMLInputElement;
    const inputElement  = document.getElementById('input-phi')  as HTMLInputElement;
    const rounded = Math.round(phaseShift * 100) / 100;
    sliderElement.value = String(rounded);
    inputElement.value  = String(rounded);
    SliderUpdater.updateTrackFill(sliderElement);
  }
}