/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Test suite for life expectation adapter
 */

import { WHOAdapter } from '../life-expectancy-barchart/life-expectancy-adapter';
import type { WorldBankRecord } from '../life-expectancy-barchart/life-expectancy-interfaces';

/**
 * @desc Factory that builds an array of minimal WorldBankRecord objects for testing,
 *       populating only the fields used by WHOAdapter.
 * @param entries - Objects containing a country ISO3 code and a nullable life-expectancy value.
 * @returns An array of WorldBankRecord objects with one entry per input provided.
 */
function makeRecords(...entries: Array<{ id: string; value: number | null }>): WorldBankRecord[] {
  return entries.map(({ id, value }) => ({
    country: { id: id.slice(0, 2).toLowerCase(), value: id },
    countryiso3code: id,   // ← añadir este campo
    date: '2022',
    value,
  }));
}

describe('WHOAdapter', () => {
  it('devuelve el país con su nombre en español', () => {
    const adapter = new WHOAdapter(makeRecords({ id: 'ESP', value: 83.2 }));
    expect(adapter.toChartData()).toContainEqual({ label: 'España', value: 83.2 });
  });

  it('filtra países cuyo value es null', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: 83.2 },
      { id: 'FRA', value: null }
    ));
    const result = adapter.toChartData();
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('España');
  });

  it('filtra países que no están en COUNTRY_NAMES', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: 83.2 },
      { id: 'XYZ', value: 99.0 }
    ));
    const result = adapter.toChartData();
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('España');
  });

  it('ordena los resultados de mayor a menor valor', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'MEX', value: 75.1 },
      { id: 'JPN', value: 84.3 },
      { id: 'BRA', value: 75.9 }
    ));
    const result = adapter.toChartData();
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].value).toBeGreaterThanOrEqual(result[i + 1].value);
    }
  });

  it('respeta el límite topN', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: 83.2 },
      { id: 'JPN', value: 84.3 },
      { id: 'FRA', value: 82.5 },
      { id: 'DEU', value: 81.1 },
      { id: 'ITA', value: 83.0 },
    ));
    expect(adapter.toChartData(3)).toHaveLength(3);
  });

  it('devuelve array vacío si no hay registros', () => {
    const adapter = new WHOAdapter([]);
    expect(adapter.toChartData()).toHaveLength(0);
  });

  it('devuelve array vacío si todos los valores son null', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: null },
      { id: 'FRA', value: null }
    ));
    expect(adapter.toChartData()).toHaveLength(0);
  });

  it('el primer elemento es el país con mayor esperanza de vida', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: 83.2 },
      { id: 'JPN', value: 84.3 },
      { id: 'MEX', value: 75.1 }
    ));
    expect(adapter.toChartData()[0]).toEqual({ label: 'Japón', value: 84.3 });
  });

  it('getTitle devuelve el título correcto', () => {
    const adapter = new WHOAdapter([]);
    expect(adapter.getTitle()).toBe('Esperanza de vida al nacer por país (Banco Mundial 2022)');
  });

  it('topN por defecto es 15', () => {
    const adapter = new WHOAdapter(makeRecords(
      { id: 'ESP', value: 83.2 }, { id: 'ARG', value: 76.4 },
      { id: 'DEU', value: 81.1 }, { id: 'FRA', value: 82.5 },
      { id: 'GBR', value: 81.0 }, { id: 'ITA', value: 83.0 },
      { id: 'USA', value: 77.5 }, { id: 'JPN', value: 84.3 },
      { id: 'CHN', value: 78.2 }, { id: 'BRA', value: 75.9 },
      { id: 'MEX', value: 75.1 }, { id: 'RUS', value: 73.4 },
      { id: 'CAN', value: 82.3 }, { id: 'AUS', value: 83.5 },
      { id: 'NLD', value: 82.1 },
    ));
    expect(adapter.toChartData()).toHaveLength(15);
  });
});