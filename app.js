// 1. ESTRUCTURA DE DATOS (Arreglo de Objetos Literales)
let rackDevices = [
    {
        id: 1,
        nombre: "Router Borde Principal",
        tipo: "Router",
        anchoBanda: 850,
        latencia: 15,
        temperatura: 42
    },
    {
        id: 2,
        nombre: "Switch Core LAN",
        tipo: "Switch",
        anchoBanda: 3200,
        latencia: 2,
        temperatura: 38
    }
];

// Referencias a los elementos del DOM (HTML)
const dashboardContainer = document.getElementById('dashboardContainer');
const deviceForm = document.getElementById('deviceForm');

// 2. FUNCIÓN READ: Lee el arreglo y dibuja la interfaz
function renderizarDashboard() {
    // Limpiamos el contenedor antes de volver a dibujar
    dashboardContainer.innerHTML = '';

    // Recorremos el arreglo de dispositivos
    rackDevices.forEach(device => {
        
        // LÓGICA DE EVENTOS Y ALERTAS (Requisito de la evaluación)
        // Evaluamos si el dispositivo está en peligro
        let isAlert = false;
        let iconoAlerta = '';
        
        if (device.temperatura > 75 || device.latencia > 100) {
            isAlert = true;
            iconoAlerta = '⚠️ (ALERTA CRÍTICA)';
        }

        // Creamos la estructura HTML para la tarjeta
        const cardHTML = `
            <div class="card ${isAlert ? 'alert' : ''}">
                <div class="card-header">
                    <span>${device.nombre}</span>
                    <span>${iconoAlerta}</span>
                </div>
                <div class="card-body">
                    <p><strong>Tipo:</strong> ${device.tipo}</p>
                    <p><strong>Ancho de Banda:</strong> ${device.anchoBanda} Mbps</p>
                    <p><strong>Latencia:</strong> ${device.latencia} ms</p>
                    <p><strong>Temperatura:</strong> ${device.temperatura} °C</p>
                    
                    <button class="btn-update" onclick="simularCarga(${device.id})">⚡ Simular Carga (Update)</button>
                    <button class="btn-delete" onclick="eliminarDispositivo(${device.id})">🗑️ Eliminar (Delete)</button>
                </div>
            </div>
        `;

        // Inyectamos la tarjeta en el contenedor
        dashboardContainer.innerHTML += cardHTML;
    });
}

// 3. FUNCIÓN CREATE: Agregar un nuevo dispositivo desde el formulario
deviceForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturamos los valores del formulario
    const nuevoDispositivo = {
        id: Date.now(), // Generamos un ID único basado en la fecha exacta
        nombre: document.getElementById('nombreInput').value,
        tipo: document.getElementById('tipoInput').value,
        anchoBanda: parseInt(document.getElementById('bwInput').value),
        latencia: parseInt(document.getElementById('latenciaInput').value),
        temperatura: parseInt(document.getElementById('tempInput').value)
    };

    // Agregamos el objeto al arreglo principal
    rackDevices.push(nuevoDispositivo);

    // Limpiamos el formulario
    deviceForm.reset();

    // Volvemos a dibujar el dashboard para mostrar el nuevo elemento
    renderizarDashboard();
});

// 4. FUNCIÓN UPDATE: Modificar los valores de un dispositivo existente
function simularCarga(id) {
    // Buscamos el dispositivo por su ID
    const deviceIndex = rackDevices.findIndex(d => d.id === id);
    
    if (deviceIndex !== -1) {
        // Aumentamos aleatoriamente la latencia y la temperatura para simular estrés en la red
        rackDevices[deviceIndex].latencia += Math.floor(Math.random() * 40);
        rackDevices[deviceIndex].temperatura += Math.floor(Math.random() * 15);
        
        // Volvemos a dibujar para reflejar los cambios (y activar alertas si es necesario)
        renderizarDashboard();
    }
}

// 5. FUNCIÓN DELETE: Eliminar un dispositivo del arreglo
function eliminarDispositivo(id) {
    // Filtramos el arreglo para quedarnos con todos menos el que coincida con el ID
    rackDevices = rackDevices.filter(d => d.id !== id);
    
    // Volvemos a dibujar el dashboard actualizado
    renderizarDashboard();
}

// Ejecutamos la función de lectura por primera vez al cargar la página
renderizarDashboard();