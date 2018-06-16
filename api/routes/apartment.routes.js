import { Router } from 'express'
import { getVulnerabilityGraphData } from '../controllers/apartment.controller'

let router = Router()

router.get('/apartment/vulnerability-graph', (req, res) => {
    res.json(getVulnerabilityGraphData())
})

export default router