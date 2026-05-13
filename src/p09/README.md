[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NZ8xYbzw)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=23165977&assignment_repo_type=AssignmentRepo)

# Práctica 9 — Canvas API: Function Plotter

**Marco Pérez Padilla** · Programación de Aplicaciones Interactivas · ULL

---

## Descripción

Aplicación web que dibuja la gráfica de una función matemática sobre un `<canvas>` utilizando TypeScript puro, sin librerías externas de gráficos (excepto `mathjs` para evaluar expresiones introducidas por el usuario).

El programa permite:

- Dibujar ejes cartesianos con flechas, marcas (ticks) y etiquetas numéricas.
- Representar funciones predefinidas (ej. `sin(x)`) y funciones introducidas por el usuario (ej. `x^2 + 3*x`).
- Estilo personalizable mediante variables CSS (colores, fuentes, etc.), con aspecto similar a GeoGebra.
- Extensión de los ejes media unidad más allá del último valor para que las flechas queden correctamente posicionadas.
- Márgenes configurables para evitar que los elementos queden cortados en los bordes del canvas.

---

## Patrones de diseño aplicados

| Patrón | Clase | Responsabilidad |
|--------|-------|-----------------|
| Facade | `FunctionRenderer` | Orquesta el proceso de renderizado (fondo, ejes, función, etiqueta). |
| Strategy | `MathFunction` (interfaz) | Permite cambiar la función a representar (`SineFunction`, `UserDefinedFunction`). |
| Adapter | `UserDefinedFunction` | Adapta una expresión matemática en cadena a la interfaz `MathFunction` usando `mathjs`. |

Además, se ha utilizado el principio de **inversión de dependencias** (DIP) al depender de la abstracción `Drawable` para los elementos que se dibujan en el canvas.


---

## Fuentes de datos

No se consumen datos externos. Las funciones se definen:
- Internamente (`SineFunction`, `CosineFunction`, etc.)
- Por el usuario a través de un campo de texto, usando el analizador de expresiones de [math.js](https://mathjs.org/).

---

## Uso

```bash
npm install      
npm tsc          
npm run run 
```

## Generar documentación TypeDoc

```bash
npm run docs
```

## Autor

Marco Pérez Padilla - alu0101469348@ull.edu.es
