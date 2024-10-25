const jwt = require('jsonwebtoken');
const SECRET_KEY = 'root';

function generateToken(user) {
    return jwt.sign({ id: user.iduser, email: user.email }, SECRET_KEY, { expiresIn: '12H' });
}

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Nenhum token fornecido' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Formato de token inválido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Falha ao autenticar o token' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = { generateToken, verifyToken };
