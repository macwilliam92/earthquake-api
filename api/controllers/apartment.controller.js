import { vulnerabilityGraphService, spectrumGraphService, analysisStatsService } from '../services/apartment'

var getVulnerabilityGraphData = ({masonry, floors, zone}) => {
    return vulnerabilityGraphService(masonry, floors, zone)
}

var getVulnerabilityStats = ({masonry, floors, zone, number, meters}) => {
    return analysisStatsService(masonry, floors, zone, number, meters)
}

var getSpectrumGraphData = ({zone}) => {
    return spectrumGraphService(zone)
}

export { getVulnerabilityGraphData, getSpectrumGraphData, getVulnerabilityStats }