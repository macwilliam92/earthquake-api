import { vulnerabilityGraphService } from '../services/apartment'

var getVulnerabilityGraphData = () => {
    return vulnerabilityGraphService()
}

export { getVulnerabilityGraphData }