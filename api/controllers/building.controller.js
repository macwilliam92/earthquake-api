import { vulnerabilityGraphService, spectrumGraphService } from '../services/building';

const getVulnerabilityGraphData = ({ floor }) => vulnerabilityGraphService(floor);

const getSpectrumGraphData = ({ zone }) => spectrumGraphService(zone);

export { getVulnerabilityGraphData, getSpectrumGraphData };
