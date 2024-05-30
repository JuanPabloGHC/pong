# Pong

## Author

Juan Pablo Gómez Haro Cabrera

## Technologies

[TypeScript](https://www.typescriptlang.org/)

[HTML](https://developer.mozilla.org/es/docs/Web/HTML)

[CSS](https://developer.mozilla.org/es/docs/Learn/Getting_started_with_the_web/CSS_basics)

[ANGULAR](https://angular.dev/)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Architecture

```plain
└──📁/src
   ├──📁/app
   │   ├──📁ball [ball.component]
   │   ├──📁footer [footer.component]
   │   ├──📁game [game.component]
   │   ├──📁paddle [paddle.component]
   │   ├──📁topbar [topbar.component]
   │   ├──📄[app.component]
   │   ├──📄ball.ts
   │   ├──📄[game.service]
   │   ├──📄game.ts
   │   └──📄player.ts
   │
   ├──📄index.html
   ├──📄main.ts
   └──📄styles.css
```

* .component
    * Includes the HTML, CSS, TYPESCRIPT and TEST files.
* .service
    * Inlcudes the service file with its test file
* Ball
    * The ball of the pong (a square)
* Paddle
    * The players (a rectangle)
* Game
    * The scene, the players information and buttons to pause/play and restart

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
