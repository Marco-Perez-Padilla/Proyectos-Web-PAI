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
 * @desc Approximation to sin(x) using Taylor Series
 * @see {@link https://es.wikipedia.org/wiki/Serie_de_Taylor}
 */
export class TaylorSineFunction implements MathFunction {
  readonly label = 'T(x) = sin(x)';

  constructor (private readonly degree: number) {}
  
  evaluate(domainValue: number): number {
    let result = 0;
    for (let factor = 0; (2 * factor + 1) <= this.degree; factor++) {
      const exponent = 2 * factor + 1;
      const sign = (factor % 2 === 0) ? 1 : -1;
      result += sign * Math.pow(domainValue, exponent) / this.factorial(exponent);
    }
    return result;
  }

  /**
   * @desc Computes the factorial of a number
   * @param numb : number whose factorial will be computed
   * @returns {number} factorial of the number
   */
  private factorial(numb: number): number {
    if (numb === 0) return 1;
    return (numb * this.factorial(numb - 1));
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
 