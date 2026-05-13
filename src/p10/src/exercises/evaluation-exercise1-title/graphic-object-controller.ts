/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 13 2026
 * @desc Controller that connects user input with the model and updates the view.
 */

import { GraphicObjectModel, Direction } from './graphic-object-model.js';
import { GraphicObjectView } from './graphic-object-view.js';

export class GraphicObjectController {
  private readonly upButton = document.getElementById('button-up') as HTMLButtonElement;
  private readonly downButton = document.getElementById('button-down') as HTMLButtonElement;
  private readonly leftButton = document.getElementById('button-left') as HTMLButtonElement;
  private readonly rightButton = document.getElementById('button-right') as HTMLButtonElement;

  
  /**
   * @desc Constructor of the controller, initializes model, view and event bindings.
   * @param model, logic and state of the object
   * @param view, rendering layer of the application
   */
  constructor(private readonly model: GraphicObjectModel, private readonly view: GraphicObjectView) {
    const size = this.view.getCanvasSize();
    this.model.setBounds(size.width, size.height);
    this.bindEvents();
    this.updateView();
  }

  /**
   * @desc Binds button events to movement actions.
   */
  private bindEvents(): void {
    this.upButton.addEventListener('click', () => this.move('up'));
    this.downButton.addEventListener('click', () => this.move('down'));
    this.leftButton.addEventListener('click', () => this.move('left'));
    this.rightButton.addEventListener('click', () => this.move('right'));
    const speedInput = document.getElementById('speed-input') as HTMLInputElement;
    speedInput.value = String(this.model.getStep());
    speedInput.addEventListener('input', () => {
      const parsed = parseInt(speedInput.value, 10);
      if (!isNaN(parsed)) {
        this.model.setStep(parsed);
      }
    });
  }

  /**
   * @desc Moves the object and refreshes the view.
   * @param direction, direction of movement
   */
  private move(direction: Direction): void {
    this.model.move(direction);
    this.updateView();
  }

  /**
   * @desc Updates the view with the current model state.
   */
  private updateView(): void {
    this.view.setCirclePosition(this.model.getPosition());
    this.view.render();
  }
}