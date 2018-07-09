import { roundToTwo } from '../utils/mathematical';

const getRandom = (index, masonry, floors) => {
  const posicion = parseInt(index, 10);
  const piso = parseInt(floors, 10);
  const material = parseInt(masonry, 10);

  const valale = new Float32Array(
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7],
  );

  const M = new Float32Array([0, 4.01, 4.18, 4.64, 5.19, 5.38]);
  const A = new Float32Array([0, 3.68, 3.71, 3.80, 3.91, 3.95]);
  const samax = new Float32Array([0, 1.537, 1.003, 0.745, 0.572, 0.440]);

  const M3 = new Float32Array([0, 4.28, 4.39, 4.83, 5.51, 6.37]);
  const A3 = new Float32Array([0, 3.73, 3.75, 3.84, 3.97, 4.15]);
  const samax3 = new Float32Array([0, 1.84, 1.15, 0.83, 0.64, 0.52]);

  let valor;

  if (material === 3) {
    valor = (1
      - Math.exp(((-1 * A3[piso]) * Math.pow((valale[posicion] / samax3[piso]), M3[piso]))));
  } else if (material === 2) {
    valor = (1 - Math.exp(((-1 * A[piso]) * Math.pow((valale[posicion] / samax[piso]), M[piso]))));
  }

  return Math.round(valor * 10000) / 10000;
};

const getVulnerabilityInd = (masonry, floors, zone) => {
  const piso = parseInt(floors, 10);
  const material = parseInt(masonry, 10);
  const zona = parseInt(zone, 10);

  const M = new Float32Array([0, 4.01, 4.18, 4.64, 5.19, 5.38]);
  const A = new Float32Array([0, 3.68, 3.71, 3.80, 3.91, 3.95]);
  const samax = new Float32Array([0, 1.537, 1.003, 0.745, 0.572, 0.440]);
  const T0 = new Float32Array([0, 0.08, 0.12, 0.17, 0.22, 0.27]);

  const M3 = new Float32Array([0, 4.28, 4.39, 4.83, 5.51, 6.37]);
  const A3 = new Float32Array([0, 3.73, 3.75, 3.84, 3.97, 4.15]);
  const samax3 = new Float32Array([0, 1.84, 1.15, 0.83, 0.64, 0.52]);
  const T03 = new Float32Array([0, 0.08, 0.13, 0.18, 0.23, 0.28]);


  const c = new Float32Array([0, 0.08, 0.16, 0.2]);
  const a0 = new Float32Array([0, 0.02, 0.04, 0.05]);
  const ta = new Float32Array([0, 0.2, 0.3, 0.6]);
  const tb = new Float32Array([0, 0.6, 1.5, 2.9]);
  const r = new Float32Array([0, 0.5, 0.66, 1]);

  let valorI;
  let InD;

  if (material === 3) {
    if (T03[piso] >= 0 && T03[piso] <= ta[zona]) {
      valorI = (a0[zona] + (c[zona] - a0[zona])) * (T03[piso] / ta[zona]);
    } else if (ta[zona] < T03[piso] && T03[piso] <= tb[zona]) {
      valorI = c[zona];
    } else {
      valorI = Math.pow((tb[zona] / T03[piso]), r[zona]) * c[zona];
    }

    InD = (1 - Math.exp(((-1 * A3[piso]) * Math.pow((valorI / samax3[piso]), M3[piso]))));
  } else if (material === 2) {
    if (T0[piso] >= 0 && T0[piso] <= ta[zona]) {
      valorI = (a0[zona] + (c[zona] - a0[zona])) * (T0[piso] / ta[zona]);
    } else if (ta[zona] < T0[piso] && T03[piso] <= tb[zona]) {
      valorI = c[zona];
    } else {
      valorI = Math.pow((tb[zona] / T0[piso]), r[zona]) * c[zona];
    }

    InD = (1 - Math.exp(((-1 * A[piso]) * Math.pow((valorI / samax[piso]), M[piso]))));
  }

  return InD;
};

const getZona = (posicion, zone) => {
  const tiempo = new Float32Array(
    [0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
      1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.4,
      2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5],
  );
  const zona = zone;

  const c = new Float32Array([0, 0.08, 0.16, 0.2]);
  const a0 = new Float32Array([0, 0.02, 0.04, 0.05]);
  const ta = new Float32Array([0, 0.2, 0.3, 0.6]);
  const tb = new Float32Array([0, 0.6, 1.5, 2.9]);
  const r = new Float32Array([0, 0.5, 0.66, 1]);

  let valor;

  if (tiempo[posicion] >= 0 && tiempo[posicion] <= ta[zona]) {
    valor = (a0[zona] + (c[zona] - a0[zona])) * (tiempo[posicion] / ta[zona]);
  } else if (ta[zona] < tiempo[posicion] && tiempo[posicion] <= tb[zona]) {
    valor = c[zona];
  } else {
    valor = Math.pow((tb[zona] / tiempo[posicion]), r[zona]) * c[zona];
  }

  return Math.round(valor * 10000) / 10000;
};

