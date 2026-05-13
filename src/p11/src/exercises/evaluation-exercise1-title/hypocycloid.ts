/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 20 2026
 * @desc Client program for the hypocycloid application
 */

import { HypocycloidView } from "./hypocycloid-view.js"
import { HypocycloidModel } from "./hypocycloid-model.js";
import { HypocycloidController } from "./hypocycloid-controller.js";

function main(): void {
  const canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvasElement) throw new Error('Canvas element not found');

  const view: HypocycloidView = new HypocycloidView(canvasElement);
  const model: HypocycloidModel = new HypocycloidModel();
  new HypocycloidController(view, model);
}

main();