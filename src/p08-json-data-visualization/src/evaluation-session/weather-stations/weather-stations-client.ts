/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Marco Pérez Padilla
 * @since Mar 23 2026
 * @desc Entry point the evaluation session
 */

import { WeatherStations } from "./weather-stations.js";
import { EstacionDatos } from "./weather-stations.js";
import { WeatherStationsWriter } from "./weather-stations.js";

/**
 * @desc Function that loads data from local file
 * @returns {EstacionesDatos} that
 */
async function loadData(): Promise<EstacionDatos[]> {
  const response = await fetch('/src/evaluation-session/weather-stations/aemet/estaciones.json');
  const records: EstacionDatos[] = await response.json();
  return records;
}


async function main() {
  const records = await loadData();
  const weatherStations = new WeatherStations(records);
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const weatherStationWriter = new WeatherStationsWriter(canvas);
  const data = weatherStations.toData(10);
  weatherStationWriter.draw(data);
}

main();
