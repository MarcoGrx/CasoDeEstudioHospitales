const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Enviar datos simulados para probar la interfaz
    setInterval(() => {
        const vitalSignsData = {
            heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
            bloodPressure: '120/80',
            bodyTemperature: (Math.random() * (37.5 - 36.0) + 36.0).toFixed(1),
            oxygenLevel: Math.floor(Math.random() * (100 - 95 + 1)) + 95
        };
        socket.emit('vitalSignsData', vitalSignsData);
    }, 5000);
});

server.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
