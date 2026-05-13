/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 27 2026
 * @desc Shared interfaces for Monte Carlo integration MVC
 */

export interface IGraphState {
  readonly expression: string;
  readonly xMin: number;
  readonly xMax: number;
  readonly yMax: number;
  readonly curvePoints: readonly { x: number; y: number }[];
  readonly axisXMin: number;
  readonly axisXMax: number;
  readonly axisYMin: number;
  readonly axisYMax: number;
}

export interface IGraphStateObserver {
  onStateChanged(newState: IGraphState): void;
}