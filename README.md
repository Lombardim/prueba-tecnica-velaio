# Prueba Tecnica Velaio

El proyecto se creó usando [Angular CLI](https://github.com/angular/angular-cli) versión 16.2.16.

## ¿Cómo correr el proyecto?

Utilizar el comando `ng serve` para generar el servidor en el entorno de desarrollo. Al cargar, abrir: `http://localhost:4200/`.

## ¿De qué trata la aplicación?

La aplicación trata de un organizador de tareas que permite la creación, edición y eliminación de tareas, estas tareas también tienen dos estados `pendiente` y `completada`, el sistema también permite cambiar el estado de la tarea a completada.

Cada tarea tiene como campos `NOMBRE`, `FECHA LÍMITE`, y una lista `PERSONAS ASOCIADAS`, cada `PERSONA ASOCIADA` tiene como campos `NOMBRE COMPLETO`, `EDAD` (mínimo 18 años), y un arreglo de `HABILIDADES`.

## ¿Cómo se llegó a la solución?
Para llegar a la solución se realizaron 2 ventanas, una para la sección de listar las tareas y otra para la sección de crear una nueva tarea (la cual también sirve para editar las tareas).
Dentro de la ventana de listar se puede cambiar el estado de una tarea a `completada` si esta tiene el estado pendiente. Y también se puede `eliminar` una tarea.

Para generar el listado de tareas se llama al endpoint `jsonplaceholder.typicode.com/todos` y se obtienen los `id` y los `nombres` de las tareas la primera vez que se accede a la aplicación, y con la librería `Faker.js` se generan de manera aleatoria los demás datos, como lo son: `fecha límite`, se agrega una lista de mínimo una persona asociada con los campos: `nombre`, `edad` y `habilidades` generadas de manera aleatoria con `Faker` también.

Se implementó un componente `standalone` para solo cargarlo cuando sea necesario, se implementó también el `localStorage`, para manejar una especie de 'back-end' desde el `front-end`, para así poder un seguimiento de las distintas tareas agregadas, editadas, eliminadas del sistema.

## Funcionalidades extra
- Se implementó `mobile-first`.
- Se implementó `i18n` (internacionalización), para permitir al usuario visualizar el proyecto en `inglés` y `español`.
- Cambio de tema, el usuario puede cambiar de `tema claro` a `tema oscuro` con un click.
- Se implementó `Tailwind` para reducir el uso de CSS.
- Se implementó `ESLint` con un par de reglas configuradas para implementar buenas prácticas de programación.

## ¿Cómo correr los tests?

Con el comando `ng test` se ejecutan los tests con [Karma](https://karma-runner.github.io). Sin embargo, por falta de tiempo y un error de configuración del entorno, no pude testear la aplicación.


## Proyecto realizado por:
### Miguel Angel Lombardi Güette
Desarrollador Semi-Senior Front End

mianlogu21@gmail.com  - 3002828171
## SUSTENTACIÓN YOUTUBE
https://youtu.be/sKY_lrxSfss
