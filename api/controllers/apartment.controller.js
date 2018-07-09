import { vulnerabilityGraphService, spectrumGraphService, analysisStatsService } from '../services/apartment';

const getVulnerabilityGraphData = ({
  masonry, floors, zone,
}) => vulnerabilityGraphService(masonry, floors, zone);

const getVulnerabilityStats = ({
  masonry, floors, zone, number, meters,
}) => analysisStatsService(masonry, floors, zone, number, meters);

const getSpectrumGraphData = ({ zone }) => spectrumGraphService(zone);

export { getVulnerabilityGraphData, getSpectrumGraphData, getVulnerabilityStats };
