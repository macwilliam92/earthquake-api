import { vulnerabilityGraphService, spectrumGraphService } from '../services/apartment'

var getVulnerabilityGraphData = ({masonry, floors, zone}) => {
    return vulnerabilityGraphService(masonry, floors, zone)
}

var getSpectrumGraphData = ({zone}) => {
    return spectrumGraphService(zone)
}

export { getVulnerabilityGraphData, getSpectrumGraphData }