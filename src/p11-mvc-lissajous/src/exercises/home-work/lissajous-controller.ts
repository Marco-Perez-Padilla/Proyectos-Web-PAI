/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the Lissajous curve controller, responsible for managing the interaction between the model and the view.
 */

import { LissajousModel } from './lissajous-model.js';
import { LissajousView } from './lissajous-view.js';
import { Parameters } from './parameters.js';

/**
 * @desc Drives the animation loop and mediates between model and view.
 */
export class LissajousController {
  private previousTimestamp = 0;

  /**
   * @desc Constructor for LissajousController
   * @param model - The Lissajous model
   * @param view - The main view
   */
  constructor(private readonly model: LissajousModel, private readonly view: LissajousView,) {
    this.view.bindControls(
      this.model.getParameters(),
      (key: keyof Parameters, value: number | boolean) => {
        this.model.setParameter(key, value);
      },
    );
    this.start();
  }

  /**
   * @desc Starts the requestAnimationFrame loop.
   */
  start(): void {
    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }

  /**
   * @desc Main animation loop, called on each frame. Updates the model and renders the view.
   * @param currentTimestamp - The current time in milliseconds provided by requestAnimationFrame
   */
  private loop(currentTimestamp: number): void {
    const deltaTime = this.previousTimestamp === 0
      ? 0
      : Math.min((currentTimestamp - this.previousTimestamp) / 1000, 0.05);

    this.previousTimestamp = currentTimestamp;
    this.model.update(deltaTime);
    this.view.render(this.model.getPoints());
    this.view.syncPhiDisplay(this.model.getParameters().phaseShift);  // añadir esto

    requestAnimationFrame((timestamp) => this.loop(timestamp));
  }
}