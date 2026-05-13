/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 13 2026
 * @desc Test suite for geometric shapes (Square, Rectangle, Triangle, Circle)
 */

import { describe, it, expect, jest } from '@jest/globals';
import { Shape, Square, Rectangle, Triangle, Circle, Polygon } from '../src/shapes';

/**
 * @desc Creates a mock of CanvasRenderingContext2D for testing draw() calls
 * @returns Mock context object typed as CanvasRenderingContext2D
 */
function createMockContext(): CanvasRenderingContext2D {
  return {
    fillStyle: '',
    fillRect:  jest.fn(),
    beginPath: jest.fn(),
    moveTo:    jest.fn(),
    lineTo:    jest.fn(),
    closePath: jest.fn(),
    fill:      jest.fn(),
    arc:       jest.fn(),
  } as unknown as CanvasRenderingContext2D;
}

describe('Square', () => {
  it('should be an instance of Shape', () => {
    const square = new Square('red', 10, 20, 5);
    expect(square).toBeInstanceOf(Shape);
  });

  it('should have a draw method', () => {
    const square = new Square('white', 0, 0, 1);
    expect(typeof square.draw).toBe('function');
  });

  it('should apply colour when drawing', () => {
    const context = createMockContext();
    new Square('red', 0, 0, 10).draw(context);
    expect(context.fillStyle).toBe('red');
  });

  it('should draw at the correct center coordinates', () => {
    const context = createMockContext();
    new Square('red', 100, 200, 40).draw(context);
    expect(context.fillRect).toHaveBeenCalledWith(80, 180, 40, 40);
  });

  it('should compute area correctly for positive side', () => {
    expect(new Square('blue', 0, 0, 4).getArea()).toBe(16);
  });

  it('should compute area correctly for zero side', () => {
    expect(new Square('green', 0, 0, 0).getArea()).toBe(0);
  });

  it('should compute area correctly for negative side', () => {
    expect(new Square('yellow', 0, 0, -3).getArea()).toBe(9);
  });

  it('should compute area correctly for decimal side', () => {
    expect(new Square('purple', 0, 0, 2.5).getArea()).toBe(6.25);
  });
});

describe('Rectangle', () => {
  it('should be an instance of Shape', () => {
    expect(new Rectangle('black', 0, 0, 1, 1)).toBeInstanceOf(Shape);
  });

  it('should have a draw method', () => {
    expect(typeof new Rectangle('white', 0, 0, 1, 1).draw).toBe('function');
  });

  it('should apply colour when drawing', () => {
    const context = createMockContext();
    new Rectangle('blue', 0, 0, 10, 20).draw(context);
    expect(context.fillStyle).toBe('blue');
  });

  it('should draw at the correct center coordinates', () => {
    const context = createMockContext();
    new Rectangle('red', 100, 200, 40, 60).draw(context);
    expect(context.fillRect).toHaveBeenCalledWith(80, 170, 40, 60);
  });

  it('should compute area correctly for positive dimensions', () => {
    expect(new Rectangle('blue', 0, 0, 4, 6).getArea()).toBe(24);
  });

  it('should compute area correctly when width is zero', () => {
    expect(new Rectangle('green', 0, 0, 0, 10).getArea()).toBe(0);
  });

  it('should compute area correctly when height is zero', () => {
    expect(new Rectangle('yellow', 0, 0, 10, 0).getArea()).toBe(0);
  });

  it('should compute area correctly for negative dimensions', () => {
    expect(new Rectangle('purple', 0, 0, -4, 5).getArea()).toBe(-20);
  });

  it('should compute area correctly for decimal dimensions', () => {
    expect(new Rectangle('orange', 0, 0, 2.5, 3.2).getArea()).toBeCloseTo(8.0, 5);
  });
});

