/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Wires user input to the model and drives the animation loop.
 */

import { ProjectileModel } from './projectile-model.js';
import { ProjectileView, StoredTrajectory } from './projectile-view.js';

export class ProjectileController {
  private readonly completedTrajectories: StoredTrajectory[] = [];
  private launchCount = 0;
  private isAnimating = false;
  private previousTimestamp = 0;
  private showTrajectory = true;
  private currentTrajectoryColor = 'royalblue';
  private currentXMax = 0;
  private currentYMax = 0;

  private readonly initialHeightInput: HTMLInputElement;
  private readonly initialVelocityInput: HTMLInputElement;
  private readonly launchAngleInput: HTMLInputElement;
  private readonly showTrajectoryCheckbox: HTMLInputElement;
  private readonly launchButton: HTMLButtonElement;

  /**
   * @desc Constructor for ProjectileController class, sets up event listeners and initializes the view.
   * @param model, an instance of ProjectileModel that contains the physics logic and state of the projectile
   * @param view, an instance of ProjectileView responsible for rendering the projectile and related information on the canvas
   */
  constructor(private readonly model: ProjectileModel, private readonly view: ProjectileView,) {
    this.initialHeightInput = document.getElementById('height-input') as HTMLInputElement;
    this.initialVelocityInput = document.getElementById('velocity-input') as HTMLInputElement;
    this.launchAngleInput = document.getElementById('angle-input') as HTMLInputElement;
    this.showTrajectoryCheckbox = document.getElementById('trajectory-checkbox') as HTMLInputElement;
    this.launchButton = document.getElementById('animate-button') as HTMLButtonElement;
    this.launchButton.addEventListener('click', () => this.handleLaunch());
    this.view.drawAxes(0);
  }

  /**
   * @desc Validates user input, sets model parameters, and starts the animation loop.
   */
  private handleLaunch(): void {
    if (this.isAnimating) return;
    const rawAngle = parseFloat(this.launchAngleInput.value);
    const velocity = parseFloat(this.initialVelocityInput.value);
    const params = {
      initialHeight: Math.max(0, parseFloat(this.initialHeightInput.value) || 0),
      initialVelocity: Math.max(0, isNaN(velocity) ? 0 : velocity),
      launchAngleDegrees: Math.max(0, Math.min(90, isNaN(rawAngle) ? 45 : rawAngle)),
    };
    this.showTrajectory = this.showTrajectoryCheckbox.checked;
    this.model.setParameters(params);
    this.expandScaleIfNeeded();
    this.currentTrajectoryColor = this.view.paletteColour(this.launchCount);
    this.launchCount++;
    this.view.clearInfoCanvas();
    this.isAnimating = true;
    this.previousTimestamp = 0;
    requestAnimationFrame(this.animationLoop);
  }

  /**
   * @desc Checks if the current model parameters exceed the existing scale and updates it if necessary.
   */
  private expandScaleIfNeeded(): void {
    const horizontalRange = this.model.computeRange();
    const maxHeight = this.model.computeMaxHeight();
    const initialHeight = this.model.getParameters().initialHeight;
    const newXMax = Math.max(this.currentXMax, horizontalRange);
    const newYMax = Math.max(this.currentYMax, maxHeight, initialHeight);
    if (newXMax !== this.currentXMax || newYMax !== this.currentYMax) {
      this.currentXMax = newXMax;
      this.currentYMax = newYMax;
      this.view.setScale(newXMax, newYMax);
    }
  }

  /**
   * @desc Advances the model, updates the view, and schedules the next frame until the projectile lands.
   * @param timestamp, provided by requestAnimationFrame, used to calculate deltaTime for consistent animation speed.
   */
  private readonly animationLoop = (timestamp: number): void => {
    if (!this.previousTimestamp) this.previousTimestamp = timestamp;
    const deltaTime = Math.min((timestamp - this.previousTimestamp) / 1000, 0.05);
    this.previousTimestamp = timestamp;

    this.model.advance(deltaTime);

    const currentParams = this.model.getParameters();
    this.view.clearMainCanvas();
    this.view.drawAxes(currentParams.initialHeight);
    this.view.drawStoredTrajectories(this.completedTrajectories);
    this.view.drawCurrentPath(this.model.getTrajectory(), this.currentTrajectoryColor, this.showTrajectory);
    this.view.drawCannon(currentParams.initialHeight, currentParams.launchAngleDegrees);

    if (this.model.isLanded()) {
      if (this.showTrajectory) {
        this.completedTrajectories.push({ points: [...this.model.getTrajectory()], color: this.currentTrajectoryColor });
      }
      const summary = this.model.getSummary();
      this.view.drawLaunchSummary(summary.flightTime, summary.horizontalRange, summary.maxHeight);
      this.isAnimating = false;
    } else {
      const position = this.model.currentPosition();
      this.view.drawProjectileBall(position.coordX, position.coordY);
      requestAnimationFrame(this.animationLoop);
    }
  };
}