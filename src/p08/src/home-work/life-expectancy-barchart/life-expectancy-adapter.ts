/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Adapter that converts World Bank life-expectancy records into ChartData for BarChart
 */

import type { WorldBankRecord } from './life-expectancy-interfaces.js';
import type { ChartData }       from '../common/interfaces.js';

/**
 * Map from ISO 3166-1 alpha-3 country codes to Spanish display names.
 */
const COUNTRY_NAMES: Record<string, string> = {
  ESP: 'España',    ARG: 'Argentina',    DEU: 'Alemania',
  FRA: 'Francia',   GBR: 'Reino Unido',  ITA: 'Italia',
  USA: 'EE.UU.',    JPN: 'Japón',        CHN: 'China',
  BRA: 'Brasil',    MEX: 'México',       RUS: 'Rusia',
  CAN: 'Canadá',    AUS: 'Australia',    NLD: 'Países Bajos',
};

/**
 * Converts World Bank life-expectancy records into chart-ready data.
 */
export class WHOAdapter {
  /**
   * @desc Creates a WHOAdapter with the given array of World Bank records.
   * @param records - Raw records returned by the World Bank API.
   */
  constructor(private readonly records: WorldBankRecord[]) {}

  /**
   * @desc Filters out records with null values or unknown country codes,
   *       sorts by value descending and returns the top N entries mapped
   *       to Spanish country names.
   * @param topN - Maximum number of countries to include (default: 15).
   * @returns Array of ChartData points sorted from highest to lowest value.
   */
  toChartData(topN: number = 15): ChartData[] {
    return this.records
      .filter(record => record.value !== null && COUNTRY_NAMES[record.countryiso3code])
      .sort((firstRecord, secondRecord) => secondRecord.value! - firstRecord.value!)
      .slice(0, topN)
      .map(record => ({
        label: COUNTRY_NAMES[record.countryiso3code],
        value: record.value!,
      }));
  }

  /**
   * @desc Returns the descriptive title for this chart.
   * @returns The chart title string.
   */
  getTitle(): string {
    return 'Esperanza de vida al nacer por país (Banco Mundial 2022)';
  }
}