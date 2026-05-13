/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 29 2026
 * @desc User-defined function parsed at runtime
 */

import { compile, EvalFunction } from 'mathjs';
import { MathFunction } from './mathFunction';

export class UserDefinedFunction implements MathFunction {
  private readonly compiledExpression: EvalFunction;
  readonly label: string;

  /**
   * @param expressionString A string representing a mathematical expression in terms of 'x'
   */
  constructor(expressionString: string) {
    this.label = `f(x) = ${expressionString}`;
    this.compiledExpression = compile(expressionString);
  }

  /**
   * @desc Evaluates the user-defined function at a given domain value. Returns NaN if evaluation fails.
   * @param domainValue The input value for which to evaluate the function
   * @returns {number} The result of evaluating the function at the given domain value
   */
  evaluate(domainValue: number): number {
    try {
      const result = this.compiledExpression.evaluate({ x: domainValue });
      return typeof result === 'number' ? result : NaN;
    } catch {
      return NaN;
    }
  }
}