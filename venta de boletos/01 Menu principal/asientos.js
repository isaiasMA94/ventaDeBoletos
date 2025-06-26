// Crear la matriz de asientos (4 filas x 10 columnas)
const filas = 4;
const columnas = 10;

// Cargar asientos ocupados desde localStorage o inicializar vacíos
let asientosFlat = JSON.parse(localStorage.getItem("asientos")) || Array(filas * columnas).fill(null);

// Convertir a matriz 4x10
let asientos = [];
for (let i = 0; i < filas; i++) {
    let fila = [];
    for (let j = 0; j < columnas; j++) {
        fila.push(asientosFlat[i * columnas + j]);
    }
    asientos.push(fila);
}

// Función para mostrar los asientos en la página
function mostrarAsientos() {
    const contenedor = document.getElementById("contenedorAsientos");
    contenedor.innerHTML = ""; // Limpiar antes de mostrar

    for (let i = 0; i < filas; i++) {
        let filaDiv = document.createElement("div");
        filaDiv.className = "fila";
        for (let j = 0; j < columnas; j++) {
            let btn = document.createElement("button");
            btn.className = asientos[i][j] ? "ocupado" : "libre";
            btn.textContent = `A${i * columnas + j + 1}`;
            btn.disabled = !!asientos[i][j];
            btn.onclick = function() {
                seleccionarAsiento(i, j);
            };
            filaDiv.appendChild(btn);
        }
        contenedor.appendChild(filaDiv);
    }
}

// Función al seleccionar un asiento
function seleccionarAsiento(fila, columna) {
    // Guardar el asiento seleccionado (puedes usar localStorage o sessionStorage)
    sessionStorage.setItem("asientoSeleccionado", JSON.stringify({fila, columna}));
    // Redirigir a la página de registro
    window.location.href = "../02 registro/index.html";
}

// Llama a mostrarAsientos cuando cargue la página
window.onload = mostrarAsientos;