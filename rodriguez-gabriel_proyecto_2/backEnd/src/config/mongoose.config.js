const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexion con base de datos establecida');
    } catch (error) {
        console.log(error);
        throw new Error('Error al establecer la conexion a la base de datos');
    }
}

module.exports = {
    dbConnection
}