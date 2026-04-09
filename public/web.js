// Minimal Client Logic for Flow Chat Backend
const socket = io();

// Listen for connections
socket.on('connect', () => {
    console.log('✅ Conectado al servidor de Flow Chat en tiempo real');
    const statusText = document.querySelector('.server-status');
    if (statusText) {
        statusText.innerHTML = '<span class="status-indicator" style="background-color: #10b981;"></span> Conexión en tiempo real activa';
    }
});

// Listen for disconnects
socket.on('disconnect', () => {
    console.warn('❌ Desconectado de Flow Chat');
    const statusText = document.querySelector('.server-status');
    if (statusText) {
        statusText.innerHTML = '<span class="status-indicator" style="background-color: #ef4444;"></span> Desconectado del servidor';
    }
});
// Print pretty logs
console.info('🚀 Flow Chat Dashboard initialized. API ready to accept connections.');
