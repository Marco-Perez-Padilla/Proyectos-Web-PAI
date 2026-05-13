# Práctica 9. Programación Gráfica en TypeScript. La API Canvas. Representación de funciones.
### Factor de ponderación: 9

### Objetivos
Los objetivos de esta tarea son poner en práctica:
* Conceptos básicos de Programación Gráfica en TypeScript usando la API Canvas.
* Metodologías y conceptos de diseño y Programación Orientada a Objetos en TypeScript.
* Principios y Buenas prácticas de programación Orientada a Objetos.
* Alguno de los patrones de diseño que se han estudiado en la asignatura.

### Rúbrica de evaluacion del ejercicio
Se señalan a continuación los aspectos más relevantes (la lista no es exhaustiva)
que se tendrán en cuenta a la hora de evaluar esta práctica:
* Se valorará la realización de las diferentes tareas que se proponen
* El comportamiento del programa debe ajustarse a lo descrito en este documento
* Capacidad de la programadora de introducir cambios en el programa desarrollado
* Se acredita conocimiento y puesta en práctica de principios y buenas prácticas de programación orientada a objetos
* Saber corregir bugs en sus programas utilizando el depurador de Visual Studio Code
* Deben usarse estructuras de datos adecuadas para representar los diferentes elementos que intervienen en el problema
* Ser capaz de desarrollar programas simples en TypeScript en el entorno Linux de la VM de la asignatura usando
  `ts-node`
