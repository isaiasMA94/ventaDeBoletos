function validarRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    let suma = 0, multiplo = 2;
    for(let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvEsperado;
}

function validarLuhn(numero) {
    let arr = numero.replace(/\D/g, '').split('').reverse().map(x => parseInt(x));

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

    // Recuperar el asiento seleccionado
    const asientoSeleccionado = JSON.parse(sessionStorage.getItem("asientoSeleccionado"));
    let numeroAsiento = "";
    if (asientoSeleccionado) {
        // Obtener el estado actual de los asientos o crear uno nuevo
        let asientos = JSON.parse(localStorage.getItem("asientos")) || [];
        // Marcar el asiento como ocupado con los datos del pasajero
        asientos[asientoSeleccionado.fila * 10 + asientoSeleccionado.columna] = pasajero;
        // Guardar el estado actualizado
        localStorage.setItem("asientos", JSON.stringify(asientos));
        // Calcular el número de asiento (A1, A2, ..., A40)
        numeroAsiento = "A" + (asientoSeleccionado.fila * 10 + asientoSeleccionado.columna + 1);
    }

    // Mostrar los datos en el modal
    document.getElementById("datosViaje").innerHTML = `
        <h3>¡Boleto comprado con éxito!</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>RUT:</strong> ${rut}</p>
        <p><strong>Ciudad de inicio:</strong> ${ciudadInicio}</p>
        <p><strong>Ciudad de destino:</strong> ${ciudadDestino}</p>
        <p><strong>Valor del pasaje:</strong> ${valorPasaje}</p>
        <p><strong>Últimos 4 dígitos de la tarjeta:</strong> ${tarjeta.slice(-4)}</p>
        <p><strong>Número de asiento:</strong> ${numeroAsiento}</p>
    `;

    document.getElementById("modalExito").style.display = "block";
}


function volverMenu() {
    window.location.href = "../01 Menu principal/index.html";
}


function cerrarModal() {
    document.getElementById("modalExito").style.display = "none";
    document.getElementById("nombre").value = "";
    document.getElementById("rut").value = "";
    document.getElementById("ciudadInicio").value = "";
    document.getElementById("ciudadDestino").value = "";
    document.getElementById("valorPasaje").value = "";
    document.getElementById("tarjeta").value = "";
    // Redirigir a la página de asientos
    window.location.href = "../01 Menu principal/asientos.html";
}