describe('Triangle (equilateral)', () => {
  it('should be an instance of Shape', () => {
    expect(new Triangle('black', 0, 0, 1)).toBeInstanceOf(Shape);
  });

  it('should have a draw method', () => {
    expect(typeof new Triangle('white', 0, 0, 1).draw).toBe('function');
  });

  it('should apply colour when drawing', () => {
    const context = createMockContext();
    new Triangle('green', 0, 0, 10).draw(context);
    expect(context.fillStyle).toBe('green');
  });

  it('should call beginPath and closePath when drawing', () => {
    const context = createMockContext();
    new Triangle('red', 0, 0, 10).draw(context);
    expect(context.beginPath).toHaveBeenCalled();
    expect(context.closePath).toHaveBeenCalled();
  });

  it('should compute area correctly for positive side', () => {
    const expected = (Math.sqrt(3) / 4) * 16;
    expect(new Triangle('blue', 0, 0, 4).getArea()).toBeCloseTo(expected, 5);
  });

  it('should compute area correctly for zero side', () => {
    expect(new Triangle('green', 0, 0, 0).getArea()).toBe(0);
  });

  it('should compute area correctly for negative side', () => {
    const expected = (Math.sqrt(3) / 4) * 9;
    expect(new Triangle('yellow', 0, 0, -3).getArea()).toBeCloseTo(expected, 5);
  });

  it('should compute area correctly for decimal side', () => {
    const expected = (Math.sqrt(3) / 4) * 6.25;
    expect(new Triangle('purple', 0, 0, 2.5).getArea()).toBeCloseTo(expected, 5);
  });
});

describe('Circle', () => {
  it('should be an instance of Shape', () => {
    expect(new Circle('black', 0, 0, 1)).toBeInstanceOf(Shape);
  });

  it('should have a draw method', () => {
    expect(typeof new Circle('white', 0, 0, 1).draw).toBe('function');
  });

  it('should apply colour when drawing', () => {
    const context = createMockContext();
    new Circle('magenta', 0, 0, 10).draw(context);
    expect(context.fillStyle).toBe('magenta');
  });

  it('should draw arc at the correct center and radius', () => {
    const context = createMockContext();
    new Circle('red', 50, 75, 20).draw(context);
    expect(context.arc).toHaveBeenCalledWith(50, 75, 20, 0, 2 * Math.PI);
  });

  it('should compute area correctly for positive radius', () => {
    expect(new Circle('blue', 0, 0, 4).getArea()).toBeCloseTo(Math.PI * 16, 5);
  });

  it('should compute area correctly for zero radius', () => {
    expect(new Circle('green', 0, 0, 0).getArea()).toBe(0);
  });

  it('should compute area correctly for negative radius', () => {
    expect(new Circle('yellow', 0, 0, -3).getArea()).toBeCloseTo(Math.PI * 9, 5);
  });

  it('should compute area correctly for decimal radius', () => {
    expect(new Circle('purple', 0, 0, 2.5).getArea()).toBeCloseTo(Math.PI * 6.25, 5);
  });
});

describe('Polygon (regular)', () => {
  it('should be an instance of Shape', () => {
    expect(new Polygon('black', 0, 0, 6, 10)).toBeInstanceOf(Shape);
  });

  it('should have a draw method', () => {
    expect(typeof new Polygon('white', 0, 0, 6, 10).draw).toBe('function');
  });

  it('should apply colour when drawing', () => {
    const context = createMockContext();
    new Polygon('orange', 0, 0, 6, 10).draw(context);
    expect(context.fillStyle).toBe('orange');
  });

  it('should call beginPath and closePath when drawing', () => {
    const context = createMockContext();
    new Polygon('red', 0, 0, 5, 20).draw(context);
    expect(context.beginPath).toHaveBeenCalled();
    expect(context.closePath).toHaveBeenCalled();
  });

  it('should compute area correctly for a hexagon', () => {
    const expected = (6 * 100 * Math.sin((2 * Math.PI) / 6)) / 2;
    expect(new Polygon('blue', 0, 0, 6, 10).getArea()).toBeCloseTo(expected, 5);
  });

  it('should compute area correctly for a pentagon', () => {
    const expected = (5 * 400 * Math.sin((2 * Math.PI) / 5)) / 2;
    expect(new Polygon('green', 0, 0, 5, 20).getArea()).toBeCloseTo(expected, 5);
  });
});