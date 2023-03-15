# Perceptron
// Definir un array para la variable 'weight'
let weight = new Array; 

// Definir variables de control
let E;
let ERROR;

// Array que contiene los valores deseados de salida
let desiredOutput = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1];

// La tabla de verdad utilizada para entrenar el perceptrón
const trueTable = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1] //->> X1
    ,[-1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1] //->> X2
    ,[-1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1] //->> X3
    ,[-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1] //->> X4
];

// Array para almacenar las respuestas del perceptrón
let response = [];

// Variable para contar los ciclos de entrenamiento
let counter;

// Umbral de disparo del perceptrón
let umbral = -1;

// Objeto que representa al perceptrón
let perceptron;

// Obtener elemento de la tabla del documento HTML
let table = document.getElementById("resultTable");

// Obtener elementos del documento HTML
const selectValue1=document.getElementById("valueV1");
const selectValue2=document.getElementById("valueV2");
const selectValue3=document.getElementById("valueV3");
const selectValue4=document.getElementById("valueV4");

function operation(index) {
// Calcula la suma ponderada de los valores verdaderos en la tabla y los pesos.
let sumproduct = (weight[0] * trueTable[0][index]) + (weight[1] * trueTable[1][index]) + (weight[2] * trueTable[2][index]) + (weight[3] * trueTable[3][index]);

// Aplica la función tangente hiperbólica y resta el error para ajustar la salida.
let y = Math.tanh(sumproduct) - ERROR;

// Si la salida es mayor o igual a cero, establece el valor de salida en uno. De lo contrario, establécelo en menos uno.
if (y >= 0) {
    y = 1;
} else {
    y = -1;
}

// Devuelve el valor de salida ajustado.
return y;

}

function operationTest(val1, val2, val3, val4) {
// Aplicación de la función de activación (tangente hiperbólica) a la sumatoria ponderada y se le resta el valor del error
let y = Math.tanh(sumproduct) - ERROR;

// Se imprimen los siguientes valores en consola: los pesos, el valor del error, la sumatoria ponderada y el resultado de la función de activación
console.log('pesos: ',weight);
console.log('Error: ',ERROR);
console.log('suma producto', sumproduct);
console.log('Y', y);

// Si el valor resultante de la función de activación es mayor o igual a cero, se asigna 1, de lo contrario, se asigna -1
if (y >= 0) {
    y = 1;
} else {
    y = -1;
}

// Finalmente, se retorna el valor procesado por la función de activación
return y;

}

function validateValue(index, value) {

//Se resta el valor deseado del valor real para calcular el error.
let error = (desiredOutput[index] - value);

//Si el error es igual a cero, entonces el valor es válido
if (error == 0) {
    return true;
} else {
    return false;
}

}

/**
 * Esta función recalcula los nuevos pesos de la neurona
 * @param {number} index - Índice del elemento en la tabla de verdad a procesar.
 */

function weightRecalculate(index) {

    let Y = desiredOutput[index];
    let X1 = trueTable[0][index];
    let X2 = trueTable[1][index];
    let X3 = trueTable[2][index];
    let X4 = trueTable[3][index];

    //Recalculo de todos los pesos (W) con respecto al índice actual

    weight[0] = weight[0] + (2 * E * Y * X1);
    weight[1] = weight[1] + (2 * E * Y * X2);
    weight[2] = weight[2] + (2 * E * Y * X3);
    weight[3] = weight[3] + (2 * E * Y * X4);

    //Recalculo del error para este índice

    ERROR = (ERROR + (2 * E * Y * umbral));

}


function viewResponse() {
    console.log("Response: ", response)
}

function viewWeight() {
    console.log("Weight: ", weight);
}

