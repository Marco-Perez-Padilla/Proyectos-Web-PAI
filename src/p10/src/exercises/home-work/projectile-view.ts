/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Facade that orchestrates all rendering sub-components for the projectile animation.
 */

import { CoordinateMapper } from './coordinate-mapper.js';
import { AxisRenderer, AxisStyle } from './axis-renderer.js';
import { ProjectileRenderer, ProjectileStyle, StoredTrajectory } from './projectile-renderer.js';
import { InfoRenderer, InfoStyle } from './info-renderer.js';

export { StoredTrajectory };

/**
 * @desc Facade class responsible for coordinating all rendering components, including axes, projectile drawing, and informational display.
 */
export class ProjectileView {
  private readonly mainCanvas: HTMLCanvasElement;
  private readonly mapper: CoordinateMapper;
  private readonly axisRenderer: AxisRenderer;
  private readonly projectileRenderer: ProjectileRenderer;
  private readonly infoRenderer: InfoRenderer;

  /**
   * @desc Constructor that initializes the canvas elements, rendering contexts, coordinate mapper, and all renderer components using styles derived from CSS.
   * @param mainCanvasId, the ID of the main canvas element used for drawing the simulation
   * @param infoCanvasId, the ID of the canvas element used for displaying textual information about the simulation
   */
  constructor(mainCanvasId: string, infoCanvasId: string) {
    this.mainCanvas = document.getElementById(mainCanvasId) as HTMLCanvasElement;
    const infoCanvas = document.getElementById(infoCanvasId) as HTMLCanvasElement;

    const mainContext = this.mainCanvas.getContext('2d')!;
    const infoContext = infoCanvas.getContext('2d')!;

    this.mapper = new CoordinateMapper(this.mainCanvas.width, this.mainCanvas.height);

    const axisStyle = this.readAxisStyle(this.mainCanvas);
    const projectileStyle = this.readProjectileStyle(this.mainCanvas);
    const infoStyle = this.readInfoStyle(infoCanvas);

    this.axisRenderer = new AxisRenderer(mainContext, this.mapper, axisStyle);
    this.projectileRenderer = new ProjectileRenderer(mainContext, this.mapper, projectileStyle);
    this.infoRenderer = new InfoRenderer(infoContext, infoCanvas.width, infoCanvas.height, infoStyle);
  }

  /**
   * @desc Sets the scaling factors for the coordinate mapper, defining the maximum values of the mathematical coordinate system.
   * @param xMax, the maximum horizontal value of the coordinate system
   * @param yMax, the maximum vertical value of the coordinate system
   */
  setScale(xMax: number, yMax: number): void {
    this.mapper.setScale(xMax, yMax);
  }

  /**
   * @desc Retrieves a color from the projectile renderer's palette based on a given index.
   * @param index, the index of the desired color in the palette
   * @returns {string} the color corresponding to the given index
   */
  paletteColour(index: number): string {
    return this.projectileRenderer.paletteColour(index);
  }

  /**
   * @desc Clears the main canvas by removing all previously drawn content.
   */
  clearMainCanvas(): void {
    const mainContext = this.mainCanvas.getContext('2d')!;
    mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
  }

  /**
   * @desc Clears the information canvas using the info renderer.
   */
  clearInfoCanvas(): void {
    this.infoRenderer.clear();
  }

  /**
   * @desc Draws the coordinate axes on the main canvas, including the ground level based on the initial height.
   * @param initialHeight, the initial height of the projectile used to position the ground line
   */
  drawAxes(initialHeight: number): void {
    this.axisRenderer.drawAxes(initialHeight);
  }

  /**
   * @desc Draws previously stored projectile trajectories on the main canvas.
   * @param trajectories, an array of stored trajectories to be rendered
   */
  drawStoredTrajectories(trajectories: StoredTrajectory[]): void {
    this.projectileRenderer.drawStoredTrajectories(trajectories);
  }

  /**
   * @desc Draws the current trajectory path of the projectile, optionally showing the full trajectory.
   * @param points, an array of coordinate points representing the trajectory
   * @param color, the color used to draw the trajectory
   * @param showTrajectory, a boolean indicating whether to display the full trajectory
   */
  drawCurrentPath(points: { coordX: number; coordY: number }[], color: string, showTrajectory: boolean): void {
    this.projectileRenderer.drawCurrentPath(points, color, showTrajectory);
  }

  /**
   * @desc Draws the projectile as a ball at the specified mathematical coordinates.
   * @param mathX, the horizontal coordinate in mathematical space
   * @param mathY, the vertical coordinate in mathematical space
   */
  drawProjectileBall(mathX: number, mathY: number): void {
    this.projectileRenderer.drawProjectileBall(mathX, mathY);
  }

  /**
   * @desc Draws the cannon on the main canvas based on the initial height and launch angle.
   * @param initialHeight, the height at which the cannon is positioned
   * @param launchAngleDegrees, the launch angle of the projectile in degrees
   */
  drawCannon(initialHeight: number, launchAngleDegrees: number): void {
    this.projectileRenderer.drawCannon(initialHeight, launchAngleDegrees);
  }

  /**
   * @desc Displays a summary of the projectile launch, including flight time, horizontal range, and maximum height.
   * @param flightTime, the total time the projectile is in the air
   * @param horizontalRange, the total horizontal distance traveled by the projectile
   * @param maxHeight, the maximum height reached by the projectile
   */
  drawLaunchSummary(flightTime: number, horizontalRange: number, maxHeight: number): void {
    this.infoRenderer.drawLaunchSummary(flightTime, horizontalRange, maxHeight);
  }

  /**
   * @desc Reads and constructs the axis rendering style from CSS custom properties applied to the canvas element.
   * @param canvas, the canvas element from which to extract style properties
   * @returns {AxisStyle} an object containing styling information for axis rendering
   */
  private readAxisStyle(canvas: HTMLCanvasElement): AxisStyle {
    const computedStyle = getComputedStyle(canvas);
    return {
      axisColor: computedStyle.getPropertyValue('--axis-color').trim() || 'dimgray',
      gridColor: computedStyle.getPropertyValue('--grid-color').trim() || 'gainsboro',
      tickFont: computedStyle.getPropertyValue('--tick-font').trim() || '11px monospace',
      tickLength: parseInt(computedStyle.getPropertyValue('--tick-length') || '4', 10),
    };
  }

  /**
   * @desc Reads and constructs the projectile rendering style from CSS custom properties applied to the canvas element.
   * @param canvas, the canvas element from which to extract style properties
   * @returns {ProjectileStyle} an object containing styling information for projectile rendering
   */
  private readProjectileStyle(canvas: HTMLCanvasElement): ProjectileStyle {
    const computedStyle = getComputedStyle(canvas);
    return {
      cannonColor: computedStyle.getPropertyValue('--cannon-color').trim() || '#333333',
      projectileColor: computedStyle.getPropertyValue('--projectile-color').trim() || '#222222',
      trajectoryWidth: parseInt(computedStyle.getPropertyValue('--trajectory-width') || '2', 10),
    };
  }

  /**
   * @desc Reads and constructs the information display style from CSS custom properties applied to the canvas element.
   * @param canvas, the canvas element from which to extract style properties
   * @returns {InfoStyle} an object containing styling information for the information renderer
   */
  private readInfoStyle(canvas: HTMLCanvasElement): InfoStyle {
    const computedStyle = getComputedStyle(canvas);
    return {
      font: computedStyle.getPropertyValue('--info-font').trim() || 'bold 15px monospace',
      color: computedStyle.getPropertyValue('--info-color').trim() || 'dimgray',
    };
  }
}