const vulnerabilityGraphService = (masonry, floors, zone) => {
  const simulations = [];
  let simulationInitial = 0.1;
  const simulationStep = 0.1;
  for (let i = 0; i < 17; i += 1) {
    simulations.push({
      simulation: roundToTwo(simulationInitial),
      vulnerability: getRandom(i + 1, masonry, floors),
    });
    simulationInitial += simulationStep;
  }

  return simulations;
};

const spectrumGraphService = zone => [
  { simulation: 0.05, spectrum: getZona(0, zone) },
  { simulation: 0.1, spectrum: getZona(1, zone) },
  { simulation: 0.2, spectrum: getZona(2, zone) },
  { simulation: 0.3, spectrum: getZona(3, zone) },
  { simulation: 0.4, spectrum: getZona(4, zone) },
  { simulation: 0.5, spectrum: getZona(5, zone) },
  { simulation: 0.6, spectrum: getZona(6, zone) },
  { simulation: 0.7, spectrum: getZona(7, zone) },
  { simulation: 0.8, spectrum: getZona(8, zone) },
  { simulation: 0.9, spectrum: getZona(9, zone) },
  { simulation: 1, spectrum: getZona(10, zone) },
  { simulation: 1.2, spectrum: getZona(11, zone) },
  { simulation: 1.3, spectrum: getZona(12, zone) },
  { simulation: 1.4, spectrum: getZona(13, zone) },
  { simulation: 1.5, spectrum: getZona(14, zone) },
  { simulation: 1.6, spectrum: getZona(15, zone) },
  { simulation: 1.7, spectrum: getZona(16, zone) },
  { simulation: 1.8, spectrum: getZona(17, zone) },
  { simulation: 1.9, spectrum: getZona(18, zone) },
  { simulation: 2, spectrum: getZona(19, zone) },
  { simulation: 2.2, spectrum: getZona(20, zone) },
  { simulation: 2.4, spectrum: getZona(21, zone) },
  { simulation: 2.6, spectrum: getZona(22, zone) },
  { simulation: 2.8, spectrum: getZona(23, zone) },
  { simulation: 3, spectrum: getZona(24, zone) },
  { simulation: 3.2, spectrum: getZona(25, zone) },
  { simulation: 3.4, spectrum: getZona(26, zone) },
  { simulation: 3.6, spectrum: getZona(27, zone) },
  { simulation: 3.8, spectrum: getZona(28, zone) },
  { simulation: 4, spectrum: getZona(29, zone) },
  { simulation: 4.2, spectrum: getZona(30, zone) },
  { simulation: 4.4, spectrum: getZona(31, zone) },
  { simulation: 4.6, spectrum: getZona(32, zone) },
  { simulation: 4.8, spectrum: getZona(33, zone) },
  { simulation: 5, spectrum: getZona(34, zone) },
];

const analysisStatsService = (masonry, floors, zone, number, meters) => {
  const InD = getVulnerabilityInd(masonry, floors, zone);

  const result = { ind: InD };

  if (InD === 0) {
    result.nd = 'NULO';
    result.nv = 'NULA';
    result.nvCm2 = 8244;
    result.cost = InD * 8244 * number * meters;
  } else if ((InD > 0) && (InD <= 0.1)) {
    result.nd = 'LIGERO';
    result.nv = 'BAJA';
    result.nvCm2 = 8244;
    result.cost = InD * 8244 * number * meters;
  } else if ((InD > 0.1) && (InD <= 0.15)) {
    result.nd = 'MEDIO';
    result.nv = 'MEDIA';
    result.nvCm2 = 8244;
    result.cost = InD * 8244 * number * meters;
  } else if ((InD > 0.15) && (InD <= 0.35)) {
    result.nd = 'SEVERO';
    result.nv = 'ALTA';
    result.nvCm2 = 8244;
    result.cost = InD * 8244 * number * meters;
  } else {
    result.nd = 'TOTAL';
    result.nv = 'MUY ALTA';
    result.nvCm2 = 8244;
    result.cost = InD * 8244 * number * meters;
  }

  return result;
};

export { vulnerabilityGraphService, spectrumGraphService, analysisStatsService };
