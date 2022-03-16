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

        if (!checkIfNodesExists(this.nodes, [nodeA, nodeB])) {
            throw new Error(`Some node argument it dosen't exists`);
        }

        const nodeAPos = this.nodes.indexOf(nodeA);
        const nodeBPos = this.nodes.indexOf(nodeB);
        // make link
        this.edges[nodeAPos][nodeBPos] = weight;
    }

    getAdjcents(node) {

        if (!checkIfNodesExists(this.nodes, [node])) {
            throw new Error(`Some node argument it dosen't exists`);
        }

        const adjacents = [];
        const nodePos = this.nodes.indexOf(node);
        const nodeEdges = this.edges[nodePos];

        // collect adjacents 
        for (let i = 0; i < nodeEdges.length; i++) {
            // if there is a link
            if (nodeEdges[i] > 0) {
                adjacents.push(i);
            }

        }

        return adjacents;
    }

    /**
     * BreadthFirstSearch (a lo ancho)
     * Returns an array with the result
     * Firts node based search
     */
    breadthFitstSearch(node) {

        // visited queque
        var visited = [];

        const auxBreadFirstSearch = (node) => {
            const searchQueque = [];
            visited.push(node);
            searchQueque.push(node);

            while (searchQueque.length > 0) {
                const tempNode = searchQueque.shift();
                const adjacents = this.getAdjcents(tempNode);
                adjacents.forEach(node => {
                    // if node is not visited
                    if (visited.indexOf(node) < 0) {
                        visited.push(node);
                        searchQueque.push(node);
                    }
                })

            }
        }


        // general case no node provided
        if (!node) {
            for (let i = 0; i < this.nodes.length; i++) {
                // if node is not visited
                if (visited.indexOf(this.nodes[i]) < 0) {
                    auxBreadFirstSearch(this.nodes[i]);
                }
            }
        }
        // particular node case
        else {
            auxBreadFirstSearch(node);
        }

        return visited;
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

function checkIfNodesExists(nodesSource = [], nodesToCheck = []) {
    // check params types to array TODO
    var someWasNotFound = false;
    for (let i = 0; i < nodesToCheck.length; i++) {
        if (
            nodesSource.indexOf(nodesToCheck[i]) < 0
        ) {
            someWasNotFound = true;
        }
        break;
    }

    return someWasNotFound ? false : true;
}