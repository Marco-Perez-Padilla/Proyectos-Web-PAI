[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5VpVYbYr)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.online_ide?assignment_repo_id=23565016&assignment_repo_type=AssignmentRepo)

# Práctica 12 — El Juego del Ahorcado

**Marco Pérez Padilla** · Programación de Aplicaciones Interactivas · ULL

---

## Descripción

Aplicación web de página única (SPA) que implementa el clásico juego del Ahorcado. El jugador debe adivinar una palabra secreta —nombres de países del mundo— letra por letra, antes de que se complete la figura del ahorcado. Está desarrollada en TypeScript puro siguiendo la arquitectura Modelo-Vista-Controlador (MVC), con interfaz construida enteramente con el framework Bulma personalizado con los colores y la tipografía corporativa de la Universidad de La Laguna.

La aplicación permite:

- Adivinar palabras letra por letra usando un teclado visual en pantalla.
- Usar el teclado físico para introducir letras.
- Visualizar la progresión de la horca mediante imágenes numeradas (0–6 intentos fallidos).
- Ver las letras acertadas y fallidas con colores distintivos (verde / rojo).
- Reiniciar la partida en cualquier momento con un botón dedicado.
- Conocer la palabra secreta al finalizar (victoria o derrota).
- Diccionario completo con los 193 países soberanos del mundo, normalizados al alfabeto español de 27 letras (a–z, ñ).

---

## Patrones de diseño aplicados

| Patrón | Clase / Módulo | Responsabilidad |
|--------|----------------|-----------------|
| MVC | `HangmanModel`, `HangmanView`, `HangmanController` | Separación estricta de lógica, renderizado y control de eventos. |
| Observer | `IGameStateObserver` → `HangmanController` | El modelo notifica cambios de estado sin conocer a la vista. |
| Dependency Inversion | `interfaces.ts` | Modelo y Vista dependen de abstracciones, no de implementaciones concretas. |
| Single Responsibility | `HangmanModel`, `HangmanView`, `HangmanController`, `buildHangmanUI`, `countries.ts` | Cada módulo tiene una única razón de cambio bien definida. |

---

## Instalación y uso

### Requisitos previos

- Node.js (v18 o superior)
- npm

### Instalación de dependencias

```bash
npm install
```

### Compilación del código TypeScript

```bash
npm run build:all
```

Utiliza Vite para generar la versión de producción en la carpeta `dist/` así como la documentación con `typedoc`.

### Previsualización de la versión compilada

```bash
npx vite
```

## Live Demo

Tras ejecutar `npx vite`, accede a `http://localhost:5173/src/exercises/home-work/game.html` para jugar en tu navegador.

---

## Despliegue en GitHub Pages

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que compila automáticamente el proyecto y despliega el contenido de `dist/` en la rama `gh-pages`. Para que funcione correctamente:

- La base en `vite.config.ts` debe ser `'/25-26-pai-p12-hangman-ghpages-Marco-Perez-Padilla/'`.
- En la configuración del repositorio (Settings → Pages), la fuente debe ser **Deploy from a branch**, rama `gh-pages`, carpeta `/ (root)`.
- Los enlaces a recursos (CSS, imágenes, retorno al índice) usan rutas relativas (`../../../ull-bulma.css`, `../../../index.html`, etc.) que funcionan tanto en desarrollo como en producción.

---

## Principios SOLID y buenas prácticas

El desarrollo sigue rigurosamente los principios YAGNI, KISS, DRY y SOLID:

- **SRP**: Cada clase tiene una única responsabilidad (lógica de juego, renderizado, coordinación).
- **OCP**: Se pueden añadir nuevas palabras o cambiar la UI sin modificar el modelo.
- **LSP**: El controlador implementa las interfaces sin alterar el comportamiento esperado.
- **ISP**: Las interfaces son pequeñas y específicas (1-2 métodos cada una).
- **DIP**: Modelo y Vista dependen de abstracciones, no de implementaciones concretas.

No se ha incluido funcionalidad innecesaria (YAGNI), el código es directo y fácil de seguir (KISS) y no hay duplicación de lógica (DRY).

---

## Autor

**Marco Pérez Padilla** — alu0101469348@ull.edu.es

---

## Licencia

Este proyecto es de código abierto y se distribuye bajo la [Licencia MIT](LICENSE).