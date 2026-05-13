/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc Concrete implementations of mathFunction — Strategy pattern.
 * Each class encapsulates a single mathematical function.
 */

import { MathFunction } from './mathFunction.js';
 
/**
 * @desc f(x) = sin(x)
 */
export class SineFunction implements MathFunction {
  readonly label = 'f(x) = sin(x)';
 
  evaluate(domainValue: number): number {
    return Math.sin(domainValue);
  }
}
 
/**
 * @desc f(x) = cos(x)
 */
export class CosineFunction implements MathFunction {
  readonly label = 'f(x) = cos(x)';
 
  evaluate(domainValue: number): number {
    return Math.cos(domainValue);
  }
}
 
/**
 * @desc f(x) = x²
 */
export class QuadraticFunction implements MathFunction {
  readonly label = 'f(x) = x²';
 
  evaluate(domainValue: number): number {
    return domainValue * domainValue;
  }
}
 
/**
 * @desc f(x) = eˣ
 */
export class ExponentialFunction implements MathFunction {
  readonly label = 'f(x) = eˣ';
 
  evaluate(domainValue: number): number {
    return Math.exp(domainValue);
  }
}
 
/**
 * @desc f(x) = √x  (returns NaN for negative valuess)
 */
export class SquareRootFunction implements MathFunction {
  readonly label = 'f(x) = √x';
 
  evaluate(domainValue: number): number {
    if (domainValue < 0) return NaN;
    return Math.sqrt(domainValue);
  }
}
 
/**
 * @desc f(x) = ln(x)  (returns NaN for non-positive values)
 */
export class NaturalLogFunction implements MathFunction {
  readonly label = 'f(x) = ln(x)';
 
  evaluate(domainValue: number): number {
    if (domainValue <= 0) return NaN;
    return Math.log(domainValue);
  }
}
 