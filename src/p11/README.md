[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5VpVYbYr)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23565016&assignment_repo_type=AssignmentRepo)

# Práctica 11 — Programación gráfica orientada a eventos: Curvas de Lissajous

**Marco Pérez Padilla** · Programación de Aplicaciones Interactivas · ULL

---

## Descripción

Aplicación web de página única (SPA) que visualiza curvas de Lissajous de forma interactiva. Está desarrollada en TypeScript puro sobre la Canvas API, siguiendo la arquitectura Modelo-Vista-Controlador (MVC). La interfaz utiliza el framework Bulma personalizado con los colores y la tipografía corporativa de la Universidad de La Laguna.

La aplicación permite:

- Modificar en tiempo real los parámetros de la curva: frecuencias `a` y `b`, desfase `φ`, amplitudes `A` y `B`.
- Animar automáticamente el desfase `φ` con un checkbox.
- Visualizar la cuadrícula de referencia y la trayectoria completa de la curva.
- Redimensionar el canvas de forma adaptativa al tamaño del navegador.
- Análisis estático de código con SonarQube.

---

## Patrones de diseño aplicados

| Patrón | Clase | Responsabilidad |
|--------|-------|-----------------|
| MVC | `LissajousModel`, `LissajousView`, `LissajousController` | Separación de lógica, renderizado y control de entrada. |
| Facade | `LissajousView` | Orquesta los renderers de cuadrícula, curva y redimensionado sin exponer su implementación. |
| Single Responsibility | `GridRenderer`, `CurveRenderer`, `CanvasRenderer`, `ResizeManager`, `ControlsBinder`, `SliderUpdater` | Cada clase tiene una única tarea bien definida. |

---

## Estructura del proyecto

```
.
├── public/            
│   ├── index.html            
│   └── ull-bulma.css         
├── src/
│   └── exercises/
│       └── home-work/        
│           ├── lissajous.html
│           ├── lissajous.ts
│           ├── lissajous-model.ts
│           ├── lissajous-view.ts
│           ├── lissajous-controller.ts
│           ├── canvas-renderer.ts
│           ├── grid-renderer.ts
│           ├── curve-renderer.ts
│           ├── resize-manager.ts
│           ├── controls-binder.ts
│           ├── slider-updater.ts
│           ├── parameters.ts
│           ├── ull-bulma.scss
│           ├── doc/      
│           └── uml/         
├── package.json
├── tsconfig.json
├── typedoc.json
├── sonar-project.properties
└── README.md
```

---

## Instalación y uso

### Requisitos previos

- Node.js (v18 o superior)
- npm

### Instalación de dependencias

```bash
npm install
```

Este comando instala TypeScript, Vite, Bulma, Sass, SonarQube Scanner y demás herramientas necesarias.

### Compilación del código TypeScript y construcción con Vite

```bash
npm run build:p11
```

Este script ejecuta `tsc`, generando la salida en la carpeta `dist/`.

### Compilación de estilos SCSS personalizados

```bash
npm run build:css
```

El CSS resultante se escribe en `public/ull-bulma.css`.

### Construcción completa (TypeScript + TypeDoc)

```bash
npm run build:all
```

### Servidor estático con Express

```bash
npm run run
```

Este comando inicia un servidor Express que sirve los archivos generados en `dist/` y `public/`.

### Generación de documentación con TypeDoc

```bash
npm run docs
```

La documentación se genera en `src/exercises/home-work/doc/` y puede consultarse a través de la página índice.

### Análisis con SonarQube

Asegúrate de tener un servidor SonarQube local ejecutándose (por ejemplo, con Docker) y de haber configurado el token en `sonar-project.properties`. Luego ejecuta:

```bash
npm install -g @sonar/scan
sonar \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=<TOKEN> \
  -Dsonar.projectKey=<PROJECTKEY>
```

---

## Live Demo

Tras ejecutar `npm run run`, accede a la página principal desde tu navegador para ver la aplicación en funcionamiento.

---

## Autor

Marco Pérez Padilla — alu0101469348@ull.edu.es

---

## Licencia

Este proyecto es de código abierto y se distribuye bajo la Licencia MIT.