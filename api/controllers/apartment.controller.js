import { vulnerabilityGraphService, spectrumGraphService, analysisStatsService } from '../services/apartment';

const getVulnerabilityGraphData = ({
  masonry, floors,
}) => vulnerabilityGraphService(masonry, floors);

const getVulnerabilityStats = ({
  masonry, floors, zone, number, meters,
}) => analysisStatsService(masonry, floors, zone, number, meters);

const getSpectrumGraphData = ({ zone }) => spectrumGraphService(zone);

export { getVulnerabilityGraphData, getSpectrumGraphData, getVulnerabilityStats };
