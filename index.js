import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './src/routes';
import logger from './src/utils/logger';

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

app.listen(1234, () => {
  console.log('Listening on port 1234 ');
});

