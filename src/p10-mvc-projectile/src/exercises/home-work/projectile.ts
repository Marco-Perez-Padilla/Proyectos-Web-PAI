/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Apr 11 2026
 * @desc Application entry point — Projectile Animation.
 */

import { ProjectileModel } from './projectile-model.js';
import { ProjectileView } from './projectile-view.js';
import { ProjectileController } from './projectile-controller.js';

function main(): void {
  const HEADER_HEIGHT_PX = 42;
  const INFO_PANEL_HEIGHT_PX = 60;
  const CONTROLS_PANEL_HEIGHT_PX = 62;
  const FOOTER_HEIGHT_PX = 32;

  const mainCanvas = document.getElementById('canvas-p1') as HTMLCanvasElement;
  const infoCanvas = document.getElementById('canvas-p2') as HTMLCanvasElement;

  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight - HEADER_HEIGHT_PX - INFO_PANEL_HEIGHT_PX - CONTROLS_PANEL_HEIGHT_PX - FOOTER_HEIGHT_PX;
  infoCanvas.width = window.innerWidth;
  infoCanvas.height = INFO_PANEL_HEIGHT_PX;

  const model = new ProjectileModel();
  const view = new ProjectileView('canvas-p1', 'canvas-p2');
  new ProjectileController(model, view);
}

main();