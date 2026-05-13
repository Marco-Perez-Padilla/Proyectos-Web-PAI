/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 13 2026
 * @desc Application entry point — Graphic object.
 */

import { GraphicObjectModel } from "./graphic-object-model.js";
import { GraphicObjectController } from "./graphic-object-controller.js";
import { GraphicObjectView } from "./graphic-object-view.js";

function main(): void {
  const model = new GraphicObjectModel();
  const view = new GraphicObjectView('graphic-canvas');
  new GraphicObjectController(model, view);
}

main();