import { vulnerabilityGraphService } from '../services/building';

const getVulnerabilityGraphData = ({ floor }) => vulnerabilityGraphService(floor);

export { getVulnerabilityGraphData };
