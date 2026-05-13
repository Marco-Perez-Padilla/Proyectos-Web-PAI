/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 23 2026
 * @desc Trabajo de clase datos AEMET
 */

/**
 * Represents the data of a station
 */
export interface EstacionDatos {
  readonly latitud: string;
  readonly provincia: string;
  readonly altitud: string;
  readonly indicativo: string;
  readonly nombre: string;
  readonly indsinop: string | null;
  readonly longitud: string;   
}

/** 
 * Representation of the data to be represented 
*/
interface PrintData {
  readonly label: string;
  readonly value: number;
  readonly province: string;
}

/**
 * Converts World Bank life-expectancy records into chart-ready data.
 */
export class WeatherStations {
  /**
   * @desc Creates a WeatherStations with the given array of World Bank records.
   * @param records - Raw records returned by the World Bank API.
   */
  constructor(private readonly records: EstacionDatos[]) {}

  /**
   * @desc Sorts stations depending on its altitude and returns the top number specified
   * @param topStations - Maximum number of stations
   * @returns Array of PrintData points sorted from highest to lowest value.
   */
  toData(topStations: number = 10): PrintData[] {
    return this.records
      .sort((firstRecord, secondRecord) => Number(secondRecord.altitud!) - Number(firstRecord.altitud!))
      .slice(0, topStations)
      .map(record => ({
        label: record.nombre,
        value: Number(record.altitud!),
        province: record.provincia
      }));
  }

  /**
   * @desc Returns the descriptive title for this chart.
   * @returns The chart title string.
   */
  getTitle(): string {
    return 'Estaciones situadas a mayor altitud en España (AEMET)';
  }
}


/**
 * Writes the top stations on the screen
 */
export class WeatherStationsWriter {
  /**
   * @desc Creates a Drawer for the weather stations
   * @param canvas - The HTML canvas element where the text is written
   */
  constructor(private readonly canvas: HTMLCanvasElement) {}

    /**
   * @desc Renders the complete bar chart 
   * @param data - Array of data points to render.
   */
  draw(data: PrintData[]): void {
    const context = this.canvas.getContext('2d');
    if (!context) return;
    context
    context.fillStyle = 'black';
    context.font = '16px Arial';
    const startX = 20;
    let startY = 30;
    const lineHeight = 25;
    data.forEach((station, index) => {
      const line = `${station.label}, ${station.value} m, ${station.province}`;
      context.fillText(line, startX, startY + index * lineHeight);
    });
  }
}