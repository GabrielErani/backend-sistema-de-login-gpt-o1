require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();


//middlewares
app.use(cors({
    origin: 'https://sistema-de-login-o1.vercel.app', // Permitir o domínio do Vercel
  }));
app.use(express.json());
app.use(authMiddleware());

//rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//porta do servidor
const PORT = process.env.PORT || 5000;

//inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const connectDB = require('./config/db');

connectDB();