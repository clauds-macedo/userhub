import { Express } from 'express';
import { readFileSync } from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

const swaggerFilePath = path.join(__dirname, 'doc.json');
const swaggerDocs = JSON.parse(readFileSync(swaggerFilePath, 'utf-8'));

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
