/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 21 2026
 * @desc Domain interfaces for the Santa Cruz de Tenerife sports facilities dataset
 */

/**
 * Attributes of a sports facility as returned by the
 * Santa Cruz de Tenerife open-data JSON endpoint.
 */
export interface FeatureAttributes {
  readonly FID: number;
  readonly NOMBRE: string;
  readonly TIPO: string;
  readonly GEOCODIGO: string;
  readonly UTM_X: number;
  readonly UTM_Y: number;
  readonly GRAD_X: number;
  readonly GRAD_Y: number;
  readonly NOTAS: string;
}

/**
 * Geo-referenced feature with attributes and point geometry.
 */
export interface Feature {
  readonly attributes: FeatureAttributes;
  readonly geometry: {
    readonly x: number;
    readonly y: number;
  };
}

/**
 * Root structure of the sports facilities JSON file (ESRI FeatureSet format).
 */
export interface CanchasDeportivas {
  readonly displayFieldName: string;
  readonly features: readonly Feature[];
}