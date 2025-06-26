
function validadRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    let cuerpo = rut.slice(0, -1);
    let dv =rut.slice(-1).toUpperCase();
    let suma = 0, multiplo = 2;
    for(let i = cuerpo.length - 1; i >= =; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
}

function validarLuhn(numero) {
    let arr = nimero.replace(/\D/g, '').split('').reverse().map(x => parseInt(x));

    let suma = arr.reduce((acc, val, idx) => {
        if(idx % 2 === 1) {
            val *= 2;
            if(val > 9) val -=9; 
        }
        return acc + val;
    }, 0);
    return suma % 10 === 0;
}

let pasajeros = [];

function comprar() {
    const nombre = document.getElementById("nombre").value.trim();
    const rut = document.getElementById("rut").value.trim();
    const ciudadInicio = document.getElementById("ciudadInicio").value.trim();
    const ciudadDestino = document.getElementById("ciudadDestino").value.trim();
    const valorPasaje = document.getElementById("valorPasaje").value.trim();
    const tarjeta = document.getElementById("tarjeta").value.trim();

    if (!nombre || !rut || !ciudadInicio || !ciudadDestino || !valorPasaje || !tarjeta) {
        alert("Por favor, complete todos los campos");
        return;
    }

    if (!validarRUT(rut)) {
        alert("RUT inválido");
        return;
    }

    if (!validarLuhn(tarjeta)) {
        alert("Número de tarjeta inválido");
        return;
    }

    let pasajero = {
        nombre,
        rut,
        ciudadInicio,
        ciudadDestino,
        valorPasaje,
        ultimos4: tarjeta.slice(-4)
    };

    pasajeros.push(pasajero);
    alert("Su boleto ha sido comprado con éxito");
}

