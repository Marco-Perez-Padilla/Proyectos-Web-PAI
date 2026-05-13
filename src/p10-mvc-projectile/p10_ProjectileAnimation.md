# Práctica 10. Animaciones gráficas en TypeScript. Trayectoria de un proyectil.
### Factor de ponderación: 10
### Estimación de horas de trabajo para realizar la práctica: 5

### Objetivos
Los objetivos de esta tarea son poner en práctica:
* Desarrollo de animaciones gráficas en TS/JS
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
* La documentación de la aplicación incluirá un fichero README.md con la información correspondiente al
  proyecto desarrollado
* La estructura de directorios del proyecto será conforme a los requisitos establecidos en la asignatura
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
* Se comprobará que el código que el alumnado escribe se adhiere a las reglas de las Guías de Estilo de Google
  para Javascript y/o TypeScript
* Todas las prácticas realizadas hasta la fecha, incluída la que se presenta para su evaluación, se encuentran alojadas en repositorios privados de GitHub.
* Acreditar que es capaz de editar ficheros de forma remota en su VM usando Visual Studio Code

### Animaciones en TypeScript/JavaScript
En el directorio `src/exercises/bouncing-ball-animation-example/` de esta práctica tiene disponible el código
fuente de una aplicación web que implementa la animación de una bola que se mueve con velocidad constante en
el marco de un canvas insertado en la página de la aplicación.

Comience por leer el fichero `README.md` de la aplicación, que contiene instrucciones para compilar y
desplegar la misma.

Estudie a continuación los tres ficheros (`main.ts`, `Ball.ts` y `ViewAnimation.ts`) de código de la aplicación, con
particular detenimiento en la clase `ViewAnimation`.
El código de esa clase tiene comentarios que debieran permitir entender la lógica de la aplicación.


El método `animationLoop` de esa clase es el núcleo de la animación.
Se trata de una función flecha asignada como propiedad (no un método normal), lo que garantiza 
que `this` siempre apunte a la instancia, aunque sea el navegador quien la invoque como callback.

