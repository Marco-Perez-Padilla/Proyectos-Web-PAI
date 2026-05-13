/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Interface for mathematical functions — Strategy pattern contract.
 */

export interface MathFunction {
  /**
   * @desc Evaluates the function at the given domain value.
   * @param domainValue - The x value in mathematical coordinates.
   * @returns {number} The range of the function at domainValue.
   */
  evaluate(domainValue: number): number;

  /**
   * @desc Label used in the UI and axis title.
   */
  readonly label: string;
}