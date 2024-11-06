const io = require('socket.io-client');
const socket = io('http://localhost:3000');

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
