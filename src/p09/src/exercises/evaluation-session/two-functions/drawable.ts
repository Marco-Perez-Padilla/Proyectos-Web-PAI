/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Interface for all drawable components in the canvas application.
 */

export interface Drawable {
  /**
   * @desc Renders this component onto the given 2D rendering context.
   * @param context - The canvas 2D rendering context to draw onto.
   */
  draw(context: CanvasRenderingContext2D): void;
}