Ese método utiliza
[requestAnimationFrame](https://developer.mozilla.org/es/docs/Web/API/Window/requestAnimationFrame)
como mecanismo básico de la animación.

Aportamos aquí algunas explicaciones adicionales para entender ese método:
* Incremento (delta) de tiempo: En lugar de mover la bola un número fijo de píxeles por frame, 
se calcula cuántos segundos reales han pasado y se usa ese valor para multiplicar la velocidad. 
Así la animación va igual de rápida en un monitor de 60 Hz que en uno de 144 Hz. 
`Math.min(..., 0.05)` limita el incremento a 50 ms: si el usuario cambia de pestaña y vuelve, 
el navegador puede acumular cientos de milisegundos, lo que haría que la bola se "teletransportara"; 
el límite (*clamp*) lo evita.

* Ciclo de renderización: Primero se actualiza el estado físico (posición, rebotes), luego se borra el 
frame anterior y finalmente se dibuja el nuevo estado. Este orden es el estándar en animación: actualizar -> limpiar -> dibujar.

* Auto-programación: Al final de cada frame, `animationLoop` se vuelve a registrar como callback con `requestAnimationFrame`, 
creando un bucle recursivo no bloqueante. 
El navegador controla cuando ejecutarlo, respetando la frecuencia de refresco de la pantalla y pausándolo cuando la pestaña no es visible.

Estudie estas referencias:
* [JavaScript animations](https://javascript.info/js-animation)
* [Animaciones básicas](https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
* [Anatomía de un videojuego](https://developer.mozilla.org/es/docs/Games/Anatomy)

### Indicaciones de caracter general
El programa que desarrolle ha de ser orientados a objetos.
Ponga en práctica los principios de abstracción y encapsulamiento característicos 
de la OOP así como las buenas prácticas, principios y patrones que han sido expuestos en las clases de la asignatura.

La estructura de directorios de su proyecto de práctica debe ser conforme con la estructura establecida para
las prácticas de PAI.

Configure adecuadamente ficheros `package.json` y `tsconfig.json` en el directorio raíz de su ejercicio 
que permitan la instalación de las dependencias de su proyecto.

Incluya en el fichero `README.md` la información relevante de su proyecto de práctica y haga que ese fichero
sea la primera página de la documentación (TypeDoc) de la práctica.

Haga que en el elemento `title` del código HTML de todas las páginas web de su poroyecto figure su nombre y apellidos.

En el desarrollo de esta práctica, utilice el depurador integrado en el navegador para confirmar que el flujo
de ejecución de su programa es el correcto.

No intente desarrollar su aplicación en un único paso.

Previo al desarrollo, realice un diseño de su aplicación identificando las diferentes clases que
intervienen en el programa. 
Utilice lápiz y papel para hacer un esquema de las relaciones entre las diferentes clases que intervienen en
su aplicación.

Después de esa planificación inicial, trabaje mediante sucesivos refinamientos de una primera aproximación.
También puede resultarle conveniente realizar pequeñas aplicaciones auxiliares que le sirvan para comprobar y
aprender el funcionamiento de algún aspecto concreto de la aplicación.

Cuando finalice su aplicación, utilice 
[Mermaid.js](https://mermaid.js.org/), 
[Lucidchart](https://www.lucidchart.com/pages) o cualquier otra herramienta que conozca para trasladar sus
diseños en papel a un diagrama en formato digital que pueda mostrar a través de una web.

### Tiro parabólico
Se denomina 
[movimiento parabólico](https://www.ck12.org/c/physics/projectile-motion-for-an-object-launched-at-an-angle/lesson/Projectile-Motion-for-an-Object-Launched-at-an-Angle-PHYS/)
al realizado por un objeto cuya trayectoria describe una parábola. 
Se corresponde con la trayectoria ideal de un proyectil que se mueve en un medio que no ofrece 
resistencia al avance y que está sujeto a un campo gravitatorio uniforme.
En [esta
referencia](https://espanol.libretexts.org/Bookshelves/Fisica/Libro%3A_Fisica_(sin_limites)/3%3A_Cinem%C3%A1tica_bidimensional/3.3%3A_Movimiento_del_proyectil?readerView)
hay información adicional sobre las leyes físicas que rigen el comportamiento del tiro parabólico, y en
particular puede Ud. consultar la ecuación de la trayectoria parabólica en función de la velocidad inicial y
el ángulo de lanzamiento.

En esta práctica se propone desarrollar en TypeScript una aplicación web en formato SPA 
([Single Page Application](https://en.wikipedia.org/wiki/Single-page_application))
conforme al patrón MVC que simulará el lanzamiento de un proyectil disparado desde una altura dada con una velocidad y ángulo
de disparo iniciales.

Intente que su aplicación imite en la medida de lo posible el aspecto de
[esta otra](https://demonstrations.wolfram.com/AnimatedProjectileMotion/)
omitiendo los "sliders" de la parte superior.

La visualización de la ejecución del programa y su interfaz gráfica se desarrollará a través de una página web alojada
en la máquina IaaS-ULL de la asignatura (puede utilizar si lo desea la extensión *Live View* de VSC).

Configure en el directorio `/public` de su práctica, la página `index.html`, 
que servirá de "página índice" tanto para su aplicación como para los ejercicios de la sesión de evaluación.
Enlace también en esa página índice tanto la página que contiene la documentación de su proyecto, generada con
Typedoc como otra que mostrará el diagrama UML de las clases que intervienen en su programa.

La simulación se mostrará en una página que tendrá 3 partes diferenciadas:
* P1 el canvas principal donde se dibuja la trayectoria del proyectil,
* P2, un segundo canvas por debajo del anterior en el que se mostrará la información (distancia recorrida, tiempo transcurrido, etc.)
* P3, una tercera sección en la que figuran los botones y controles de parámetros de entrada, que en su
  aplicación sustituyen a los "sliders" de la parte superior de la 
  [aplicación de referncia](https://demonstrations.wolfram.com/AnimatedProjectileMotion/)

El canvas principal (P1) será de forma rectangular y debe abarcar toda la superficie del viewport del navegador.

El canvas de P2 estará inicialmente vacío y en él se imprimirá
información relativa al lanzamiento que se realice, una vez que el proyectil finalice su trayectoria.
La información a reflejar es: 
tiempo transcurrido (`t`) en segundos, 
distancia recorrida horizontalmente (`x`) en metros y
altura máxima alcanzada (`y max`) también en metros.

En el tercer panel (P3) el programa debe mostrar tres campos de texto en los que el usuario
podrá introducir altura y velocidades iniciales y ángulo del lanzamiento, así como un botón `animate`, que inciará la animación.
 
También en P3 se dispondrá un *checkbox* en el que el usuario elige si se dibuja o no la trayectoria del proyectil. 
Las trayectorias correspondientes a diferentes lanzamientos se dibujarán con diferentes colores, que se superpondrán en 
el lienzo de P1. 
P2 mostrará la información correspondiente al último lanzamiento y esa información debe
borrarse con cada nuevo lanzamiento.

En el origen del lanzamiento (x=0 y=*altura inicial*), se representará el cañón que efectúa el disparo mediante una flecha (vector)
cuyo ángulo con el eje de abcisas coincida con el ángulo del disparo (la flecha se dibuja
cuando se active el botón `Lanzar` orientada en función del valor del ángulo introducido).

Para el primer proyectil lanzado, la escala de distancias (eje X) se configurará dinámicamente de
modo que ese primer lanzamiento "no se salga de la escala".

El diseño del HTML de esa página brinda una oportunidad para practicar diferentes elementos HTML.
Consiga, p. ej. que su página tenga secciones *header* y *footer*. 
En la cabecera coloque al menos sus apellidos y nombre. 
Utilice el footer para colocar información sobre la asignatura, titulación, etc.

No se pretende que se utilicen elementos CSS no estudiados en la asignatura.

Puesto que su desarrollo es una *Single Page Application* las tres secciones (P1-P3) de la página debieran
visualizarse correctamente sin necesidad de desplazarse (*scroll*) ni horizontal ni verticalmente.

No se requiere que dedique esfuerzo a aspectos relacionados con CSS en esta práctica.
Los estilos de CSS son aspectos que se estudiarán con mayor nivel de detalle en el futuro. 

## Referencias
* [JavaScript animations](https://javascript.info/js-animation)
* [Animaciones básicas](https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial/Basic_animations)
* [Anatomía de un videojuego](https://developer.mozilla.org/es/docs/Games/Anatomy)
* [TypeScript Tutorial](https://www.typescripttutorial.net/)
* [TypeDoc](https://typedoc.org/)
* [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
* [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
* [Jest](https://jestjs.io/)
* [ESLint](https://eslint.org/)
* [JSDoc](https://jsdoc.app/)
