import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { logRequest, handleError } from './middleware.js';
import { logger } from './utils.js';
import controllers from './controllers/index.js';

dotenv.config();

const config = {
    host: process.env.LISTEN_HOST || 'localhost',
    port: process.env.LISTEN_PORT || 3000,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logRequest(logger));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'static')));

controllers.forEach(controller => controller(app));

app.use(handleError(logger));

app.listen(config.port, config.host, () => {
    logger.info(`Server listening at http://${config.host}:${config.port}`);
});
