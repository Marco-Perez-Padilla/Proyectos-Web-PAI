/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 13 2026
 * @desc Programa cliente main
 */

import { View } from './view.js';

/**
 * @desc Entry point of the application. Creates the view and sets up event listeners.
 */
function main(): void {
  const view = new View('Canvas');
  const NUMBER_CIRCLES: number = 20;
  view.run(NUMBER_CIRCLES);
}

main();