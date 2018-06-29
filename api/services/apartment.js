import { roundToTwo } from '../utils/mathematical'

var getRandom = (index, masonry, floors, zone) => {
    var posicion = parseInt(index)
    var piso = floors
    var material = masonry
    var zona = zone
    
    var valale = new Float32Array([.05, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7]);

	var M = new Float32Array([0, 4.01, 4.18, 4.64, 5.19, 5.38]);
	var A = new Float32Array([0, 3.68, 3.71, 3.80, 3.91, 3.95]);
	var samax = new Float32Array([0, 1.537, 1.003, .745, .572, .440]);
	var T0 = new Float32Array([0, .08, .12, .17, .22, .27]);

	var M3 = new Float32Array([0, 4.28, 4.39, 4.83, 5.51, 6.37]);
	var A3 = new Float32Array([0, 3.73, 3.75, 3.84, 3.97, 4.15]);
	var samax3 = new Float32Array([0, 1.84, 1.15, .83, .64, .52]);
	var T03 = new Float32Array([0, .08, .13, .18, .23, .28]);


	var c = new Float32Array([0, .08, .16, .2]);
	var a0 = new Float32Array([0, .02, .04, .05]);
	var ta = new Float32Array([0, .2, .3, .6]);
	var tb = new Float32Array([0, .6, 1.5, 2.9]);
	var r = new Float32Array([0, .5, .66, 1]);
	

	if (material == 3) {
		if (0 <= T03[piso] && T03[piso] <= ta[zona]) {
			var valorI = (a0[zona] + (c[zona] - a0[zona])) * (T03[piso] / ta[zona]);
		}
		else if (ta[zona] < T03[piso] && T03[piso] <= tb[zona]) {
			var valorI = c[zona];
		}
		else {
			var valorI = Math.pow((tb[zona] / T03[piso]), r[zona]) * c[zona];
		}

		var valor = (1 - Math.exp(((-1 * A3[piso]) * Math.pow((valale[posicion] / samax3[piso]), M3[piso]))));
		var InD = (1 - Math.exp(((-1 * A3[piso]) * Math.pow((valorI / samax3[piso]), M3[piso]))));
	}
	else if (material == 2) {
		if (0 <= T0[piso] && T0[piso] <= ta[zona]) {
			var valorI = (a0[zona] + (c[zona] - a0[zona])) * (T0[piso] / ta[zona]);
		}
		else if (ta[zona] < T0[piso] && T03[piso] <= tb[zona]) {
			var valorI = c[zona];
		}
		else {
            var valorI = Math.pow((tb[zona] / T0[piso]), r[zona]) * c[zona];
		}
		var valor = (1 - Math.exp(((-1 * A[piso]) * Math.pow((valale[posicion] / samax[piso]), M[piso]))));
		var InD = (1 - Math.exp(((-1 * A[piso]) * Math.pow((valorI / samax[piso]), M[piso]))));
	}

	return Math.round(valor * 10000) / 10000;
}

var getZona = (posicion, zone) => {

	var tiempo = new Float32Array([.05, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.8, 5]);
	var zona = zone;

	var c = new Float32Array([0, .08, .16, .2]);
	var a0 = new Float32Array([0, .02, .04, .05]);
	var ta = new Float32Array([0, .2, .3, .6]);
	var tb = new Float32Array([0, .6, 1.5, 2.9]);
	var r = new Float32Array([0, .5, .66, 1]);


	if (0 <= tiempo[posicion] && tiempo[posicion] <= ta[zona]) {
		var valor = (a0[zona] + (c[zona] - a0[zona])) * (tiempo[posicion] / ta[zona]);
	}
	else if (ta[zona] < tiempo[posicion] && tiempo[posicion] <= tb[zona]) {
		var valor = c[zona];
	}
	else {
		var valor = Math.pow((tb[zona] / tiempo[posicion]), r[zona]) * c[zona];
	}

	return Math.round(valor * 10000) / 10000;
}

var vulnerabilityGraphService = (masonry, floors, zone) => {
    var simulations = []
    var simulation_initial = .1
    var simulation_step = .1
    for (var i = 0; i < 17; i++) {
        simulations.push({ simulation: roundToTwo(simulation_initial), vulnerability: getRandom(i + 1, masonry, floors, zone) })
        simulation_initial += simulation_step
    }

    return simulations
}

var spectrumGraphService = (zone) => {
    return [
		{ simulation: .05, spectrum: getZona(0, zone) },
		{ simulation: .1, spectrum: getZona(1, zone) },
		{ simulation: .2, spectrum: getZona(2, zone) },
		{ simulation: .3, spectrum: getZona(3, zone) },
		{ simulation: .4, spectrum: getZona(4, zone) },
		{ simulation: .5, spectrum: getZona(5, zone) },
		{ simulation: .6, spectrum: getZona(6, zone) },
		{ simulation: .7, spectrum: getZona(7, zone) },
		{ simulation: .8, spectrum: getZona(8, zone) },
		{ simulation: .9, spectrum: getZona(9, zone) },
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
		{ simulation: 5, spectrum: getZona(34, zone) }
	];
}

export { vulnerabilityGraphService, spectrumGraphService }