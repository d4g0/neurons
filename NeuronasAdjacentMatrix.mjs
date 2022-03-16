import Neurona from "./Neurona.mjs";

export default class AdjacentMatrix {

    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    addNode(node) {
        // save the node
        this.nodes.push(node)

        // handle edges
        const edgesLength = this.edges.length;

        // case empty
        if (edgesLength < 1) {
            this.edges.push([]);
        }

        // case has nodes and edges
        // redimensionate the edges with defaul value (0)
        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i].push(0)
        }

        // append new vector with new size to append to edges
        const defaultVector = vectorFrom(edgesLength + 1, 0);
        this.edges.push(defaultVector);
    }

    connect(nodeA, nodeB, weight = 1) {

        // console.log(`
        // (connect) nA: ${nodeA.id} , nB: ${nodeB.id}
        // `)
        // validate
        // if (!isInNeuronas(this.nodes, nodeA)) {
        //     throw new Error(`NodeA argument it dosen't exists`);
        // }
        // if (!isInNeuronas(this.nodes, nodeB)) {
        //     throw new Error(`NodeB argument it dosen't exists`);
        // }

        const nodeAPos = this.nodes.indexOf(nodeA);
        const nodeBPos = this.nodes.indexOf(nodeB);
        // make link
        this.edges[nodeAPos][nodeBPos] = weight;
    }

    getAdjcents(node) {

        // if (!isInNeuronas(this.nodes, node)) {
        //     throw new Error(`Some node argument it dosen't exists`);
        // }

        const adjacents = [];
        const nodePos = search(node, this.nodes);
        const nodeEdges = this.edges[nodePos];

        // collect adjacents 
        for (let i = 0; i < nodeEdges.length; i++) {
            // if there is a link
            if (nodeEdges[i] > 0) {
                adjacents.push(this.nodes[i]);
            }

        }

        return adjacents;
    }

    getByPos(position = 0) {
        return this.nodes[position];
    }

    getPositionOf(neurona) {

        if (!(neurona.constructor == Neurona)) {
            throw new Error(`Neurona is not Neurona type. neurona:${neurona}`);
        }
        var position = search(neurona, this.nodes);
        return position;
    }

    /**
     * For Neuronas only
     * BreadthFirstSearch (a lo ancho) 
     * Returns an array with the result
     * Firts node based search
     */
    breadthFitstSearch(neurona) {

        // visited queque
        var visited = [];

        const auxBreadFirstSearch = (neurona) => {

            const searchQueque = [];
            visited.push(neurona);
            searchQueque.push(neurona);

            while (searchQueque.length > 0) {

                const tempNeurona = searchQueque.shift();


                const adjacents = this.getAdjcents(tempNeurona);



                for (let i = 0; i < adjacents.length; i++) {
                    // if node is not visited
                    if (!(isInNeuronas(visited, adjacents[i]))) {
                        visited.push(adjacents[i]);
                        searchQueque.push(adjacents[i]);
                    }

                }

            }
        }


        // general case no node provided
        if (!neurona) {
            for (let i = 0; i < this.nodes.length; i++) {
                // if node is not visited
                if (!isInNeuronas(visited, this.nodes[i])) {
                    auxBreadFirstSearch(this.nodes[i]);
                }
            }
        }
        // particular neurona case
        else {
            auxBreadFirstSearch(neurona);
        }

        return visited;
    }

    getNeuronasInfluyentes() {
        var influyentes = [];
        for (let i = 0; i < this.nodes.length; i++) {
            if (isInfluyente(this.nodes[i], this.getAdjcents.bind(this))) {
                influyentes.push(this.nodes[i]);
            }
        }
        return influyentes;
    }

    thereIsComunication(nA, nB) {
        var thereIsComunicationPath = true;
        // validate
        if (!isInNeuronas(this.nodes, nA)) {
            throw new Error(`Node argument it dosen't exists`);
        }
        if (!isInNeuronas(this.nodes, nB)) {
            throw new Error(`Node argument it dosen't exists`);
        }

        const adjacentsA = this.breadthFitstSearch(nA);
        const adjacentsB = this.breadthFitstSearch(nB);

        // console.log('adjA');
        // console.table(adjacentsA);
        // console.log('adjB');
        // console.table(adjacentsB)
        // console.log({
        //     foundAinAdjB: search(nA, adjacentsB) > -1,
        //     foundBinAdjA: search(nB, adjacentsA) > -1,
        // })
        // search if they match in their respective  breadhtFirstGraph
        if (!(search(nA, adjacentsB) > -1 && search(nB, adjacentsA) > -1)) {
            thereIsComunicationPath = false;
            return thereIsComunicationPath;
        }
        // if they match then check there is enought activation state in the path
        // check path A
        for (let i = 0; i < adjacentsA.length; i++) {
            if (adjacentsA[i].getActivationState() < 0) {
                thereIsComunicationPath = false;
                return thereIsComunicationPath;

            }
        }
        // check path B
        for (let i = 0; i < adjacentsB.length; i++) {
            if (adjacentsB[i].getActivationState() < 0) {
                thereIsComunicationPath = false;
                return thereIsComunicationPath;

            }
        }

        return thereIsComunicationPath;
    }
}


// ---------------
// Utility fns 
// ---------------
function vectorFrom(length, placeholder = 0) {
    var vector = [];
    for (let i = 0; i < length; i++) {
        vector.push(placeholder);
    }
    return vector;
}

export function isInNeuronas(neuronas = [], neuronaToCheck) {

    var isIn = false;
    // console.log('(isInNeuronas)',{
    //     neuronas
    // })
    // neuronas has to have an unique id
    for (let i = 0; i < neuronas.length; i++) {
        if (neuronaToCheck.id == neuronas[i].id) {
            isIn = true;
            break;
        }
    }
    return isIn;
}

function search(neurona, neuronasList = []) {

    // console.log(neurona,typeof neurona.isEqual)

    for (let i = 0; i < neuronasList.length; i++) {

        // console.log(neuronasList[i],typeof neuronasList[i].isEqual)

        if (neurona.isEqual(neuronasList[i])) {
            return i;
        }
    }
    return -1;
}

function isInfluyente(neurona = new Neurona('', 0), getAdjacents = () => { }) {

    var isNeuronaInfluyente = true;

    const adjcents = getAdjacents(neurona);

    // check first condition ( have more then 2 adjacents)
    if (!(adjcents.length > 2)) {
        // end and say is not
        isNeuronaInfluyente = false;
    } else {
        // check 2nd condition (have higher activation state then his adjacents)
        var activationState = neurona.getActivationState();
        for (let i = 0; i < adjcents.length; i++) {
            if (adjcents[i].getActivationState() > activationState) {
                isNeuronaInfluyente = false;
                break;
            }
        }
    }
    return isNeuronaInfluyente;
}