function useNeuralCase() {
    // Si el contador llega a 1000, entonces ya se hizo suficiente iteraciones de entrenamiento y la red se apaga
    if (counter >= 1000) {
        perceptron = false;
        return;
    }
    // Se incrementa el contador en cada iteración
    counter++;
    estado = true; // Se inicializa el estado como verdadero
    // Se recorre un bucle for para evaluar todas las posibles combinaciones de entrada
    for (let i = 0; i < 16; i++) {
        // Se obtiene la salida de la red para esta entrada y se guarda en 'y'
        let y = operation(i);
        // Si el valor obtenido no coincide con el valor esperado, se recalculan los pesos y se rompe el bucle
        if (validateValue(i, y) == false) {
            weightRecalculate(i);
            estado = false;
            response = [];
            break;
        }
        // Si el valor obtenido coincide con el valor esperado, se agrega al array de respuesta
        response.push(y);

    }
    // Si después de haber evaluado todas las entradas el estado todavía es falso,
    // significa que al menos un resultado fue incorrecto, por lo que se llama recursivamente la propia función hasta que todos los resultados sean correctos
    if (estado == false) {
        useNeuralCase();
    }

    return;
}


function addRowResponse() {
    // Para cada una de las 16 operaciones en la tabla verdadera:
    for (let i = 0; i < 16; i++) {
        // Se calcula el resultado de la operación:
        let operation = (Math.tanh(((weight[0] * trueTable[0][i]) + (weight[1] * trueTable[1][i]) + (weight[2] * trueTable[2][i]) + (weight[3] * trueTable[3][i]))) - ERROR)
        // Si el resultado es mayor a 0, entonces la salida es 1. De lo contrario, la salida es 0.
        let salida = ((operation >= 0)) ? 1 : 0;
        // Se inserta una fila en la tabla con todos los detalles de la operación:
        table.insertRow(-1).innerHTML =
            '<tr><th scope="row" class="text-center">' + (i + 1) + '</th><td class="text-center">' + trueTable[0][i] + '</td><td class="text-center">' + weight[0] + '</td><td class="text-center">' + trueTable[1][i] + '</td><td class="text-center"> ' + weight[1] + '</td><td class="text-center">' + trueTable[2][i] + '</td><td class="text-center">' + weight[2] + '</td><td class="text-center">' + trueTable[3][i] + '</td><td class="text-center">' + weight[3] + '</td><td class="text-center">' + ERROR + '</td><td class="text-center">' + salida + '</td></tr>';
    }
}


function addRowError() {
    table.insertRow(-1).innerHTML =
        '<tr><th class="text-center" colspan="11">NO SE ENCONTRÓ VALORES</th></tr>';
}

function initializeValues() {
    // Inicializa el contador en 0.
    counter = 0;
    
    // Define un arreglo vacío para almacenar los pesos de las neuronas.
    weight = [];
    
    // Define la variable "perceptron" como verdadera.
    perceptron = true;
    
    // Almacena en el arreglo "weight" los pesos establecidos por el usuario en los campos correspondientes del documento HTML.
    weight.push(parseFloat(document.getElementById("W1").value));
    weight.push(parseFloat(document.getElementById("W2").value));
    weight.push(parseFloat(document.getElementById("W3").value));
    weight.push(parseFloat(document.getElementById("W4").value));
    
    // Establece el valor de "E" (learning rate) según el valor definido por el usuario en el campo correspondiente del documento HTML.
    E = parseFloat(document.getElementById("E").value)
    
    // Establece el valor de "ERROR" (umbral de error) según el valor definido por el usuario en el campo correspondiente del documento HTML.
    ERROR = parseFloat(document.getElementById("ERROR").value)
    
    // Limpia la tabla que muestra las respuestas a la prueba anterior.
    clearLabelTestResponse();
}


function start() {
    initializeValues() // inicializa los valores del perceptrón 
    useNeuralCase(); // entrena el perceptrón
    if (table.rows.length > 0) {
        dropRowTable();
    }
    if (!perceptron) { // si no fue posible entrenar al perceptrón correctamente, se muestran mensajes de error.
        addRowError();
        hiddenLabels();
        return;
    }
    addLabels(); // muestra las etiquetas con los pesos y umbrales correspondientes. 
    addRowResponse(); // agrega un renglón al reporte de salida por cada caso evaluado
    addTestResponse(); // evalúa un caso adicional y muestra su resultado
    return;
}

