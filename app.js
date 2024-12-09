const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    transports: ['websocket', 'polling']
});

app.use(express.static(path.join(__dirname, 'public')));

io.use((socket, next) => {
    console.log('Autenticación iniciada'); // Log para indicar que la autenticación ha comenzado
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    console.log('Token recibido:', token); // Log del token recibido
    if (!token) {
        console.log('Token ausente'); // Log si el token está ausente
        return next(new Error('Error de autenticación'));
    }
    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            console.log('Error de verificación:', err); // Log del error de verificación
            return next(new Error('Error de autenticación'));
        }
        console.log('Token decodificado:', decoded); // Log del token decodificado
        socket.user = decoded;
        next();
    });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.user.id);

    socket.on('vitalSignsData', (data) => {
        console.log('Datos de signos vitales recibidos del dispositivo:', data);
        io.emit('vitalSignsData', data); // Emitir los datos a todos los clientes conectados
    });

    // Enviar datos simulados para probar la interfaz si es necesario
    setInterval(() => {
        const vitalSignsData = {
            heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
            bloodPressure: '120/80',
            bodyTemperature: (Math.random() * (37.5 - 36.0) + 36.0).toFixed(1),
            oxygenLevel: Math.floor(Math.random() * (100 - 95 + 1)) + 95
        };
        io.emit('vitalSignsData', vitalSignsData);
    }, 5000);
});

server.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
