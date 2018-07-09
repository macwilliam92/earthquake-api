import { roundToTwo } from '../utils/mathematical';

const getRandom = (index, floor) => {
  const valale = new Float32Array(
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
  );
  const piso = floor;
  const posicion = index;
  let valor;

  if ((piso > 1) && (piso <= 5)) {
    valor = (1 - Math.exp((36.20 * -1) * Math.pow(valale[posicion], 4.07)));
  } else if ((piso > 5) && (piso <= 10)) {
    valor = (1 - Math.exp((50.50 * -1) * Math.pow(valale[posicion], 3.6)));
  } else if ((piso > 10) && (piso <= 15)) {
    valor = (1 - Math.exp((18 * -1) * Math.pow(valale[posicion], 2.31)));
  }

  return Math.round(valor * 10000) / 10000;
};

const vulnerabilityGraphService = (floor) => {
  const simulations = [];
  let simulationInitial = 0.1;
  const simulationStep = 0.1;
  for (let i = 0; i < 17; i += 1) {
    simulations.push({
      simulation: roundToTwo(simulationInitial),
      vulnerability: getRandom(i + 1, floor),
    });
    simulationInitial += simulationStep;
  }

  return simulations;
};

export { vulnerabilityGraphService };
