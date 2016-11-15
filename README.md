# ResearchHub

* ResearchHub is built with Angular 2.
* The user interface is built with the [Materialize CSS framework](http://materializecss.com/).
* This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.15.

## Development
This section explains how to develop code for the Research Hub.

### Environment setup
Install [Node 4](https://nodejs.org/en/download/) or higher with NPM 3 or higher.

Install angular-cli
```bash
npm install -g angular-cli
```

### Development server
Navigate to project directory, e.g:
```bash
cd ~/workspace/research-hub
```

Update dependencies:
```bash
npm install
```

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). 
Before running the tests make sure you are serving the app via `ng serve`.

### Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment
This section explains how to deploy the Research Hub to production.

## Deploying to Github Pages
Run `ng github-pages:deploy` to deploy to Github Pages.

## Deploying to the Research Hub server
The Research Hub is build with the angular-cli and hosted on an Apache Http
server in a Docker container.

### Prerequisites
Install git, curl and build-essential (so you can compile native npm extensions).
```bash
sudo apt-get install git curl build-essential
```

Setup the University of Auckand web proxy.
```bash
export http_proxy=http://squid.auckland.ac.nz:3128
export https_proxy=http://squid.auckland.ac.nz:3128
```

Install [Node v4](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).
```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs
```

Setup University of Auckand web proxy for npm and update npm to the latest version.
```bash
sudo npm config set proxy http://squid.auckland.ac.nz:3128
sudo npm config set https-proxy http://squid.auckland.ac.nz:3128
sudo npm install -g npm
```

Install the [angular-cli](https://github.com/angular/angular-cli) for Angular 2. --unsafe-perm was needed otherwise angular-cli failed...
```bash
sudo npm install --unsafe-perm -g angular-cli
```

Install Docker by following [these instructions](https://docs.docker.com/engine/installation/linux/ubuntulinux/).

### Deployment
Clone the research-hub repository.
```bash
git clone https://github.com/UoA-eResearch/research-hub.git
```

Build the Docker container.
```bash
cd research-hub
docker build -t research-hub .
```

Run the Docker container.
```bash
docker run --restart=always -p 80:80 443:443 -d research-hub
```
