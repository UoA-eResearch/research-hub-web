# ResearchHub

## Developing

Start by cloning the `research-hub-deploy` project and follow steps 1 and 2 in the [README](https://github.com/UoA-eResearch/research-hub-deploy).

```bash
git clone https://github.com/UoA-eResearch/research-hub-deploy
```

To experience the full functionality of the app, you also need to run research-hub-api and research-hub-db whilst developing. Follow the instructions on the following pages:

* [research-hub-db](https://github.com/UoA-eResearch/research-hub-db): run the database using Docker
* [research-hub-api](https://github.com/UoA-eResearch/research-hub-api): run the api directly with Maven or via the IntelliJ IDE

Navigate to the research-hub-web folder:
```bash
cd research-hub-deploy/build/research-hub-web
```

Install dependencies:
```bash
npm install
```

Then run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

To test run the app in production mode, run `npm run test-prod`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Build production and visualise components & dependencies

Run `npm run build-prod` to build the project in production mode.

After the build finishes, run `npm run bundle-report` to view a visualisation of all of the components
and dependencies of your app.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
