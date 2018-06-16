import { roundToTwo } from '../utils/mathematical'

var getRandom = (index) => {
    return Math.random() / index
}

var vulnerabilityGraphService = () => {
    var simulations = []
    var simulation_initial = .1
    var simulation_step = .1
    for (var i = 0; i < 17; i++) {
        simulations.push({ simulation: roundToTwo(simulation_initial), vulnerability: getRandom(i + 1) })
        simulation_initial += simulation_step
    }

    return simulations
}

export { vulnerabilityGraphService }