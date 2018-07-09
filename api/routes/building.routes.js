import { Router } from 'express';
import { getVulnerabilityGraphData } from '../controllers/building.controller';

const router = Router();

router.get('/building/vulnerability-graph', ({ query }, res) => {
  res.json(getVulnerabilityGraphData(query));
});

export default router;
