/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the Lissajous curve parameters, encapsulating all the properties that define the shape and behavior of the curve
 */

/**
 * @desc Defines the parameters that control the shape of a Lissajous curve.
 */
export class Parameters {

  /**
   * @desc Constructor for Parameters
   * @param frequencyX - Frequency of the X component (a)
   * @param frequencyY - Frequency of the Y component (b)
   * @param phaseShift - Phase difference φ in radians
   * @param amplitudeX - Amplitude of the X component in pixels (A)
   * @param amplitudeY - Amplitude of the Y component in pixels (B)
   * @param animatePhaseShift - Whether φ should auto-increment over time
   */
  constructor(
    public frequencyX: number = 7,
    public frequencyY: number = 6,
    public phaseShift: number = 1.73,
    public amplitudeX: number = 100,
    public amplitudeY: number = 100,
    public animatePhaseShift: boolean = true,
  ) {}
}