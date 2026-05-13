/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Entry point that orchestrates Facade, Adapter and Builder to render the life-expectancy bar chart
 */

import { DataFetcher }    from '../common/data-fetcher.js';
import { BarChartBuilder } from '../common/bar-chart-builder.js';
import { WHOAdapter }     from './life-expectancy-adapter.js';
import type { WorldBankResponse } from './life-expectancy-interfaces.js';

const COUNTRY_CODES = 'ESP;ARG;DEU;FRA;GBR;ITA;USA;JPN;CHN;BRA;MEX;RUS;CAN;AUS;NLD';
const API_URL = `https://api.worldbank.org/v2/country/${COUNTRY_CODES}/indicator/SP.DYN.LE00.IN?format=json&date=2022&per_page=20`;

/**
 * @desc Main async function.
 * @throws {Error} If the canvas element is not found in the DOM.
 * @throws {Error} If the remote data fetch fails.
 */
async function main(): Promise<void> {
  const canvas = document.getElementById('chart') as HTMLCanvasElement | null;
  if (canvas === null) {
    throw new Error('Canvas element with id "chart" was not found in the DOM.');
  }

  const fetcher   = new DataFetcher();
  const response  = await fetcher.fetch<WorldBankResponse>(API_URL);
  const records   = response[1];

  const adapter   = new WHOAdapter(records);
  const chartData = adapter.toChartData(15);

  new BarChartBuilder(canvas)
    .setTitle(adapter.getTitle())
    .setXAxisLabel('País')
    .setYAxisLabel('Años')
    .setBarColor('teal')
    .build()
    .draw(chartData);
}

main().catch((error) => console.error(error));