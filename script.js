// Datos de ejemplo
const data = [
    { time: '00:00', temperature: 22, humidity: 60, soilMoisture: 40 },
    { time: '04:00', temperature: 20, humidity: 65, soilMoisture: 45 },
    { time: '08:00', temperature: 23, humidity: 55, soilMoisture: 35 },
    { time: '12:00', temperature: 26, humidity: 50, soilMoisture: 30 },
    { time: '16:00', temperature: 25, humidity: 52, soilMoisture: 32 },
    { time: '20:00', temperature: 23, humidity: 58, soilMoisture: 38 },
];

// Función para crear gráficos
function createChart(canvasId, label, data, yAxisLabel) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.time),
            datasets: [{
                label: label,
                data: data.map(d => d[yAxisLabel.toLowerCase()]),
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: yAxisLabel
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Crear gráficos
const temperatureChart = createChart('temperatureChart', 'Temperatura', data, 'Temperatura (°C)');
const humidityChart = createChart('humidityChart', 'Humedad', data, 'Humedad (%)');
const soilMoistureChart = createChart('soilMoistureChart', 'Humedad del Suelo', data, 'Humedad del Suelo (%)');

// Autenticación
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'password') {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('idealConditions').style.display = 'block';
    } else {
        alert('Credenciales incorrectas');
    }
});

// Cerrar sesión
document.getElementById('logout').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('idealConditions').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

// Guardar condiciones ideales
document.getElementById('conditions').addEventListener('submit', function(e) {
    e.preventDefault();
    const idealTemp = document.getElementById('idealTemp').value;
    const idealHumidity = document.getElementById('idealHumidity').value;
    const idealSoilMoisture = document.getElementById('idealSoilMoisture').value;
    alert(`Condiciones óptimas guardadas: Temperatura ${idealTemp}°C, Humedad ${idealHumidity}%, Humedad del Suelo ${idealSoilMoisture}%`);
});

// Generar código QR
const qr = qrcode(0, 'M');
qr.addData('https://juanbenites1609.github.io/PRUEBA_2/');
qr.make();
document.getElementById('qrcode').innerHTML = qr.createImgTag(5);

// Interactividad adicional
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Actualización en tiempo real (simulada)
function updateCharts() {
    const newData = {
        temperature: Math.random() * 10 + 20,
        humidity: Math.random() * 20 + 50,
        soilMoisture: Math.random() * 20 + 30
    };

    temperatureChart.data.datasets[0].data.push(newData.temperature);
    humidityChart.data.datasets[0].data.push(newData.humidity);
    soilMoistureChart.data.datasets[0].data.push(newData.soilMoisture);

    if (temperatureChart.data.datasets[0].data.length > 6) {
        temperatureChart.data.datasets[0].data.shift();
        humidityChart.data.datasets[0].data.shift();
        soilMoistureChart.data.datasets[0].data.shift();
    }

    temperatureChart.update();
    humidityChart.update();
    soilMoistureChart.update();
}

setInterval(updateCharts, 1500); // Actualiza cada 5 segundos