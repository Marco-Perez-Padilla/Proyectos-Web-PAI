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
  window.onload = () => view.run();
  const generateButton = document.getElementById('generateButton');
  if (generateButton) generateButton.addEventListener('click', () => view.run());
}

main();