* Ser capaz de generar documentación para sus programas TS utilizando
  [TypeDoc](https://typedoc.org/)
  y de visualizar dicha documentación en un servidor web
* El alumnado debe ser capaz de resolver problemas tanto en JS como en TS en la plataforma Exercism subiendo sus soluciones a la misma
* Ser capaz de desarrollar tests unitarios para sus programas utilizando
  [Jest](https://jestjs.io/)
* Acreditar su capacidad para configurar y utilizar 
  [ESLint](https://eslint.org/)
y que es capaz de trabajar con la misma en Visual Studio Code
* Acreditar que conoce las etiquetas de 
  [JSDoc](https://jsdoc.app/)
* Acreditar que es capaz de generar documentación para sus programas utilizando
  [TypeDoc](https://typedoc.org/)
y que es capaz de generar documentación para sus programas utilizando la herramienta
* El alumnado ha de acreditar que es capaz de desarrollar programas de la plataforma Jutge
* Se comprobará que el código que el alumnado escribe se adhiere a las reglas de las Guías de Estilo de Google
  para Javascript y/o TypeScript
* Todas las prácticas realizadas hasta la fecha, incluída la que se presenta para su evaluación, se encuentran alojadas en repositorios privados de GitHub.
* Acreditar que es capaz de editar ficheros de forma remota en su VM usando Visual Studio Code

### Ficheros `README.md` de los proyectos de PAI
Cuando finalice su desarrollo modifique el fichero `README.md` de su proyecto incluyendo la información
correspondiente a su proyecto de práctica.

Puede tomar el fichero `README.md` de esta práctica como, pero adapte el contenido al caso particular de cada una de sus prácticas.
Siéntase libre de consignar cualquier información que le parezca relevante, pero incluya siempre
como mínimo la información que se muestra en el ejemplo.

Haga que el fichero `README.md` sea la primera página de la documentación (TypeDoc) del
proyecto.

### Estructura de directorios de los proyectos de PAI
A pesar de que no existe un criterio universal a la hora de estructurar en directorios un proyecto de
programación web en TypeScript como los que se desarrollan en PAI, sí conviene adoptar una estructura de directorios explícita y consensuada en el ámbito de la asignatura.
El beneficio principal es que una estructura así mejora la mantenibilidad, la colaboración y la consistencia entre proyectos.

Una estructura consensuada favorece la asignación clara de responsabilidades y mejora el flujo de información,
y agrupar de forma coherente los módulos así como usar nombres descriptivos mejora la descubribilidad, facilita refactorizaciones 
y ayuda a que el proyecto escale sin convertirse en un repositorio caótico.

Es por las razones expuestas que en las prácticas de PAI vamos a adoptar para cada práctica la estructura de
directorios que se presenta en este documento.

## Descripción del contenido y finalidad de cada directorio
Se explica a continuación el contenido de cada uno de los directorios de la estructura propuesta, que es la
que se incorpora en esta práctica.

La estructura sigue un principio central: cada ejercicio es autónomo, pero todos comparten infraestructura común para no repetir código.

Es posible que en esta estructura eche Ud. en falta algún directorio. 
Si se da ese caso, utilice su propia lógica para incorporarlo en el punto adecuado con un nombre descriptivo.
Debiera resultar menos probable que necesite prescindir de alguno de los directorios propuestos.

Por otra parte todos los ficheros que se proporcionan con esta práctica (`*.html`, `*.json`, `*.js`, etc.) se
ofrecen a modo de ejemplo o referencia. 
**Debe Ud.** revisarlos y adaptarlos a sus propias necesidades en cada práctica y ejercicio.

**Raíz del proyecto**
Los ficheros de configuración se alojan aquí: `package.json` gestiona dependencias y scripts, 
`tsconfig.jsoni` configura el compilador.
Ficheros `.gitignore`, `README.md` así como otros que pudieran resultar necesarios para futuras necesidades.

**`/public`**
`index.html`, 
Punto de entrada ("índice") y navegación entre los ejercicios de la práctica
Ficheros de estilos (CSS) comunes a todo el proyecto

**`/dist`**
Directorio que almacena los ficheros JS transpilados a partir de los fuentes TS
Este directorio es ignorado en `.gitignore`

**`/scripts`**
`dev-server.js `, servidor de desarrollo simple, para desplegar su aplicación en su máquina virtual.

**`/src/exercises`**
Un subdirectorio por ejercicio, y cada uno de ellos tiene exactamente la misma estructura interna: página HTML dedicada, 
fichero principal de la aplicación, módulos propios (clases) de ese ejercicio y un README.md con la descripción específica del ejercicio, si se considera necesario.

También incluye un subdirectorio para el ejercicio desarrollado como práctica/entrenamiento para la sesión de evaluación.

**`/src/exercises/exercise-1-hello-canvas`**
Cada uno de los subdirectorios de `exercises` tiene una misma estructura, conteniendo al menos:
`exercise-1-hello-canvas.html` - Fichero HTML del ejercicio.
`exercise-1-hello-canvas.ts` - Fichero principal (punto de entrada) del ejercicio.
`exercise-1-hello-canvas.css` - Estilos del ejercicio

Replicar esta estructura en cada ejercicio

**`/src/exercises/home-work/doc`**
Directorio conteniendo la documentación del ejercicio de preparación de la práctica

### Indicaciones de caracter general
El programa que desarrolle ha de ser orientados a objetos.
Ponga en práctica los principios de abstracción y encapsulamiento característicos 
de la OOP así como las buenas prácticas, principios y patrones que han sido expuestos en las clases de la asignatura.

Configure para esta práctica una página web que sirva de índice para mostrar la documentación generada por
TypeDoc para su aplicación.

Configure adecuadamente ficheros `package.json` y `tsconfig.json` en el directorio raíz de su ejercicio 
que permitan la instalación de las dependencias de su proyecto.

En el desarrollo de esta práctica, utilice el depurador integrado en el navegador para confirmar que el flujo
de ejecución de su programa es el correcto.

### Representación de funciones
El objetivo de esta práctica es el desarrollo de una aplicación que permita la visualización en una página web
de la representación gráfica de una función.

Intente que su aplicación imite en la medida de lo posible el aspecto de
[esta otra](https://www.geogebra.org/m/BTC45Jzp)
que se tomará como referencia.

De esa página imite los ejes coordenados así como la numeración de los mismos y el área de dibujo de la
función.
En esa página de referencia pruebe a dibujar diferentes funciones usando el campo "Entrada" de la parte
inferior.
Pruebe a introducir funciones como *sin(x)*, *exp(x)* o *sqrt(x)* y visualice el resultado.

En la aplicación que ha de desarrollar comience, a diferencia de la aplicación de referencia, haciendo que la
función que se vaya a representar figure codificada (*cableada*, *hardcoded*) en su código fuente de modo que
para cambiar la función que se representa habría que modificar la función principal del programa.
Con posterioridad, intente una aproximación más elaborada, como la de la página de referencia, en la que la
función pueda ser introducida por el usuario. 
Para explorar esta segunda aproximación tal vez le resulte útil estudiar el analizador de expresiones
(*Expression parser*) de librería
[mathjs](https://mathjs.org/) 

Previo al desarrollo, realice un diseño de su aplicación identificando las diferentes clases que
intervienen en el programa.
Utilice *LucidChart* para dibujar un diagrama UML de las clases que intervienen.

### Interfaz gráfica de la aplicación 
La interfaz gráfica de la aplicación se desarrollará a través de diferentes páginas HTML.
Haga que en el elemento `title` del código HTML de todas las páginas web de su poroyecto figure su nombre y apellidos.

La visualización de la ejecución del programa se realizará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura (puede utilizar si lo desea la extensión *Live View* de VSC) y cuya URL tendrá la forma:

[1] `http://10.6.129.123:8080/einstein-albert-function-rendering.html`

en la que se embeberá un lienzo (canvas) para dibujar la gráfica de una función.
Sustituya *Albert Einstein* por su nombre y apellido en la URL de su página
y la dirección IP anterior por la correspondiente a su máquina IaaS.

La web [1] mostrará un lienzo (canvas) que ocupe la mayor parte del viewport de su navegador.

No es necesario que invierta esfuerzo en la programación de los aspectos de esa página que no tienen relación
con TypeScript. 
Tanto HTML como CSS son aspectos que se estudiarán con mayor nivel de detalle en el futuro. 
No se requiere que dedique esfuerzo a esos aspectos en esta práctica.
Tampoco se propone en esta práctica que utilice elementos interactivos (botones, campos de texto, selectores,
etc.) salvo quizás un campo de texto para leer la función que el usuario propone representar.

Diseñe asimismo otra página HTML simple 

[2] `http://10.6.129.123:8080/index.html`

que sirva de "página índice" para los ejercicios de la sesión de evaluación de la práctica.
La página [1] será uno de los enlaces de [2] y a su vez [1] tendrá un enlace "Home" que apunte a [2].
Enlace también en la página índice [2] la página que contiene la documentación de su proyecto, generada con
Typedoc.

Incluya una tercera página
[3] `http://10.6.129.123:8080/uml.html`
que muestre el diagrama UML de las clases que intervienen en su programa.

Las siguientes deben tomarse como especificaciones adicionales de la aplicación a desarrollar:

## Diseño orientado a objetos
Se deja total libertad al alumnado para diseñar la aplicación de la forma que estime más conveniente.
Se valorará la puesta en práctica en el diseño que se realice de los contenidos relacionados con principios y
buenas prácticas de OOP estudiados en la asignatura así como el uso de alguno de los patrones de diseño que ha
estudiado.

## Referencias
* [TypeScript Tutorial](https://www.typescripttutorial.net/)
* [TypeDoc](https://typedoc.org/)
* [TypeScript track in Exercism](https://exercism.org/tracks/typescript)
* [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
* [Jutge web site](https://jutge.org/)
* [Jest](https://jestjs.io/)
* [ESLint](https://eslint.org/)
* [JSDoc](https://jsdoc.app/)
