# A demo fullstack MERN-based web project
For creating and managing movie lists.

## Instructions
After you clone or download this repository from GitHub, run the following to install required NPM packages. You only need to do this once.

```bash
npm install
```

Before you can run this application, you need to create a configuration file named `.env` under the main folder of your repository. This file should be like:
```bash
APP_SECRET=SeCrEt
APP_DEPLOYMENT=local
DB_URL=mongodb://127.0.0.1:27017/db_name_goes_here
PORT=8080
```
You may change the values after the `=` sign to fit your application/situation; make sure no spaces are included. For the `APP_SECRET` variable, you may run the command below to generate a random secret key and replace `SeCrEt` with it. ***This file is meant to be local and will not be saved into GitHub when you commit and push your repository.***

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

To run the application, open two terminals. Under the first terminal, compile the front-end components in a development mode into the `public/` folder using the command:

```bash
npm run deploy
```

Under the second terminal, start the local development server using the command:

```bash
npm run server
```

Visit http://localhost:8080/ in the browser to view your application.

**NOTE**: To compile the front-end components in a production mode, use the command:

```bash
NODE_ENV=production npm run deploy
```
