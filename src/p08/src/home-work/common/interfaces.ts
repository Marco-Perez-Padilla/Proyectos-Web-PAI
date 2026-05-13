/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Shared data contracts (interfaces) used across all application modules
 */

/**
 * Label/value pair that represents a single bar in the histogram.
 */
export interface ChartData {
  readonly label: string;
  readonly value: number;
}

/**
 * Inner margins of the canvas (in pixels).
 */
export interface Margin {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

/**
 * Full configuration for the bar chart.
 * All fields are required; the Builder provides sensible defaults.
 */
export interface BarChartConfig {
  readonly title: string;
  readonly xAxisLabel: string;
  readonly yAxisLabel: string;
  readonly barColor: string;
  readonly gridColor: string;
  readonly axisColor: string;
  readonly textColor: string;
  readonly titleColor: string;
  readonly backgroundColor: string;
  readonly margin: Margin;
  readonly numGridLines: number;
}