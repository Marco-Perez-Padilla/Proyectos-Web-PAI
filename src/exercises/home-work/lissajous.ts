/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Client program for the Lissajous curve application, responsible for initializing the MVC components and starting the application.
 */

import { Parameters } from './parameters.js';
import { LissajousModel } from './lissajous-model.js';
import { LissajousView } from './lissajous-view.js';
import { LissajousController } from './lissajous-controller.js';

/**
 * @desc Entry point of the Lissajous application.
 * @throws {Error} If the canvas element is not found in the DOM
 */
function main(): void {
  const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvasElement) throw new Error('Canvas element not found');

  const parameters = new Parameters();
  const model      = new LissajousModel(parameters);
  const view       = new LissajousView(canvasElement, parameters);

  new LissajousController(model, view);
}

main();