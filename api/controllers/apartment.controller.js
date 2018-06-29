import { vulnerabilityGraphService } from '../services/apartment'

var getVulnerabilityGraphData = ({masonry, floors, zone}) => {
    return vulnerabilityGraphService(masonry, floors, zone)
}

export { getVulnerabilityGraphData }