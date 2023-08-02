// Variables de conversión
let valorDolar = 549;
let valorEuro = 608;
let valorYen = 76;
let tasaYenUSD = 0.14;
let tasaYenEUR = 0.13;
let tasaUSDEUR = 0.90;

// referencias
const selectMonedaOrigen = document.getElementById("moneda-origen");
const selectMonedaDestino = document.getElementById("moneda-destino");
const inputMonto = document.getElementById("monto");
const botonConvertir = document.getElementById("boton-convertir");
const botonIntercambiar = document.getElementById("btn-intercambiar");
const resultadoElement = document.querySelector(".resultado p");

function mostrarValorDolarBlue() {
  const url = 'http://escuderokevin.com.ar:7070/api/dolarblue';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const dolarBlueValue = data.blue.value;
      document.getElementById('dolarValor').textContent = dolarBlueValue.toFixed(2) + ' ARS';
    })
    .catch(error => {
      console.error('Error al obtener el valor del dólar blue:', error);
      document.getElementById('dolarValor').textContent = 'Error al obtener el valor';
    });
}

// Llamar a la función para mostrar el valor del dólar blue
mostrarValorDolarBlue();



// Función para mostrar el cartel de conversión

function mostrarCartelConversion(cantidadOriginal, divisaOrigen, divisaDestino, cantidadConvertida) {
  swal("¡Enhorabuena!", `La cantidad de ${cantidadOriginal} ${divisaOrigen} son ${cantidadConvertida.toFixed(2)} ${divisaDestino}.`, "success");
}

// Función para convertir divisass
function convertirDivisas() {
  // Obtener los valores seleccionados y el monto ingresados
  const monedaOrigen = selectMonedaOrigen.value;
  const monedaDestino = selectMonedaDestino.value;
  const monto = parseFloat(inputMonto.value);

  let monedaDestinoNombre;

  switch (monedaDestino) {
    case "usd":
      monedaDestinoNombre = "USD (Dólar estadounidense)";
      break;
    case "eur":
      monedaDestinoNombre = "EUR (Euro)";
      break;
    case "yen":
      monedaDestinoNombre = "YEN (Yen japonés)";
      break;
    case "ars":
      monedaDestinoNombre = "ARS (Pesos argentinos)";
      break;
    default:
      monedaDestinoNombre = "";
      break;
  }

  if (isNaN(monto) || monto <= 0) {
    swal("Error", "Ingrese un monto válido mayor a 0.", "error");
    return;
  }

  let montoConversion;
  switch (monedaOrigen) {
    case "ars": // Peso argentino
      switch (monedaDestino) {
        case "usd": // Dólar
          montoConversion = monto / valorDolar;
          mostrarCartelConversion(monto, "ARS", "USD", montoConversion);
          break;
        case "eur": // Euro
          montoConversion = monto / valorEuro;
          mostrarCartelConversion(monto, "ARS", "EUR", montoConversion);
          break;
        case "yen": // Yen
          montoConversion = monto / valorYen;
          mostrarCartelConversion(monto, "ARS", "YEN", montoConversion);
          break;
        default:
          swal("Error", "Seleccione una moneda de destino válida.", "error");
          return;
      }
      break;
    case "usd": // Dólar
      switch (monedaDestino) {
        case "ars": // Peso argentino
          montoConversion = monto * valorDolar;
          mostrarCartelConversion(monto, "USD", "ARS", montoConversion);
          break;
        case "eur": // Euro
          montoConversion = monto * tasaUSDEUR;
          mostrarCartelConversion(monto, "USD", "EUR", montoConversion);
          break;
        case "yen": // Yen
          montoConversion = monto * tasaYenUSD;
          mostrarCartelConversion(monto, "USD", "YEN", montoConversion);
          break;
        default:
          swal("Error", "Seleccione una moneda de destino válida.", "error");
          return;
      }
      break;d
    case "eur": // Euroo
      switch (monedaDestino) {
        case "ars": // Peso argentino
          montoConversion = monto * valorEuro
          mostrarCartelConversion(monto, "EUR", "ARS", montoConversion);
          break;
        case "usd": // Dólar
          montoConversion = monto / tasaUSDEUR;
          mostrarCartelConversion(monto, "EUR", "USD", montoConversion);
          break;
        case "yen": // Yen
          montoConversion = monto * tasaYenEUR;
          mostrarCartelConversion(monto, "EUR", "YEN", montoConversion);
          break;
        default:
          swal("Error", "Seleccione una moneda de destino válida.", "error");
          return;
      }
      break;
    case "yen": // Yen
      switch (monedaDestino) {
        case "ars": // Peso argentino
          montoConversion = monto * valorYen;
          mostrarCartelConversion(monto, "YEN", "ARS", montoConversion);
          break;
        case "usd": // Dólar
          montoConversion = monto / tasaYenUSD;
          mostrarCartelConversion(monto, "YEN", "USD", montoConversion);
          break;
        case "eur": // Euro
          montoConversion = monto / tasaYenEUR;
          mostrarCartelConversion(monto, "YEN", "EUR", montoConversion);
          break;
        default:
          swal("Error", "Seleccione una moneda de destino válida.", "error");
          return;
      }
      break;
    default:
      swal("Error", "Seleccione una moneda de origen válida.", "error");
      return;
  }

  resultadoElement.textContent = montoConversion.toFixed(2) + " " + monedaDestinoNombre;
}

// Evento al hacer clic en el botón "Convertir"
botonConvertir.addEventListener("click", convertirDivisas);

// Evento al hacer clic en el botón "Intercambiar"
botonIntercambiar.addEventListener("click", function() {
  const temp = selectMonedaOrigen.value;
  selectMonedaOrigen.value = selectMonedaDestino.value;
  selectMonedaDestino.value = temp;
});
