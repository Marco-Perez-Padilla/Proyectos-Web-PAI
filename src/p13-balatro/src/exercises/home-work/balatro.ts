/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 30 2026
 * @desc Entry point – initializes the MVC components.
 */

import { BalatroModel } from './balatro-model.js';
import { BalatroView } from './balatro-view.js';
import { BalatroController } from './balatro-controller.js';

/**
 * @function main
 * @desc Starts the application after the DOM is ready.
 */
function main(): void {
  const model = new BalatroModel();
  const view = new BalatroView();
  new BalatroController(model, view);
}

main();