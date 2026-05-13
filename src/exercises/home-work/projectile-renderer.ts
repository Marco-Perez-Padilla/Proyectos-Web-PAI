/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Draws cannon, projectile ball and trajectory polylines on the main canvas.
 */

import { CoordinateMapper } from './coordinate-mapper.js';

/**
 * @desc Interface for storing a projectile trajectory along with its associated color for rendering purposes.
 */
export interface StoredTrajectory {
  points: { coordX: number; coordY: number }[];
  color: string;
}

/**
 * @desc Interface for the style of the projectile rendering, including colors for the cannon and projectile, as well as the width of the trajectory lines.
 */
export interface ProjectileStyle {
  cannonColor: string;
  projectileColor: string;
  trajectoryWidth: number;
}

export class ProjectileRenderer {
  private readonly COLOUR_PALETTE = ['royalblue', 'crimson', 'seagreen', 'darkorange', 'mediumpurple', 'teal'];

  /**
   * @desc Constructor for ProjectileRenderer class, initializes the rendering context, coordinate mapper, and style for drawing the projectile and its trajectory on the canvas.
   * @param context, the 2D rendering context of the main canvas where the projectile and trajectory will be drawn
   * @param mapper, an instance of CoordinateMapper that converts mathematical coordinates to pixel coordinates for rendering on the canvas
   * @param style, an object containing the colors and line width to be used for rendering the cannon, projectile, and trajectory lines on the canvas
   */
  constructor(private readonly context: CanvasRenderingContext2D, private readonly mapper: CoordinateMapper,
              private readonly style: ProjectileStyle,) {}

  /**
   * @desc Returns a color from the predefined color palette based on the given index, which is typically used to differentiate multiple trajectories when rendering them on the canvas.
   * @param index, the index used to select a color from the COLOUR_PALETTE array, where the color is chosen in a cyclic manner using the modulus operator
   * @returns {string} a color string from the COLOUR_PALETTE array corresponding to the given index
   */
  paletteColour(index: number): string {
    return this.COLOUR_PALETTE[index % this.COLOUR_PALETTE.length];
  }

  /**
   * @desc Draws multiple stored trajectories on the canvas, where each trajectory consists of an array of points and an associated color. This method is typically called to render all previously completed trajectories on the canvas for comparison with the current trajectory being animated.
   * @param trajectories, an array of StoredTrajectory objects, where each object contains an array of points (with mathematical coordinates) and a color for rendering that trajectory on the canvas
   */
  drawStoredTrajectories(trajectories: StoredTrajectory[]): void {
    for (const trajectory of trajectories) {
      this.drawPolyline(trajectory.points, trajectory.color);
    }
  }

  /**
   * @desc Draws the current trajectory on the canvas, using the specified points, color, and visibility setting. This method is typically called to render the trajectory of the projectile being animated.
   * @param points, an array of points (with mathematical coordinates) representing the trajectory of the projectile
   * @param color, a string representing the color to be used for rendering the trajectory on the canvas
   * @param showTrajectory, a boolean indicating whether to display the trajectory on the canvas
   */
  drawCurrentPath(points: { coordX: number; coordY: number }[], color: string, showTrajectory: boolean): void {
    if (showTrajectory) this.drawPolyline(points, color);
  }

  /**
   * @desc Draws the projectile as a ball on the canvas at the specified mathematical coordinates, converting them to pixel coordinates using the CoordinateMapper. This method is typically called to render the current position of the projectile during animation.
   * @param mathX, the x coordinate of the projectile in mathematical terms (not pixel coordinates)
   * @param mathY, the y coordinate of the projectile in mathematical terms (not pixel coordinates)
   */
  drawProjectileBall(mathX: number, mathY: number): void {
    this.context.save();
    this.context.fillStyle = this.style.projectileColor;
    this.context.beginPath();
    this.context.arc(this.mapper.toPixelX(mathX), this.mapper.toPixelY(mathY), 6, 0, 2 * Math.PI);
    this.context.fill();
    this.context.restore();
  }

