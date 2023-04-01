var weight = new Array();
var E;
var ERROR;
var counter;
var entrenado;
var desiredOutput = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1];
const trueTable = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1],
  [-1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1],
  [-1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1],
  [-1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1],
];
var response = [];
var table = document.getElementById("resultTable");

const selectValue1 = document.getElementById("valueV1");
const selectValue2 = document.getElementById("valueV2");
const selectValue3 = document.getElementById("valueV3");
const selectValue4 = document.getElementById("valueV4");

function operation(index) {
  let y =
    Math.tanh((weight[0] * trueTable[0][index]) +
    weight[1] * trueTable[1][index] +
    weight[2] * trueTable[2][index] +
    weight[3] * trueTable[3][index] -
    ERROR);
  if (y >= 0) {
    y = 1;  
  } else {
    y = -1;
  }

  return y;
}

function operationTest(val1, val2, val3, val4) {
  let y =
    Math.tanh(weight[0] * val1) +
    weight[1] * val2 +
    weight[2] * val3 +
    weight[3] * val4 -
    ERROR;

  console.log("pesos: ", weight);
  console.log("Error: ", ERROR);
  console.log("Y", y);

  if (y >= 0) {
    y = 1;
  } else {
    y = -1;
  }

  return y;
}

function validateValue(index, value) {
  let error = desiredOutput[index] - value;

  if (error == 0) {
    return true;
  } else {
    return false;
  }
}

function weightRecalculate(index) {
  let Y = desiredOutput[index];
  let X1 = trueTable[0][index];
  let X2 = trueTable[1][index];
  let X3 = trueTable[2][index];
  let X4 = trueTable[3][index];

  weight[0] = weight[0] + 2 * E * Y * X1;
  weight[1] = weight[1] + 2 * E * Y * X2;
  weight[2] = weight[2] + 2 * E * Y * X3;
  weight[3] = weight[3] + 2 * E * Y * X4;

  ERROR = ERROR + 2 * E * Y * -1;
}

function viewResponse() {
  console.log("Response: ", response);
}

function viewWeight() {
  console.log("Weight: ", weight);
}

function useNeuralCase() {
  if (counter >= 1000) {
    entrenado = false;
    return;
  }

  counter++;
  estado = true;

  for (let i = 0; i < 16; i++) {
    let y = operation(i);

    if (validateValue(i, y) == false) {
      weightRecalculate(i);
      estado = false;
      response = [];
      break;
    }

    response.push(y);
  }

  if (estado == false) {
    useNeuralCase();
  }

  return;
}

function addRowResponse() {
  for (let i = 0; i < 16; i++) {
    let operation =
      Math.tanh(
        weight[0] * trueTable[0][i] +
          weight[1] * trueTable[1][i] +
          weight[2] * trueTable[2][i] +
          weight[3] * trueTable[3][i]
       - ERROR);

    let salida = operation >= 0 ? 1 : 0;

    table.insertRow(-1).innerHTML =
      '<tr><th scope="row" class="text-center">' +
      (i + 1) +
      '</th><td class="text-center">' +
      trueTable[0][i] +
      '</td><td class="text-center">' +
      weight[0] +
      '</td><td class="text-center">' +
      trueTable[1][i] +
      '</td><td class="text-center"> ' +
      weight[1] +
      '</td><td class="text-center">' +
      trueTable[2][i] +
      '</td><td class="text-center">' +
      weight[2] +
      '</td><td class="text-center">' +
      trueTable[3][i] +
      '</td><td class="text-center">' +
      weight[3] +
      '</td><td class="text-center">' +
      ERROR +
      '</td><td class="text-center">' +
      salida +
      "</td></tr>";
  }
}

function addRowError() {
  table.insertRow(-1).innerHTML =
    '<tr><th class="text-center" colspan="11">NO SE FUE POSIBLE ENTRENAR AL PERCEPTRON CON LOS VALORES DADOS</th></tr>';

  document.getElementById("testResponse").style.display = "none";
}

function initializeValues() {
  counter = 0;

  weight = [];

  entrenado = true;

  weight.push(parseFloat(Math.random() * (1 - -1) + -1));
  weight.push(parseFloat(Math.random() * (1 - -1) + -1));
  weight.push(parseFloat(Math.random() * (1 - -1) + -1));
  weight.push(parseFloat(Math.random() * (1 - -1) + -1));

  E = parseFloat(Math.random() * (1 - -1) + -1);
  ERROR = parseFloat(Math.random() * (1 - -1) + -1);

  document.getElementById("w1").innerHTML = "<div>W1: " + weight[0] + "</div>";
  document.getElementById("w2").innerHTML = "<div>W2: " + weight[1] + "</div>";
  document.getElementById("w3").innerHTML = "<div>W3: " + weight[2] + "</div>";
  document.getElementById("w4").innerHTML = "<div>W4: " + weight[3] + "</div>";
  document.getElementById("E").innerHTML =
    "<div>Factor de aprendiazaje: " + E + "</div>";
  document.getElementById("Error").innerHTML =
    "<div>%Error: " + ERROR + "</div>";

  clearLabelTestResponse();
}

function start() {
  initializeValues();
  useNeuralCase();
  if (table.rows.length > 0) {
    dropRowTable();
  }
  if (!entrenado) {
    addRowError();
    return;
  }
  document.getElementById("nCounter").innerHTML = counter;
  addRowResponse();
  addTestResponse();
  return;
}

function dropRowTable() {
  var rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
}

function addTestResponse() {
  var myCollapse = document.getElementById("testResponse");
  myCollapse.className = " .collapsing";
  myCollapse.style.display = "block";
  myCollapse.setAttribute("data-bs-toggle", "collapse");
}

function testNewValue() {
  let v1 = parseFloat(selectValue1.value);
  let v2 = parseFloat(selectValue2.value);
  let v3 = parseFloat(selectValue3.value);
  let v4 = parseFloat(selectValue4.value);

  let response = operationTest(v1, v2, v3, v4);

  console.log("response: ", response);

  document.getElementById("response").value = response;
}

selectValue1.addEventListener("change", (event) => {
  if (
    selectValue1.value != "" &&
    selectValue2.value != "" &&
    selectValue3.value != "" &&
    selectValue4.value != ""
  ) {
    testNewValue();
  } else {
    document.getElementById("response").value = "";
  }
});

selectValue2.addEventListener("change", (event) => {
  if (
    selectValue1.value != "" &&
    selectValue2.value != "" &&
    selectValue3.value != "" &&
    selectValue4.value != ""
  ) {
    testNewValue();
  } else {
    document.getElementById("response").value = "";
  }
});

selectValue3.addEventListener("change", (event) => {
  if (
    selectValue1.value != "" &&
    selectValue2.value != "" &&
    selectValue3.value != "" &&
    selectValue4.value != ""
  ) {
    testNewValue();
  } else {
    document.getElementById("response").value = "";
  }
});

selectValue4.addEventListener("change", (event) => {
  if (
    selectValue1.value != "" &&
    selectValue2.value != "" &&
    selectValue3.value != "" &&
    selectValue4.value != ""
  ) {
    testNewValue();
  } else {
    document.getElementById("response").value = "";
  }
});

function clearLabelTestResponse() {
  selectValue1.value = "";
  selectValue2.value = "";
  selectValue3.value = "";
  selectValue4.value = "";
}
