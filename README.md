# battlecorp-mainsite

A react app to for the Battlecorp website.

## Installation

This repository is setup to handle development via Visual Studio Code on Windows.
https://code.visualstudio.com/

You need to have Docker engine running if you want to enable backend client auto compilation :
https://www.docker.com/

NodeJS & npm needs to be installed:
https://nodejs.org

Clone the repository via Git or GithubDesktop
https://git-scm.com/
https://desktop.github.com/

To install dependencies you need to run:

```bat
npm install
```

## Development

It's advised to link the app to a local backend server while tweaking.
Or at worst, the preproduction server.

See this repository for how to run the backend server locally :
https://github.com/Fedcom-Battlecorp/horizon-back

Start the application in development mode by running:

```bat
npm run dev
```

Or by using the provided launch.json file to launch debugs from VsCode UI.

## Backend client auto-generation

A prelaunch script ( swagger:prestart ) is setup on the run dev command.

It'll automatically try to update & recompile your local API client, if certain conditions are matched :
- Docker engine is running.
- http://localhost:3000/api-json is responding with an open api spec

The client is generated via a bat file: ./swagger/swagger_codegen_docker.bat, then packaged and installed with npm.

You can force the client update & recompilation by running:

```bat
npm run swagger:forcegen
```

## Environment

The app requires some local .env files to be setup:
- .env.local
- .env.preprod.local
- .env.production.local

Each will be selected with the 'mode' used while building the app.

```
PORT=__Server_Port__
VITE_ENV='development' || 'production'
VITE_API_URL=__API_URL__
VITE_WEB_BASE_URL=__WEB_BASE_URL__
VITE_ROUTE_PATH_HOME='/preprod/'
VITE_ROUTE_PATH_PASSWORD_RESET='/preprod/password-reset/'
VITE_ROUTE_PATH_EMAIL_VALIDATION='/preprod/email-validation/'
VITE_ROUTE_PATH_GAME='/preprod/game/'
VITE_ROUTE_PATH_GAME_PLAY='/preprod/game/play/'
```

## How to build / deploy

The app needs to be built before deploying, use those commands to select target mode:

*Preprod*:
```
npm run build:preprod
```

*Production*:
```
npm run build:production
```

Each will end up in a different /dist folder, that you need to deploy to the website FTP.