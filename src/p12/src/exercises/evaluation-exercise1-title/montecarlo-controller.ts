/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Controller for Monte Carlo montecarlo (paint‑only phase)
 */

import type { IGraphState, IGraphStateObserver } from './interfaces.js';
import type { MontecarloModel } from './montecarlo-model.js';
import type { MontecarloView } from './montecarlo-view.js';

export class MontecarloController implements IGraphStateObserver {
  /**
   * @desc Connects the model and the view, triggers the initial rendering.
   * @param model The montecarlo logic layer
   * @param view  The presentation layer
   */
  constructor(
    
    private readonly view: MontecarloView,
    private readonly model: MontecarloModel,
  ) {
    this.model.setObserver(this);
    // Inicia la primera notificación: ejes, cuadrícula, rectángulo y función por defecto
    this.model.start();
  }

  /**
   * @desc Receives a new state from the model and forwards it to the view.
   * @param newState The latest graph state
   */
  onStateChanged(newState: IGraphState): void {
    this.view.render(newState);
  }
}