/**
 * Función que elimina todas las filas de la tabla excepto la cabecera.
 */
function dropRowTable() {
    // Variable que almacena la cantidad de filas de la tabla.
    var rowCount = table.rows.length;
    // Ciclo que comienza desde la última fila y va eliminando todas las filas hasta llegar a la primera (índice 0).
    for (let i = (rowCount - 1); i > 0; i--) {
        table.deleteRow(i);
    }
}


function addLabels() {
    var myCollapse = document.getElementById('labels');
//Agregar clase '.collapsing' para generar efecto de colapso visible en pantalla
myCollapse.className=" .collapsing";
myCollapse.style.display = 'block';
myCollapse.setAttribute("data-bs-toggle","collapse");

//Mostrar los valores de los pesos y del contador en las etiquetas correspondientes
document.getElementById("nW1").innerHTML = weight[0];
document.getElementById("nW2").innerHTML = weight[1];
document.getElementById("nW3").innerHTML = weight[2];
document.getElementById("nW4").innerHTML = weight[3];
document.getElementById("nError").innerHTML = ERROR;
document.getElementById("nCounter").innerHTML = counter;

}
//Esta funcion agrega la respuesta de las pruebas a la tabla interactiva
function addTestResponse(){
    var myCollapse = document.getElementById('testResponse');
    myCollapse.className=" .collapsing";
    myCollapse.style.display = 'block';
    myCollapse.setAttribute("data-bs-toggle","collapse");
}

//Esta funcion oculta los labels en caso de que no se haya podido encontrar una solución.
function hiddenLabels() {
    var myCollapse = document.getElementById('labels');
    myCollapse.style.display = 'none';
}



function testNewValue(){
    // Variables que toman el valor de los elementos HTML con ID selectValue1, selectValue2, selectValue3 y selectValue4.
    let v1=parseFloat(selectValue1.value);
    let v2=parseFloat(selectValue2.value);
    let v3=parseFloat(selectValue3.value);
    let v4=parseFloat(selectValue4.value);

    // Llamado a la función operationTest con los valores obtenidos anteriormente.
    let response=operationTest(v1,v2,v3,v4);

    // Impresión en consola del resultado obtenido de la función.
    console.log("response: ",response);
    
    // Asignación del resultado a un elemento HTML con ID "response".
    document.getElementById("response").value=response;
}


//Función que se ejecutará cuando haya un cambio en el elemento selectValue1
selectValue1.addEventListener('change', (event)=>{
    // Si todos los elementos tienen un valor, llama a la función testNewValue()
    if(selectValue1.value!='' && selectValue2.value!='' && selectValue3.value != '' && selectValue4.value != ''){
        testNewValue(); 
    }
    // De lo contrario, establece el valor del elemento "response" vacío
    else{
        document.getElementById("response").value='';
    }
})


selectValue2.addEventListener("change", (event)=>{
    if(selectValue1.value!='' && selectValue2.value!='' && selectValue3.value != '' && selectValue4.value != ''){
        testNewValue();    
    }else{
        document.getElementById("response").value='';
    }
})

selectValue3.addEventListener('change', (event)=>{
    if(selectValue1.value!='' && selectValue2.value!='' && selectValue3.value != '' && selectValue4.value != ''){
        testNewValue(); 
    }else{
        document.getElementById("response").value='';
    }
})

selectValue4.addEventListener("change", (event)=>{
    if(selectValue1.value!='' && selectValue2.value!='' && selectValue3.value != '' && selectValue4.value != ''){
        testNewValue();    
    }else{
        document.getElementById("response").value='';
    }
})


function clearLabelTestResponse(){
    selectValue1.value='';
    selectValue2.value='';
    selectValue3.value='';
    selectValue4.value='';
}
