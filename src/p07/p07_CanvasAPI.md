# Práctica 7. Programación Gráfica en TypeScript. La API Canvas. Figuras geométricas planas.
### Factor de ponderación: 7

### Objetivos
Los objetivos de esta tarea son poner en práctica:
* Conceptos básicos de Programación Gráfica en TypeScript usando la API Canvas.
* Metodologías y conceptos de diseño y Programación Orientada a Objetos en TypeScript.
* Principios y Buenas prácticas de programación Orientada a Objetos.

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

### Indicaciones de caracter general

Todos los programas que desarrolle han de ser orientados a objetos.
Ponga en práctica los principios de abstracción y encapsulamiento característicos 
de la OOP así como las buenas prácticas, principios y patrones que han sido expuestos en las clases de la asignatura.

Previo a la implementación de cada clase, diseñe y desarrolle un conjunto de tests para probar el correcto
funcionamiento de todos los métodos que desarrolle.

Configure para esta práctica una página web que sirva de índice para mostrar la documentación generada por
TypeDoc para el ejercicio que se propone.

Configure adecuadamente ficheros `package.json` y `tsconfig.json` en el directorio raíz de su ejercicio, 
de modo que ejecutando `npm install` queden instaladas todas las dependencias del proyecto.

En el desarrollo de esta práctica, utilice el depurador integrado en el navegador para confirmar que el flujo
de ejecución de su programa es el correcto.

### Interfaz gráfica de la aplicación 
En esta práctica se propone diseñar diferentes clases que permitan la visualización de figuras
geométricas en una página web estática.

La interfaz gráfica de la aplicación se desarrollará a través de diferentes páginas HTML.
Haga que en el elemento `title` del código HTML de todas las páginas web de su proyecto figure su nombre y apellidos.

La visualización de la ejecución del programa se realizará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura (no utilice la extensión *Live View* de VSC) y cuya URL tendrá la forma:

[1] `http://10.6.129.123:8080/einstein-albert-figures.html`

en la que se embeberá un lienzo (canvas) para dibujar las diferentes figuras.
Sustituya *Albert Einstein* por su nombre y apellido en la URL de su página
y la dirección IP anterior por la correspondiente a su máquina IaaS.

No es necesario que invierta esfuerzo en la programación de los aspectos de esa página que no tienen relación
con TypeScript. 
Tanto HTML como CSS son aspectos que se estudiarán con mayor profundidad en el futuro. 
No se requiere que dedique esfuerzo a esos aspectos en esta práctica.

Diseñe asimismo otra página HTML simple 

[2] `http://10.6.129.123:8080/index.html`

que sirva de "página índice" para los ejercicios de la sesión de evaluación de la práctica.
La página [1] será uno de los enlaces de [2] y a su vez [1] tendrá un enlace "Home" que apunte a [2].
Enlace también en la página índice [2] la página que contiene la documentación de su proyecto.

## Figuras geométricas
En su aplicación puede puede implementar cualquier figura geométrica plana que desee, pero como mínimo la aplicación ha de
contemplar cuadrados, rectángulos, triángulos y círculos.
Cada figura puede caracterizarse con los atributos (*properties*) que estime oportuno, e igualmente puede
elegir libremente los métodos que desarrolle para cada figura.
Todas las figuras han de implementar un método *getArea()* que devuelva el valor del área de la figura en
cuestión.

## Diseño orientado a objetos
Se deja total libertad al alumnado para diseñar la aplicación de la forma que estime más conveniente.
Se valorará la puesta en práctica en el diseño que se realice de los contenidos relacionados con principios y
buenas prácticas de OOP estudiados en la asignatura.

Sería conveniente tener en cuenta que al menos habrá clases para representar las diferentes figuras (una clase
para cada tipo de figura considerada) y otra clase a la que podemos llamar *View* (Vista) que será la encargada de la
visualización de las diferentes figuras en el canvas de la página web.

La clase Vista, de modo similar a como se hizo en la página de la práctica 1 que calcula de forma aproximada el valor de *pi*, 
solicitará al usuario (usando la función 
[prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt))
el número de figuras a dibujar.

La Vista generará aleatoriamente (el tipo, su color, su posición, etc.) ese número de figuras y procederá a
renderizarlas en la página.

## Referencias
* [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
* [TypeScript Tutorial](https://www.typescripttutorial.net/)
* [TypeDoc](https://typedoc.org/)
* [TypeScript track in Exercism](https://exercism.org/tracks/typescript)
* [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
* [Jutge web site](https://jutge.org/)
* [Jest](https://jestjs.io/)
* [ESLint](https://eslint.org/)
* [JSDoc](https://jsdoc.app/)
