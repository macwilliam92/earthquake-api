import { roundToTwo } from '../utils/mathematical';

const getRandom = (index, floor) => {
  const valale = new Float32Array(
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
  );
  const piso = floor;
  const posicion = index;
  let valor;

  if ((piso > 1) && (piso <= 5)) {
    valor = (1 - Math.exp((36.20 * -1) * Math.pow(valale[posicion], 4.07))); // eslint-disable-line
  } else if ((piso > 5) && (piso <= 10)) {
    valor = (1 - Math.exp((50.50 * -1) * Math.pow(valale[posicion], 3.6))); // eslint-disable-line
  } else if ((piso > 10) && (piso <= 15)) {
    valor = (1 - Math.exp((18 * -1) * Math.pow(valale[posicion], 2.31))); // eslint-disable-line
  }

  return Math.round(valor * 10000) / 10000;
};

const getZone = (index, zone) => {
  const posicion = index;
  const zona = parseInt(zone, 10);

  const tiempo = new Float32Array(
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2,
      1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2,
      3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5],
  );

  const c = new Float32Array([0, 0.16, 0.32, 0.40]);
  const a0 = new Float32Array([0, 0.04, 0.08, 0.1]);
  const ta = new Float32Array([0, 0.2, 0.2, 0.53]);
  const tb = new Float32Array([0, 1.35, 1.35, 1.8]);
  const r = new Float32Array([0, 1, 1.33, 2]);

  let valor;

  if (tiempo[posicion] >= 0 && tiempo[posicion] <= ta[zona]) {
    valor = (a0[zona] + (c[zona] - a0[zona])) * (tiempo[posicion] / ta[zona]);
  } else if (ta[zona] < tiempo[posicion] && tiempo[posicion] <= tb[zona]) {
    valor = c[zona];
  } else {
    valor = Math.pow((tb[zona] / tiempo[posicion]), r[zona]) * c[zona]; // eslint-disable-line
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

const spectrumGraphService = zone => [
  { simulation: 0.05, spectrum: getZone(0, zone) },
  { simulation: 0.1, spectrum: getZone(1, zone) },
  { simulation: 0.2, spectrum: getZone(2, zone) },
  { simulation: 0.3, spectrum: getZone(3, zone) },
  { simulation: 0.4, spectrum: getZone(4, zone) },
  { simulation: 0.5, spectrum: getZone(5, zone) },
  { simulation: 0.6, spectrum: getZone(6, zone) },
  { simulation: 0.7, spectrum: getZone(7, zone) },
  { simulation: 0.8, spectrum: getZone(8, zone) },
  { simulation: 0.9, spectrum: getZone(9, zone) },
  { simulation: 1, spectrum: getZone(10, zone) },
  { simulation: 1.2, spectrum: getZone(11, zone) },
  { simulation: 1.3, spectrum: getZone(12, zone) },
  { simulation: 1.4, spectrum: getZone(13, zone) },
  { simulation: 1.5, spectrum: getZone(14, zone) },
  { simulation: 1.6, spectrum: getZone(15, zone) },
  { simulation: 1.7, spectrum: getZone(16, zone) },
  { simulation: 1.8, spectrum: getZone(17, zone) },
  { simulation: 1.9, spectrum: getZone(18, zone) },
  { simulation: 2, spectrum: getZone(19, zone) },
  { simulation: 2.2, spectrum: getZone(20, zone) },
  { simulation: 2.4, spectrum: getZone(21, zone) },
  { simulation: 2.6, spectrum: getZone(22, zone) },
  { simulation: 2.8, spectrum: getZone(23, zone) },
  { simulation: 3, spectrum: getZone(24, zone) },
  { simulation: 3.2, spectrum: getZone(25, zone) },
  { simulation: 3.4, spectrum: getZone(26, zone) },
  { simulation: 3.6, spectrum: getZone(27, zone) },
  { simulation: 3.8, spectrum: getZone(28, zone) },
  { simulation: 4, spectrum: getZone(29, zone) },
  { simulation: 4.2, spectrum: getZone(30, zone) },
  { simulation: 4.4, spectrum: getZone(31, zone) },
  { simulation: 4.6, spectrum: getZone(32, zone) },
  { simulation: 4.8, spectrum: getZone(33, zone) },
  { simulation: 5, spectrum: getZone(34, zone) },
];

export { vulnerabilityGraphService, spectrumGraphService };
