/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 06 2026
 * @desc Cliente para comprobar el funcionamiento del patrón Prototype
 */

import {Character} from './character-good.js';

const main = function (): void {
  const gandalf: Character = new Character('Gandalf', 17);
  gandalf.describe();
  const copiaGandalf: Character = gandalf.clone();
  copiaGandalf.describe();
}

main();
