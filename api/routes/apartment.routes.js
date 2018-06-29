import { Router } from 'express'
import { getVulnerabilityGraphData, getSpectrumGraphData} from '../controllers/apartment.controller'

let router = Router()

router.get('/apartment/vulnerability-graph', ({ query }, res) => {
    res.json(getVulnerabilityGraphData(query))
})

router.get('/apartment/spectrum-graph', ({ query }, res) => {
    res.json(getSpectrumGraphData(query))
})

export default router