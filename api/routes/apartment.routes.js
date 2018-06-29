import { Router } from 'express'
import { getVulnerabilityGraphData } from '../controllers/apartment.controller'

let router = Router()

router.get('/apartment/vulnerability-graph', ({ query }, res) => {
    res.json(getVulnerabilityGraphData(query))
})

export default router