const socket = io();

socket.on('vitalSignsData', data => {
    updateDashboard(data);
});

function updateDashboard(data) {
    document.getElementById('heartRate').innerText = data.heartRate;
    document.getElementById('bloodPressure').innerText = data.bloodPressure;
    document.getElementById('bodyTemperature').innerText = data.bodyTemperature;
    document.getElementById('oxygenLevel').innerText = data.oxygenLevel;
}
