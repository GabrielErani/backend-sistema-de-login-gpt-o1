//config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado ao banco de dados');
    } catch(err) {
        console.error('Erro ao conectar ao banco de dados', err);
        process.exit(1);
    }
};

module.exports = connectDB;