/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 20 2026
 * @desc Data contracts for the World Bank life-expectancy API response
 */

export type WorldBankResponse = [WorldBankMeta, WorldBankRecord[]];

/**
 * Pagination metadata included in every World Bank API response.
 */
export interface WorldBankMeta {
  readonly page: number;
  readonly pages: number;
  readonly per_page: number;
  readonly total: number;
}

/**
 * A single life-expectancy data record for one country and one year.
 */
export interface WorldBankRecord {
  readonly country: {
    readonly id: string;    
    readonly value: string;  
  };
  readonly countryiso3code: string;  
  readonly date: string;            
  readonly value: number | null;    
}