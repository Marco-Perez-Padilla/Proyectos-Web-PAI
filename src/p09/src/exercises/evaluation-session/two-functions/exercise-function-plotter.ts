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
import { SineFunction, TaylorSineFunction } from './implementedFunctions.js';

function initialise(): void {
  const button = document.getElementById('taylor-button') as HTMLButtonElement;
  const inputTaylor = document.getElementById('taylor-input') as HTMLInputElement;
  button.addEventListener('click', () => {
    try {
      const valueTaylor = Number(inputTaylor.value);
      const renderer = new FunctionRenderer('function-canvas', -10, 10, -10, 10, new TaylorSineFunction(valueTaylor), { backgroundColor: 'white' },);
      renderer.renderCoordMap();
      renderer.render();
      const renderer2 = new FunctionRenderer('function-canvas', -10, 10, -10, 10, new SineFunction(), { functionPlot: { curveColour: 'red' , curveLineWidth: 2}},);
      renderer2.render();
    } catch (error) {
      alert('Invalid function expression');
    }
  });
}

// window.addEventListener('DOMContentLoaded', initialise);

initialise();