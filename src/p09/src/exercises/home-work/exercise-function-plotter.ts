/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Application entry point for Exercise 1 — Function Plotter.
 * Simple version: only one pre-defined function.
 */

import { FunctionRenderer } from './functionRenderer.js';
import { SineFunction } from './implementedFunctions.js';
import { UserDefinedFunction } from './userDefinedFunction.js';

function initialise(): void {
  const canvasId = 'function-canvas';
  const renderer = new FunctionRenderer(canvasId, -10, 10, -10, 10, new SineFunction(), { backgroundColor: 'white' },);
  renderer.render();

  const input = document.getElementById('function-input') as HTMLInputElement;
  const button = document.getElementById('plot-button') as HTMLButtonElement;
  button.addEventListener('click', () => {
    try {
      const expression = input.value;
      const newFunction = new UserDefinedFunction(expression);
      renderer.setMathFunction(newFunction);
      renderer.render();
    } catch (error) {
      alert('Invalid function expression');
    }
  });

  window.addEventListener('resize', () => renderer.render());
}

window.addEventListener('DOMContentLoaded', initialise);