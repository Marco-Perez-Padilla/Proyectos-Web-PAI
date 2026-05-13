/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Projectile physics model — stores state and computes trajectory.
 */

/**
 * @desc Interface for the parameters of a projectile launch, including initial height, initial velocity, and launch angle in degrees.
 */
export interface LaunchParameters {
  initialHeight: number;
  initialVelocity: number;
  launchAngleDegrees: number;
}

/**
 * @desc Interface for the summary of a projectile launch, including flight time, horizontal range, and maximum height.
 */
export interface LaunchSummary {
  flightTime: number;
  horizontalRange: number;
  maxHeight: number;
}

export class ProjectileModel {
  private readonly GRAVITY_ACCELERATION = 9.8;
  private params: LaunchParameters = { initialHeight: 0, initialVelocity: 50, launchAngleDegrees: 45 };
  private elapsedTime = 0;
  private hasLanded = false;
  private readonly trajectory: { coordX: number; coordY: number }[] = [];

  /**
   * @desc Sets the parameters for the projectile launch and resets the state of the model to prepare for a new simulation.
   * @param params, an object containing the initial height, initial velocity, and launch angle in degrees for the projectile launch
   */
  setParameters(params: LaunchParameters): void {
    this.params = { ...params };
    this.elapsedTime = 0;
    this.hasLanded = false;
    this.trajectory.length = 0;
  }

  /**
   * @desc Advances the simulation by a given time step (deltaTime), updating the elapsed time and computing the new position of the projectile.
   * If the projectile has landed (i.e., its y coordinate is less than or equal to 0), it marks it as landed and computes the final landing position.
   * Otherwise, it adds the current position to the trajectory array for later rendering.
   * @param deltaTime, the time step in seconds by which to advance the simulation
   */
  advance(deltaTime: number): void {
    if (this.hasLanded) return;
    this.elapsedTime += deltaTime;
    const position = this.positionAt(this.elapsedTime);
    if (position.coordY <= 0 && this.elapsedTime !== 0) {
      this.hasLanded = true;
      this.elapsedTime = this.computeFlightTime();
      const landingPosition = this.positionAt(this.elapsedTime);
      this.trajectory.push({ coordX: landingPosition.coordX, coordY: 0 });
    } else {
      this.trajectory.push({ coordX: position.coordX, coordY: position.coordY });
    }
  }

  /**
   * @desc Returns the current position of the projectile as an object with coordX and coordY properties. The y coordinate is clamped to a minimum of 0 to represent the ground level.
   * @returns { coordX: number; coordY: number } an object containing the current x and y coordinates of the projectile in mathematical terms (not pixel coordinates)
   */
  currentPosition(): { coordX: number; coordY: number } {
    const position = this.positionAt(this.elapsedTime);
    return { coordX: position.coordX, coordY: Math.max(0, position.coordY) };
  }

  /**
   * @desc Returns true if the projectile has landed (i.e., its y coordinate is at or below ground level), otherwise returns false.
   * @returns {boolean} true if the projectile has landed, false otherwise
   */
  isLanded(): boolean { return this.hasLanded; }

  /**
   * @desc Returns the trajectory of the projectile as an array of points, where each point is an object with coordX and coordY properties representing the position of the projectile at a given time step.
   * @returns { coordX: number; coordY: number }[] an array of objects representing the trajectory of the projectile, with each object containing the x and y coordinates in mathematical terms
   */
  getTrajectory(): { coordX: number; coordY: number }[] { return this.trajectory; }

  /**
   * @desc Computes the total flight time of the projectile using the kinematic equations of motion, taking into account the initial velocity, launch angle, initial height, and gravitational acceleration. It solves for the time when the projectile lands (y coordinate becomes 0) and returns that time as the flight time.
   * @returns {number} the total flight time of the projectile in seconds
   */
  computeFlightTime(): number {
    const verticalVelocity = this.params.initialVelocity * Math.sin(this.launchAngleRad());
    const discriminant = verticalVelocity * verticalVelocity + 2 * this.GRAVITY_ACCELERATION * this.params.initialHeight;
    return (verticalVelocity + Math.sqrt(discriminant)) / this.GRAVITY_ACCELERATION;
  }

  /**
   * @desc Computes the maximum height reached by the projectile using the kinematic equations of motion. It calculates the vertical velocity at launch and uses it to determine how high the projectile will go before it starts descending, taking into account the initial height and gravitational acceleration.
   * @returns {number} the maximum height reached by the projectile in meters
   */
  computeMaxHeight(): number {
    const verticalVelocity = this.params.initialVelocity * Math.sin(this.launchAngleRad());
    return this.params.initialHeight + (verticalVelocity * verticalVelocity) / (2 * this.GRAVITY_ACCELERATION);
  }

  /**
   * @desc Computes the horizontal range of the projectile, which is the total horizontal distance traveled from launch to landing. It uses the initial velocity, launch angle, and flight time to calculate how far the projectile will go horizontally before it lands.
   * @returns {number} the horizontal range of the projectile in meters
   */
  computeRange(): number {
    return this.params.initialVelocity * Math.cos(this.launchAngleRad()) * this.computeFlightTime();
  }

  /**
   * @desc Returns a summary of the projectile launch, including flight time, horizontal range, and maximum height. This method is typically called after the projectile has landed to provide a concise summary of the launch results.
   * @returns {LaunchSummary} an object containing the flight time, horizontal range, and maximum height of the projectile launch
   */
  getSummary(): LaunchSummary {
    return {
      flightTime: this.computeFlightTime(),
      horizontalRange: this.computeRange(),
      maxHeight: this.computeMaxHeight(),
    };
  }

  /**
   * @desc Getter for the current launch parameters, returns a copy of the parameters object to prevent external mutation of the internal state.
   * @returns {LaunchParameters} a copy of the current launch parameters (initial height, initial velocity, launch angle in degrees)
   */
  getParameters(): LaunchParameters { return { ...this.params }; }

  /**
   * @desc Computes the position of the projectile at a given time using the kinematic equations of motion. It calculates the horizontal and vertical positions based on the initial velocity, launch angle, initial height, gravitational acceleration, and elapsed time.
   * @param time, the time in seconds at which to compute the position of the projectile
   * @returns { coordX: number; coordY: number } an object containing the x and y coordinates of the projectile at the specified time in mathematical terms (not pixel coordinates)
   */
  private positionAt(time: number): { coordX: number; coordY: number } {
    const angleRad = this.launchAngleRad();
    const horizontalVelocity = this.params.initialVelocity * Math.cos(angleRad);
    const verticalVelocity = this.params.initialVelocity * Math.sin(angleRad);
    return {
      coordX: horizontalVelocity * time,
      coordY: this.params.initialHeight + verticalVelocity * time - 0.5 * this.GRAVITY_ACCELERATION * time * time,
    };
  }

  /**
   * @desc Converts the launch angle from degrees to radians, which is necessary for the trigonometric calculations in the position and flight time computations.
   * @returns {number} the launch angle in radians
   */
  private launchAngleRad(): number {
    return (this.params.launchAngleDegrees * Math.PI) / 180;
  }
}