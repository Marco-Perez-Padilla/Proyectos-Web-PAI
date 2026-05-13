/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Client program for the montecarlo application
 */

import { MontecarloView } from "./montecarlo-view.js"
import { MontecarloModel } from "./montecarlo-model.js";
import { MontecarloController } from "./montecarlo-controller.js";

function main(): void {
  const view: MontecarloView = new MontecarloView();
  const model: MontecarloModel = new MontecarloModel();
  new MontecarloController(view, model);
}

main();