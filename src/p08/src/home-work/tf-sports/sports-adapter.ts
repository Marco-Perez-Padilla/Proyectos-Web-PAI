/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Adapter that converts the ESRI GeoJSON format into ChartData for BarChart
 */

import type { CanchasDeportivas } from './tf-sports-interfaces';
import type { ChartData } from '../common/interfaces.js';

/**
 * Category map: each entry pairs a visible label with detection keywords.
 * Adding a new category only requires inserting an entry here (OCP).
 */
const CATEGORIES: ReadonlyArray<{
  readonly label: string;
  readonly keywords: ReadonlyArray<string>;
}> = [
  { label: 'Polideportivos',    keywords: ['POLIDEPORTIVO'] },
  { label: 'Campos',            keywords: ['CAMPO'] },
  { label: 'Canchas/Petanca',   keywords: ['CANCHA', 'PETANCA'] },
  { label: 'Áreas Dep.',        keywords: ['AREA DEPORTIVA'] },
  { label: 'Complejos Dep.',    keywords: ['COMPLEJO'] },
  { label: 'Pabellones',        keywords: ['PABELLON', 'PABELLÓN'] },
  { label: 'Centros Dep.',      keywords: ['CENTRO'] },
  { label: 'Piscinas',          keywords: ['PISCINA'] },
  { label: 'Estadios',          keywords: ['ESTADIO'] },
  { label: 'Terrenos/Terreros', keywords: ['TERRENO', 'TERRERO'] },
  { label: 'Pistas',            keywords: ['PISTAS'] },
];

const LABEL_OTHERS = 'Otros';

/**
 * Converts the sports facilities FeatureSet into data ready to render
 * in a bar chart.
 */
export class SportsDataAdapter {
  /**
   * @desc Transforms the sports facilities JSON into a sorted array of
   *       label/value pairs grouped by facility category.
   * @param data - Root object of the remote JSON.
   * @returns Array of data points sorted from highest to lowest value.
   */
  adapt(data: CanchasDeportivas): ChartData[] {
    const counts = new Map<string, number>();

    for (const feature of data.features) {
      const facilityName = feature.attributes.NOMBRE.toUpperCase();
      const category     = this.categorize(facilityName);
      counts.set(category, (counts.get(category) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((firstItem, secondItem) => secondItem.value - firstItem.value);
  }

  /**
   * @desc Classifies a facility name into a predefined category by checking
   *       whether the name contains any of the category's keywords.
   * @param facilityName - Uppercase name of the facility.
   * @returns The matching category label, or the fallback label if none matches.
   */
  private categorize(facilityName: string): string {
    for (const { label, keywords } of CATEGORIES) {
      if (keywords.some(keyword => facilityName.includes(keyword))) {
        return label;
      }
    }
    return LABEL_OTHERS;
  }
}