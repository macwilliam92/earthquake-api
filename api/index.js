import { Router } from 'express';
import { version } from '../../package.json';
import apartmentRoutes from './routes/apartment.routes';
import buildingRoutes from './routes/building.routes';

export default ({ config, db }) => {
  const api = Router();

  // expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  api.use('/', apartmentRoutes);
  api.use('/', buildingRoutes);

  return api;
};
