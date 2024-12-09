const io = require('socket.io-client');
const jwt = require('jsonwebtoken');

// Generar el token JWT
const token = jwt.sign({ id: 'estacionCentral' }, 'secreto', { expiresIn: '1h' });
console.log('Token generado:', token);

const socket = io('http://localhost:3000', {
    auth: {
        token: token
    },
    transports: ['websocket', 'polling']
});

console.log('Intentando conectar al servidor...');

socket.on('connect', () => {
    console.log('Conectado al servidor de WebSocket');
});

socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error.message);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

function esCritico(data) {
    return data.heartRate < 60 || data.heartRate > 100 ||
           data.bloodPressure !== '120/80' ||
           data.bodyTemperature < 36.0 || data.bodyTemperature > 37.5 ||
           data.oxygenLevel < 95;
}

function enviarAlerta(data) {
    console.log('Alerta crítica:', data);
}

socket.on('vitalSignsData', data => {
    console.log('Datos de signos vitales recibidos:', data);
    guardarEnBaseDeDatos(data);

    if (esCritico(data)) {
        enviarAlerta(data);
    }
});

function guardarEnBaseDeDatos(data) {
    console.log('Datos guardados en la base de datos:', data);
}
