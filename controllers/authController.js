// controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criar novo usuário
    user = new User({
      name,
      email,
      password,
    });

    // Criptografar a senha
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salvar usuário
    await user.save();

    // Retornar token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Certifique-se de que JWT_SECRET está definido no seu arquivo .env
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Erro ao gerar o token JWT:', err);
          return res.status(500).json({ msg: 'Erro ao gerar o token' });
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Erro no registro:', err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe
    let user = await User.findOne({ email }); // Use 'user' em minúsculas
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }

    // Retornar token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Certifique-se de que JWT_SECRET está definido no seu arquivo .env
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Erro ao gerar o token JWT:', err);
          return res.status(500).json({ msg: 'Erro ao gerar o token' });
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Erro no login:', err.message);
    res.status(500).send('Erro no servidor');
  }
};
