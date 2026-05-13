/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Builder pattern that configures and constructs a BarChart instance
 */

import { BarChart }            from './bar-chart.js';
import type { BarChartConfig, Margin } from './interfaces.js';

/**
 * Default color palette inspired by OECD chart conventions.
 */
const DEFAULTS: BarChartConfig = {
  title:           'Bar chart',
  xAxisLabel:      'Category',
  yAxisLabel:      'Value',
  barColor:        'royalblue',
  gridColor:       'lightgray',
  axisColor:       'slategray',
  textColor:       'darkslategray',
  titleColor:      'midnightblue',
  backgroundColor: 'whitesmoke',
  margin:          { top: 80, right: 50, bottom: 160, left: 90 },
  numGridLines:    7,
};

/**
 * Fluent builder for BarChart instances.
 */
export class BarChartBuilder {
  private config: BarChartConfig;

  /**
   * @desc Creates a BarChartBuilder bound to the given canvas element
   * @param canvas - The HTML canvas element where the chart will be rendered.
   */
  constructor(private readonly canvas: HTMLCanvasElement) {
    this.config = { ...DEFAULTS, margin: { ...DEFAULTS.margin } };
  }

  /**
   * @desc Sets the chart title displayed at the top of the canvas.
   * @param title - Title text.
   * @returns The builder instance for method chaining.
   */
  setTitle(title: string): this {
    this.config = { ...this.config, title };
    return this;
  }

  /**
   * @desc Sets the label displayed below the X axis.
   * @param label - X axis label text.
   * @returns The builder instance for method chaining.
   */
  setXAxisLabel(label: string): this {
    this.config = { ...this.config, xAxisLabel: label };
    return this;
  }

  /**
   * @desc Sets the label displayed beside the Y axis.
   * @param label - Y axis label text.
   * @returns The builder instance for method chaining.
   */
  setYAxisLabel(label: string): this {
    this.config = { ...this.config, yAxisLabel: label };
    return this;
  }

  /**
   * @desc Sets the fill color for all bars.
   * @param color - CSS color string (hex, rgb, named…).
   * @returns The builder instance for method chaining.
   */
  setBarColor(color: string): this {
    this.config = { ...this.config, barColor: color };
    return this;
  }

  /**
   * @desc Sets the canvas background color.
   * @param color - CSS color string.
   * @returns The builder instance for method chaining.
   */
  setBackgroundColor(color: string): this {
    this.config = { ...this.config, backgroundColor: color };
    return this;
  }

  /**
   * @desc Sets the color of the horizontal grid lines.
   * @param color - CSS color string.
   * @returns The builder instance for method chaining.
   */
  setGridColor(color: string): this {
    this.config = { ...this.config, gridColor: color };
    return this;
  }

  /**
   * @desc Sets the color used for axis labels and tick values.
   * @param color - CSS color string.
   * @returns The builder instance for method chaining.
   */
  setTextColor(color: string): this {
    this.config = { ...this.config, textColor: color };
    return this;
  }

  /**
   * @desc Sets the color of the chart title text.
   * @param color - CSS color string.
   * @returns The builder instance for method chaining.
   */
  setTitleColor(color: string): this {
    this.config = { ...this.config, titleColor: color };
    return this;
  }

  /**
   * @desc Sets the inner margins of the plot area.
   * @param margin - Object with top, right, bottom and left values in pixels.
   * @returns The builder instance for method chaining.
   */
  setMargin(margin: Margin): this {
    this.config = { ...this.config, margin: { ...margin } };
    return this;
  }

  /**
   * @desc Sets the number of horizontal grid lines drawn across the plot area.
   * @param numLines - Number of grid lines (default: 7).
   * @returns The builder instance for method chaining.
   */
  setNumGridLines(numLines: number): this {
    this.config = { ...this.config, numGridLines: numLines };
    return this;
  }

  /**
   * @desc Constructs and returns the configured BarChart instance.
   * @returns A BarChart instance ready to call draw(data) on.
   */
  build(): BarChart {
    return new BarChart(this.canvas, this.config);
  }
}