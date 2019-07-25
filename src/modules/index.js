import authRouter from './auth';
import LocationRouter from './location';

const apiPrefix = '/api/v1';

const routes = (app) => {
  app.use(apiPrefix, authRouter);
  app.use(apiPrefix, LocationRouter);
};

export default routes;
