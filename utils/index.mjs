import Neurona from "../Neurona.mjs";

export function randomnElementFrom(array) {
    const length = array.length;
    const randomPos = Number.parseInt(Math.random() * length);
    return array[randomPos];
}

export function neuronasFrom(length = 0, types = ['type']) {
    var neuronas = [];
    for (let i = 0; i < length; i++) {
        const randomType = randomnElementFrom(types);
        const randomActivationState = (Number.parseInt(Math.random() * 8)) - 1;
        neuronas.push(new Neurona(randomType, randomActivationState));
    }
    return neuronas;
}

const neuronalTypes = [
    'type-1',
    'type-2',
    'type-3',
    'type-4',
    'type-5',
]

export function createNeuronas(amount = 10) {
    var neuronas = neuronasFrom(amount, neuronalTypes);
    return neuronas;
}