const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function isCritical(data) {
    return data.heartRate < 60 || data.heartRate > 100 ||
           data.bloodPressure !== '120/80' ||
           data.bodyTemperature < 36.0 || data.bodyTemperature > 37.5 ||
           data.oxygenLevel < 95;
}

function sendAlert(data) {
    console.log('Alerta crítica:', data);
    // Lógica para enviar alertas, por ejemplo, por correo electrónico o SMS
}

socket.on('vitalSignsData', data => {
    console.log('Datos de signos vitales recibidos:', data);
    // Procesar y almacenar los datos recibidos
    saveToDatabase(data);

    // Generar reportes y alertas
    if (isCritical(data)) {
        sendAlert(data);
    }
});

function saveToDatabase(data) {
    // Lógica para guardar los datos en la base de datos
    console.log('Datos guardados en la base de datos:', data);
}
