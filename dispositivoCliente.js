const io = require('socket.io-client');
const jwt = require('jsonwebtoken');

// Generar el token JWT
const token = jwt.sign({ id: 'dispositivoCliente' }, 'secreto', { expiresIn: '1h' });
console.log('Token generado:', token);

const socket = io('http://localhost:3000', {
    auth: {
        token: token
    },
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Conectado al servidor con token');
});

socket.on('connect_error', (err) => {
    console.log('Error de conexión:', err.message);
});

// Simular el envío de datos de signos vitales
setInterval(() => {
    const vitalSignsData = {
        heartRate: 75,
        bloodPressure: '120/80',
        bodyTemperature: 36.5,
        oxygenLevel: 98
    };
    socket.emit('vitalSignsData', vitalSignsData);
}, 5000);
