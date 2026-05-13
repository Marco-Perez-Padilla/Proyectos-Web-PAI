/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for binding DOM controls to parameter changes
 */

import { SliderUpdater } from './slider-updater.js';
import { Parameters } from './parameters.js';

type ParameterChangeCallback = (key: keyof Parameters, value: number | boolean) => void;

/**
 * @desc Binds DOM controls to a parameter-change callback. Single responsibility: control wiring only.
 */
export class ControlsBinder {

  /**
   * @desc Constructor for ControlsBinder
   * @param parameters - Shared parameters used to initialise control values
   * @param onParameterChange - Callback invoked when any control value changes
   */
  constructor(
    private readonly parameters: Parameters,
    private readonly onParameterChange: ParameterChangeCallback,
  ) {}

  /**
   * @desc Wires all sliders, number inputs and checkboxes to the callback.
   */
  bind(): void {
    this.bindNumericControl('slider-a',   'input-a',   'frequencyX');
    this.bindNumericControl('slider-b',   'input-b',   'frequencyY');
    this.bindNumericControl('slider-phi', 'input-phi', 'phaseShift');
    this.bindNumericControl('slider-A',   'input-A',   'amplitudeX');
    this.bindNumericControl('slider-B',   'input-B',   'amplitudeY');

    const checkboxElement = document.getElementById('animate-phi') as HTMLInputElement;
    checkboxElement.checked = this.parameters.animatePhaseShift;
    checkboxElement.addEventListener('change', () => {
      this.onParameterChange('animatePhaseShift', checkboxElement.checked);
    });
  }

  /**
   * @desc Synchronises a slider and a number input, notifying on change.
   * @param sliderId - DOM id of the range input
   * @param inputId - DOM id of the number input
   * @param parameterKey - Corresponding key in the Parameters object
   */
  private bindNumericControl(sliderId: string, inputId: string, parameterKey: keyof Parameters,): void {
    const sliderElement = document.getElementById(sliderId) as HTMLInputElement;
    const inputElement  = document.getElementById(inputId)  as HTMLInputElement;

    const initialValue = String(this.parameters[parameterKey]);
    sliderElement.value = initialValue;
    inputElement.value  = initialValue;
    SliderUpdater.updateTrackFill(sliderElement);

    const notifyChange = (rawValue: string) => {
      sliderElement.value = rawValue;
      inputElement.value  = rawValue;
      SliderUpdater.updateTrackFill(sliderElement);
      this.onParameterChange(parameterKey, parseFloat(rawValue));
    };

    sliderElement.addEventListener('input',  () => notifyChange(sliderElement.value));
    inputElement.addEventListener('change', () => notifyChange(inputElement.value));
  }
}