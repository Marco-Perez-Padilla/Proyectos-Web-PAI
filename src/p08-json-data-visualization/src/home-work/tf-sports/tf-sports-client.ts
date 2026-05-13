/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Entry point that orchestrates Facade, Adapter and Builder to render the sports bar chart
 */

import { DataFetcher }       from '../common/data-fetcher.js';
import { SportsDataAdapter } from './sports-adapter.js';
import { BarChartBuilder }   from '../common/bar-chart-builder.js';
import type { CanchasDeportivas } from './tf-sports-interfaces.js';

/**
 * @desc Main async function
 * @throws {Error} If the canvas element is not found in the DOM.
 * @throws {Error} If the remote data fetch fails.
 */
async function main(): Promise<void> {
  const canvas = document.getElementById('chart') as HTMLCanvasElement | null;
  if (canvas === null) {
    throw new Error('Canvas element with id "chart" was not found in the DOM.');
  }
  const fetcher   = new DataFetcher();
  const rawData   = await fetcher.fetch<CanchasDeportivas>('/data');
  const adapter   = new SportsDataAdapter();
  const chartData = adapter.adapt(rawData);
  new BarChartBuilder(canvas)
    .setTitle('Instalaciones Deportivas en Santa Cruz de Tenerife')
    .setXAxisLabel('Tipo de Instalación')
    .setYAxisLabel('Número de Instalaciones')
    .setBarColor('royalblue')
    .setMargin({ top: 80, right: 50, bottom: 160, left: 90 })
    .setNumGridLines(7)
    .build()
    .draw(chartData);
}

main().catch((error) => console.error(error));