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

import { PokerModel } from './poker-model.js';
import { PokerView } from './poker-view.js';
import { PokerController } from './poker-controller.js';

/**
 * @function main
 * @desc Starts the application after the DOM is ready.
 */
function main(): void {
  const model = new PokerModel();
  const view = new PokerView();
  new PokerController(model, view);
}

main();