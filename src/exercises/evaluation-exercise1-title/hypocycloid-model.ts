/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 18 2026
 * @desc Class for the hypocycloid  model
 */


export interface Point {
  xPoint: number;
  yPoint: number;
}

export interface Radius {
  smallRadius: number;
  bigRadius: number;
}

export class HypocycloidModel {
  constructor(private readonly radiuses: Radius) {}

  private readonly points: Point[] = [
    { xPoint: 3, yPoint: 4 },
    { xPoint: -2, yPoint: 1 }
  ];

  /**
   * @desc Getter for the points thata re in the model
   * @returns {Point[]} List of the points in the graphic
   */
  getPoints(): Point[] {
    return [...this.points];
  }

  /**
   * @desc Converts the angle from degrees to radians, which is necessary for the trigonometric calculations in the position and flight time computations.
   * @returns {number} the angle in radians
   */
  private angleRad(angleDegrees: number): number {
    return (angleDegrees * Math.PI) / 180;
  }

  /**
   * @desc Computes all the points of the circle
   * @returns {Point[]} Array of computed points
   */
  private computePoints(): Point[] {
    for(let i: number = 0; i <=359; ++i) {
      let xTheta = (this.radiuses.bigRadius - this.radiuses.smallRadius) * cosine(i);
    }
  }
}