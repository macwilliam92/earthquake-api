import { Router } from 'express';
import { getVulnerabilityGraphData, getSpectrumGraphData } from '../controllers/building.controller';

const router = Router();

router.get('/building/vulnerability-graph', ({ query }, res) => {
  res.json(getVulnerabilityGraphData(query));
});

router.get('/building/spectrum-graph', ({ query }, res) => {
  res.json(getSpectrumGraphData(query));
});

export default router;
