/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the Lissajous curve model, responsible for computing the curve points based on parameters and updating the phase shift over time.
 */

import { Parameters } from './parameters.js';

/**
 * @desc Computes and updates the state of a Lissajous curve.
 */
export class LissajousModel {
  private static readonly STEPS = 2000;
  private static readonly PHASE_SPEED = 0.5;

  /**
   * @desc Constructor for LissajousModel
   * @param parameters - Shared parameters object
   */
  constructor(private readonly parameters: Parameters) {}

  /**
   * @desc Advances φ if animation is enabled.
   * @param deltaTime - Elapsed time since last frame in seconds
   */
  update(deltaTime: number): void {
    if (this.parameters.animatePhaseShift) {
      this.parameters.phaseShift += deltaTime * LissajousModel.PHASE_SPEED;
      if (this.parameters.phaseShift > 2 * Math.PI) {
        this.parameters.phaseShift -= 2 * Math.PI;
      }
    }
  }

  /**
   * @desc Updates a single parameter value.
   * @param key - The parameter key to update
   * @param value - The new value
   */
  setParameter(key: keyof Parameters, value: number | boolean): void {
    (this.parameters[key] as typeof value) = value;
  }

  /**
   * @desc Returns the full set of points for the current parameters.
   * @returns Array of {xPoint, yPoint} coordinates relative to the curve origin
   */
  getPoints(): { xPoint: number; yPoint: number }[] {
    const { frequencyX, frequencyY, phaseShift, amplitudeX, amplitudeY } = this.parameters;
    const points: { xPoint: number; yPoint: number }[] = [];

    for (let stepIndex = 0; stepIndex <= LissajousModel.STEPS; stepIndex++) {
      const parameter = (stepIndex / LissajousModel.STEPS) * 2 * Math.PI;
      points.push({
        xPoint: amplitudeX * Math.sin(frequencyX * parameter + phaseShift),
        yPoint: amplitudeY * Math.sin(frequencyY * parameter),
      });
    }
    return points;
  }

  /**
   * @desc Returns a reference to the current parameters object.
   * @returns The shared Parameters instance
   */
  getParameters(): Parameters {
    return this.parameters;
  }
}