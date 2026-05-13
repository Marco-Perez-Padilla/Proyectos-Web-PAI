[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NZ8xYbzw)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23165977&assignment_repo_type=AssignmentRepo)
# Práctica 8 — JSON Data Visualization

**Marco Pérez Padilla** · Programación de Aplicaciones Interactivas · ULL

---

## Descripción

Aplicación web que visualiza datos reales en gráficos de barras dibujados sobre un `<canvas>` con TypeScript puro, sin librerías de gráficos externas.

Se han implementado dos visualizaciones independientes:

- **Instalaciones deportivas de Santa Cruz de Tenerife** — datos del portal Open Data del Ayuntamiento (formato ESRI GeoJSON), agrupados por tipo de instalación.
- **Esperanza de vida por país (Banco Mundial 2022)** — datos obtenidos de la API pública del Banco Mundial, mostrando el top 15 de países.

---

## Patrones de diseño aplicados

| Patrón | Clase | Responsabilidad |
|--------|-------|-----------------|
| Facade | `DataFetcher` | Encapsula la Fetch API |
| Adapter | `SportsDataAdapter`, `WHOAdapter` | Transforma datos remotos en `ChartData[]` |
| Builder | `BarChartBuilder` | Configura y construye `BarChart` |

---

## Estructura del proyecto
```
src/home-work/
├── common/
│   ├── bar-chart.ts
│   ├── bar-chart-builder.ts
│   ├── data-fetcher.ts
│   └── interfaces.ts
├── tf-sports/
│   ├── sports-adapter.ts
│   └── tf-sports-client.ts
└── life-expectancy-barchart/
    ├── life-expectancy-adapter.ts
    ├── life-expectancy-client.ts
    └── life-expectancy-interfaces.ts
```

---

## Fuentes de datos

- [Open Data SCT — Canchas Deportivas](https://www.santacruzdetenerife.es/opendata)
- [World Bank API — Life Expectancy](https://api.worldbank.org/v2/country/.../indicator/SP.DYN.LE00.IN)

---

## Uso
```bash
npm install       # instalar dependencias
npx tsc           # compilar TypeScript
npm run start     # arrancar el servidor en http://localhost:8080
npm run test      # ejecutar tests unitarios
npm run docs      # generar documentación TypeDoc
npm run stop      # parar el servidor
```