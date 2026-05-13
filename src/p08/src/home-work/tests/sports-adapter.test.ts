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

import { SportsDataAdapter } from '../tf-sports/sports-adapter';
import type { CanchasDeportivas } from '../tf-sports/tf-sports-interfaces';

/**
 * @desc Factory that builds a minimal CanchasDeportivas object for testing,
 *       populating only the fields used by SportsDataAdapter.
 * @param names - Facility names to include as features.
 * @returns A CanchasDeportivas object with one feature per name provided.
 */
function makeData(...names: string[]): CanchasDeportivas {
  return {
    displayFieldName: '',
    features: names.map((nombre, idx) => ({
      attributes: {
        FID: idx,
        NOMBRE: nombre,
        TIPO: 'Instalaciones deportivas',
        GEOCODIGO: `DEP_00${idx}`,
        UTM_X: 0,
        UTM_Y: 0,
        GRAD_X: 0,
        GRAD_Y: 0,
        NOTAS: '',
      },
      geometry: { x: 0, y: 0 },
    })),
  };
}

describe('SportsDataAdapter', () => {
  let adapter: SportsDataAdapter;

  beforeEach(() => {
    adapter = new SportsDataAdapter();
  });

  it('clasifica correctamente un POLIDEPORTIVO', () => {
    const result = adapter.adapt(makeData('POLIDEPORTIVO VISTABELLA'));
    expect(result).toContainEqual({ label: 'Polideportivos', value: 1 });
  });

  it('clasifica correctamente un CAMPO DE FUTBOL', () => {
    const result = adapter.adapt(makeData('CAMPO DE FUTBOL SAN ANDRES'));
    expect(result).toContainEqual({ label: 'Campos', value: 1 });
  });

  it('clasifica correctamente una CANCHA con PETANCA', () => {
    const result = adapter.adapt(makeData('CANCHA DE BOLAS Y PETANCA DE VISTABELLA'));
    expect(result).toContainEqual({ label: 'Canchas/Petanca', value: 1 });
  });

  it('clasifica correctamente un PABELLON', () => {
    const result = adapter.adapt(makeData('PABELLON MUNICIPAL LA SALUD'));
    expect(result).toContainEqual({ label: 'Pabellones', value: 1 });
  });

  it('clasifica correctamente una PISCINA', () => {
    const result = adapter.adapt(makeData('PISCINA MUNICIPAL ACIDALIO LORENZO'));
    expect(result).toContainEqual({ label: 'Piscinas', value: 1 });
  });

  it('acumula correctamente instalaciones de la misma categoría', () => {
    const result = adapter.adapt(
      makeData(
        'POLIDEPORTIVO A',
        'POLIDEPORTIVO B',
        'POLIDEPORTIVO C',
        'CAMPO DE FUTBOL X'
      )
    );
    const polideportivos = result.find(d => d.label === 'Polideportivos');
    const campos = result.find(d => d.label === 'Campos');
    expect(polideportivos?.value).toBe(3);
    expect(campos?.value).toBe(1);
  });

  it('ordena los resultados de mayor a menor valor', () => {
    const result = adapter.adapt(
      makeData(
        'CAMPO DE FUTBOL A',
        'CAMPO DE FUTBOL B',
        'PISCINA MUNICIPAL X'
      )
    );
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].value).toBeGreaterThanOrEqual(result[i + 1].value);
    }
  });

  it('devuelve array vacío para datos sin features', () => {
    const result = adapter.adapt(makeData());
    expect(result).toHaveLength(0);
  });

  it('clasifica en "Otros" una instalación desconocida', () => {
    const result = adapter.adapt(makeData('INSTALACION MISTERIOSA XYZ'));
    expect(result).toContainEqual({ label: 'Otros', value: 1 });
  });

  it('un COMPLEJO POLIDEPORTIVO se clasifica como Polideportivos', () => {
    const result = adapter.adapt(makeData('COMPLEJO POLIDEPORTIVO SAN JOAQUIN'));
    expect(result).toContainEqual({ label: 'Polideportivos', value: 1 });
  });
});