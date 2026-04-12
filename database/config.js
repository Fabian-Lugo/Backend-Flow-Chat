const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('db online');
    } catch(e) {
        console.error('--- DETALLE DEL ERROR ---');
        console.error(e.message); 
        console.error('-------------------------');
        
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}