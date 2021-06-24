// packages
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';
import koii from 'koii';

// local imports
import routes from './routes/index';
import swaggerSpec from '../documentation/swagger.json';
import middlewares from './middlewares';

// variables
dotenv.config();
const baseUrl = '/v1';
const port = process.env.PORT || 3000;

// removes whitespace from payload
const { trimmerMiddleware } = middlewares;

const app = express();

// Express inbuilt body parser
app.use(express.json());
app.use(trimmerMiddleware);
app.use(cors());
app.use(compression()); // Compress all routes
app.use(helmet()); // Security middleware

app.get(`${baseUrl}/doc`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes with base URl
app.use(`${baseUrl}`, routes);
app.use(`${baseUrl}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to TAIKAI');
});

// displays endpoints when the server starts
app.use(koii);

// catch invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

// eslint-disable-next-line no-console
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}...`));
}

export default app;
