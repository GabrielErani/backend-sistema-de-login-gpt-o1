// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Obter o token do cabeçalho da requisição
  const token = req.header('Authorization');

  // Verificar se o token não foi fornecido
  if (!token) {
    return res.status(401).json({ msg: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adicionar o usuário decodificado ao objeto de requisição
    req.user = decoded.user;

    // Prosseguir para o próximo middleware ou rota
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
}

module.exports = authMiddleware;