  /**
   * @desc Draws a cannon on the canvas at the specified initial height and launch angle, using the style defined in the ProjectileStyle. The cannon consists of a barrel and an arrowhead, which are drawn based on the mathematical coordinates converted to pixel coordinates. This method is typically called to render the cannon from which the projectile is launched.
   * @param initialHeight, the initial height of the cannon in mathematical coordinates (meters)
   * @param launchAngleDegrees, the launch angle of the cannon in degrees, which determines the orientation of the barrel and arrowhead
   */
  drawCannon(initialHeight: number, launchAngleDegrees: number): void {
    const originPixelX = this.mapper.toPixelX(0);
    const originPixelY = this.mapper.toPixelY(initialHeight);
    const angleRad = (launchAngleDegrees * Math.PI) / 180;
    const barrelLength = 44;
    const tipPixelX = originPixelX + barrelLength * Math.cos(angleRad);
    const tipPixelY = originPixelY - barrelLength * Math.sin(angleRad);
    this.drawCannonBarrel(originPixelX, originPixelY, tipPixelX, tipPixelY);
    this.drawCannonArrowhead(tipPixelX, tipPixelY, angleRad);
  }

  /**
   * @desc Draws the barrel of the cannon as a line on the canvas from the origin point to the tip point, using the specified color and line width defined in the ProjectileStyle. This method is called by drawCannon to render the barrel of the cannon.
   * @param originPixelX, the x coordinate of the origin point of the cannon barrel in pixel coordinates
   * @param originPixelY, the y coordinate of the origin point of the cannon barrel in pixel coordinates
   * @param tipPixelX, the x coordinate of the tip point of the cannon barrel in pixel coordinates, calculated based on the launch angle and barrel length
   * @param tipPixelY, the y coordinate of the tip point of the cannon barrel in pixel coordinates, calculated based on the launch angle and barrel length
   */
  private drawCannonBarrel(originPixelX: number, originPixelY: number, tipPixelX: number, tipPixelY: number): void {
    this.context.save();
    this.context.strokeStyle = this.style.cannonColor;
    this.context.lineWidth = 4;
    this.context.lineCap = 'round';
    this.context.beginPath();
    this.context.moveTo(originPixelX, originPixelY);
    this.context.lineTo(tipPixelX, tipPixelY);
    this.context.stroke();
    this.context.restore();
  }

  /**
   * @desc Draws the arrowhead of the cannon as a filled triangle on the canvas at the tip of the barrel, oriented based on the launch angle. This method is called by drawCannon to render the arrowhead of the cannon, which visually indicates the direction of launch.
   * @param tipPixelX, the x coordinate of the tip point of the cannon barrel in pixel coordinates, where the arrowhead will be drawn
   * @param tipPixelY, the y coordinate of the tip point of the cannon barrel in pixel coordinates, where the arrowhead will be drawn
   * @param angleRad, the launch angle of the cannon in radians, which determines the orientation of the arrowhead, calculated from the launch angle in degrees
   */
  private drawCannonArrowhead(tipPixelX: number, tipPixelY: number, angleRad: number): void {
    this.context.save();
    this.context.fillStyle = this.style.cannonColor;
    this.context.translate(tipPixelX, tipPixelY);
    this.context.rotate(-angleRad);
    this.context.beginPath();
    this.context.moveTo(0, 0);
    this.context.lineTo(-10, -4);
    this.context.lineTo(-10, 4);
    this.context.closePath();
    this.context.fill();
    this.context.restore();
  }

  /**
   * @desc Draws a polyline on the canvas connecting the given points with the specified color, using the CoordinateMapper to convert mathematical coordinates to pixel coordinates. This method is used to render both the current trajectory and stored trajectories of the projectile.
   * @param points, an array of points (with mathematical coordinates) that define the vertices of the polyline to be drawn on the canvas
   * @param color, a string representing the color to be used for rendering the polyline on the canvas, typically taken from the color palette based on the trajectory index
   */
  private drawPolyline(points: { coordX: number; coordY: number }[], color: string): void {
    if (points.length < 2) return;
    this.context.save();
    this.context.strokeStyle = color;
    this.context.lineWidth = this.style.trajectoryWidth;
    this.context.beginPath();
    this.context.moveTo(this.mapper.toPixelX(points[0].coordX), this.mapper.toPixelY(points[0].coordY));
    for (let index = 1; index < points.length; index++) {
      this.context.lineTo(this.mapper.toPixelX(points[index].coordX), this.mapper.toPixelY(points[index].coordY));
    }
    this.context.stroke();
    this.context.restore();
  }
}