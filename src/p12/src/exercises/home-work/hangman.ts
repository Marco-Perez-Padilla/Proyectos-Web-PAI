/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 23 2026
 * @desc Entry point for the Hangman game. Initializes the Model, View and Controller.
 */

import { HangmanModel } from './hangman-model.js';
import { HangmanView } from './hangman-view.js';
import { HangmanController } from './hangman-controller.js';

function main(): void {
  const model = new HangmanModel();
  const view = new HangmanView();
  new HangmanController(model, view);
}

main();