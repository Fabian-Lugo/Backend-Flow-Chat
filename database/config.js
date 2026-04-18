const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('[DB] Conectado a MongoDB');
    } catch (e) {
        console.error('[DB] Error de conexión:', e.message);
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}