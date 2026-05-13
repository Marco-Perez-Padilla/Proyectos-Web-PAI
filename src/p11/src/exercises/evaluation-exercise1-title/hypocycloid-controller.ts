/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the hypocycloid controller
 */

import { HypocycloidView } from "./hypocycloid-view.js";
import { HypocycloidModel } from "./hypocycloid-model.js";

export class HypocycloidController {

  /**
   * @desc Constructor for the class HypocycloidController
   * @param view - The Hypocycloid view
   * @param model - The Hypocycloid model
   */
  constructor(private readonly view: HypocycloidView, private readonly model: HypocycloidModel) {
    view.render(model.getPoints());
  }

}