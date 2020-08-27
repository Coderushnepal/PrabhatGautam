import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './src/routes';
import logger from './src/utils/logger';
import genericErrorHandler from './src/middlewares/genericErrorHandler';

const appPort = 1234;

const loggingMiddleware = (req, res, next) => {
  const url = req.url;
  const method = req.method;

  logger.info(`${method} ${url}`);

  next();
}

const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(loggingMiddleware);
app.use(routes);
app.use(genericErrorHandler);

app.listen(appPort, () => {
  logger.info(`Listening on port ${appPort}`);
});

