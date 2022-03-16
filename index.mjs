import Neurona from "./Neurona.mjs";
import AdjacentMatrix from "./NeuronasAdjacentMatrix.mjs";

function ejercicio2() {

    // define neuronas like diagram/neuronasInfluyentes
    var n1 = new Neurona('type-1', 4);
    var n2 = new Neurona('type-2', 1);
    var n3 = new Neurona('type-3', 3);
    var n4 = new Neurona('type-4', 2);
    var n5 = new Neurona('type-5', 2);
    var n6 = new Neurona('type-6', 1);

    // init adjMtx
    var adM = new AdjacentMatrix();

    // push neurons
    adM.addNode(n1);
    adM.addNode(n2);
    adM.addNode(n3);
    adM.addNode(n4);
    adM.addNode(n5);
    adM.addNode(n6);

    // define contections like diagram
    adM.connect(n1, n2);
    adM.connect(n1, n3);
    adM.connect(n3, n4);
    adM.connect(n3, n5);
    adM.connect(n3, n6);

    // runInfluyentes n show results
    // expect influyentes = [n1, n3]
    console.log('--------------------------------------------');
    console.log("Ejercicio 2/insio a (neuronas influyentes)");
    console.log('--------------------------------------------');

    var influyentes = adM.getNeuronasInfluyentes();
    console.log("Neuronas like pictures/neruronasInfluyentes.jpeg");
    console.table(adM.nodes)
    console.log("Neuronas Influyentes");
    console.table(influyentes)
    console.log('--------------------------------------------');
}



function ejercicio3() {

    // define neuronas like diagram/neuronasInfluyentes
    var n1 = new Neurona('type-1', 4);
    var n2 = new Neurona('type-2', 1);
    var n3 = new Neurona('type-3', 3);
    var n4 = new Neurona('type-4', 2);
    var n5 = new Neurona('type-5', 2);
    var n6 = new Neurona('type-6', 1);

    // init adjMtx
    var adM = new AdjacentMatrix();

    // push neurons
    adM.addNode(n1);
    adM.addNode(n2);
    adM.addNode(n3);
    adM.addNode(n4);
    adM.addNode(n5);
    adM.addNode(n6);

    // define contections like diagram 
    // (pictures/neuronasCaminoDeComunicacion.jpeg)
    adM.connect(n1, n2);
    adM.connect(n1, n3);
    // 
    adM.connect(n3, n5);
    adM.connect(n3, n6);
    // 
    adM.connect(n5, n4);
    adM.connect(n4, n1);



    var thereIsPathFrom1to3 = adM.thereIsComunication(n1, n3);
    var thereIsPathFrom1to6 = adM.thereIsComunication(n1, n6);
    var result = [
        {
            testNodes: ' 1 and 3',
            result: thereIsPathFrom1to3
        },
        {
            testNodes: ' 1 and 6',
            result: thereIsPathFrom1to6
        },
    ]

    // ther n show results
    // expect thereIsComunication = true for 1 and 3; false for 1 and 6
    console.log('--------------------------------------------');
    console.log("Ejercicio 3/insio a (existe camino)");
    console.log('--------------------------------------------');
    console.log('Resultado');
    console.table(result);
    console.log('--------------------------------------------');


}









// run
ejercicio2();
ejercicio3();