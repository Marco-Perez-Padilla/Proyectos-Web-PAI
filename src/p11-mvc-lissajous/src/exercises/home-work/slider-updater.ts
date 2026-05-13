/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for updating the visual fill of a range slider based on its current value
 */

/**
 * @desc Updates the visual fill track of a range slider via a CSS custom property.
 */
export class SliderUpdater {
  /**
   * @desc Computes the fill percentage and sets --track-fill on the slider element.
   * @param sliderElement - The range input element to update
   */
  static updateTrackFill(sliderElement: HTMLInputElement): void {
    const minimum = parseFloat(sliderElement.min) || 0;
    const maximum = parseFloat(sliderElement.max) || 100;
    const currentValue = parseFloat(sliderElement.value);
    const fillPercentage = ((currentValue - minimum) / (maximum - minimum)) * 100;
    sliderElement.style.setProperty('--track-fill', `${fillPercentage}%`);
  }
}