[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5VpVYbYr)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.online_ide?assignment_repo_id=23565016&assignment_repo_type=AssignmentRepo)

# Práctica 13 — Balatro (Small Blind)

**Marco Pérez Padilla** · Programación de Aplicaciones Interactivas · ULL

---

## Descripción

Implementación de una versión simplificada del juego **Balatro**, centrada exclusivamente en el primer nivel (*Small Blind*).  
La aplicación es una SPA (*Single Page Application*) desarrollada en TypeScript puro bajo el patrón Modelo‑Vista‑Controlador (MVC).  
La interfaz sigue el diseño de la aplicación de referencia, usando exclusivamente el framework **Bulma** personalizado con los colores institucionales y la tipografía de la Universidad de La Laguna.

En esta versión el jugador recibe 8 cartas, selecciona de 1 a 5 para formar manos de póker, juega hasta 3 manos y dispone de 3 descartes para intentar alcanzar los 300 puntos exigidos por el *Small Blind*.  
La puntuación de cada mano se calcula según las reglas oficiales: (`chips base de la mano` + `suma de valores de las cartas seleccionadas`) × `multiplicador base`.  
Se reconocen todas las manos de póker: *High Card*, *Pair*, *Two Pair*, *Three of a Kind*, *Straight*, *Flush*, *Full House*, *Four of a Kind* y *Straight Flush*, con el valor correcto de fichas y multiplicador para cada una.

---

## Patrones de diseño aplicados

| Patrón | Clase / Módulo | Responsabilidad |
|--------|----------------|-----------------|
| MVC | `BalatroModel`, `BalatroView`, `BalatroController` | Separación estricta de lógica, renderizado y control de eventos. |
| Dependency Inversion | `interfaces.ts` (`ICard`, `IScorePreview`, `IRoundConfig`) | El Modelo y la Vista dependen de abstracciones, nunca de implementaciones concretas. |
| Composición | `Deck` ← `Card`, `BalatroModel` ← `Deck`, `BalatroView` ← `CanvasRenderer` | Cada clase es dueña de sus componentes y controla su ciclo de vida. |
| SRP en helpers | `HtmlElementManager`, `CanvasRenderer` | Cada clase auxiliar tiene una única responsabilidad bien definida. |

---

## Instalación y uso

### Requisitos previos

- Node.js (v18 o superior)
- npm

### Instalación de dependencias

```bash
npm install
```

### Tests, compilación, documentación y previsualización local

```bash
# Ejecutar todos los tests unitarios (Jest)
npm test

# Compilar TypeScript y empaquetar con Vite
npm run build:vite

# Generar documentación con TypeDoc
npm run docs

# Construir todo (compilación + documentación)
npm run build:all

# Servidor de desarrollo local (Vite)
npx vite
```

Tras ejecutar `npx vite`, abre la URL que muestra la consola (normalmente http://localhost:5173) para jugar.

---

## Despliegue en GitHub Pages

El repositorio incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que se ejecuta automáticamente al hacer push a la rama `main`.  
El workflow:

1. Instala las dependencias.
2. Ejecuta `npm run build:all` (compilación TypeScript + Vite + documentación TypeDoc).
3. Despliega el contenido de la carpeta `dist/` a la rama `gh-pages` mediante un push forzado limpio.

### Configuración necesaria

- En el fichero `vite.config.js`, la propiedad `base` debe coincidir con el nombre del repositorio en GitHub Pages (en este caso `/25-26-pai-p13-balatro-Marco-Perez-Padilla/`).
- En los ajustes del repositorio (**Settings → Pages**), la fuente debe estar configurada como *Deploy from a branch* y seleccionar la rama `gh-pages`, carpeta `/ (root)`.

---

## Principios SOLID y buenas prácticas

El desarrollo aplica rigurosamente los principios **YAGNI**, **KISS**, **DRY** y **SOLID**:

- **SRP**: Cada clase tiene una única razón de cambio:
  - `BalatroModel`: estado del juego y reglas.
  - `BalatroView`: manipulación del DOM y renderizado del canvas.
  - `BalatroController`: coordinación entre modelo y vista.
  - `HandEvaluator`: lógica pura de evaluación de manos de póker.
  - `Deck`, `Card`: gestión del mazo.
  - `CanvasRenderer`, `HtmlElementManager`: responsabilidades auxiliares de dibujo y acceso al DOM.

- **OCP**: Se pueden añadir nuevas manos de póker o modificar la interfaz sin cambiar el modelo.

- **LSP**: `Card` implementa `ICard` sin alterar el contrato, y `BalatroController` interactúa con el modelo únicamente a través de métodos públicos.

- **ISP**: Las interfaces (`ICard`, `IScorePreview`, `IRoundConfig`) son pequeñas y específicas, forzando a que cada consumidor solo dependa de lo que necesita.

- **DIP**: El modelo y la vista dependen de abstracciones (interfaces), y el controlador invoca métodos del modelo sin conocer su implementación interna.

No se ha incluido ninguna funcionalidad fuera del alcance del Small Blind (**YAGNI**). El código es directo, con nombres significativos (**KISS**), y no hay lógica duplicada (**DRY**).

---

## Autor

**Marco Pérez Padilla** — alu0101469348@ull.edu.es

---

## Licencia

Este proyecto es de código abierto y se distribuye bajo la [Licencia MIT](LICENSE).