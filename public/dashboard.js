const socket = io('http://localhost:3000', {
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Conectado al servidor desde la página web');
});

socket.on('vitalSignsData', data => {
    console.log('Datos recibidos en el dashboard:', data);
    actualizarDashboard(data);
});

function actualizarDashboard(data) {
    document.getElementById('heartRate').innerText = data.heartRate;
    document.getElementById('bloodPressure').innerText = data.bloodPressure;
    document.getElementById('bodyTemperature').innerText = data.bodyTemperature;
    document.getElementById('oxygenLevel').innerText = data.oxygenLevel;
}
