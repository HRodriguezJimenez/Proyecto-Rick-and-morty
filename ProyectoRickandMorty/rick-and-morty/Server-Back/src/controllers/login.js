const usuarios = require('../utils/users');

const login = (req, res) => {
    const email = req.query.email;
    const password = req.query.password;

    const usuario = usuarios.find(user => user.email === email && user.password === password);

    if (usuario) {
        res.status(200).json({ access: true })
    } else {
        res.status(200).json({ access: false })
    }
}

module.exports = login;