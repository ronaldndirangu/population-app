import express from 'express';
import http from 'http';
import morgan from 'morgan';
import debug from 'debug';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './modules';

dotenv.config();

const logger = debug('log');
const app = express();
const server = http.createServer(app);


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => logger('You are now connected to Mongo!'))
  .catch((err) => {
    logger('Something went wrong');
    throw err;
  });

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


routes(app);


app.all('*', (req, res) => {
  res.status(200).send('URL not found');
});

server.listen(5000, () => {
  logger('Server started on port 5000');
});

export default app;
