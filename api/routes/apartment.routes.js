import { Router } from 'express'
import { getVulnerabilityGraphData, getSpectrumGraphData, getVulnerabilityStats } from '../controllers/apartment.controller'

let router = Router()

router.get('/apartment/vulnerability-graph', ({ query }, res) => {
    res.json(getVulnerabilityGraphData(query))
})

router.get('/apartment/vulnerability-stats', ({ query }, res) => {
    res.json(getVulnerabilityStats(query))
})

router.get('/apartment/spectrum-graph', ({ query }, res) => {
    res.json(getSpectrumGraphData(query))
})

export default router