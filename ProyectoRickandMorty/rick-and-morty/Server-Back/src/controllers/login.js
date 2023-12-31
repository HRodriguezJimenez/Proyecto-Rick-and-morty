const { User } = require('../DB_connection')


const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        if(!email || !password) return res.status(400).json({ message: "Datos incompletos." })
        const user = await User.findOne({
            where: {
                email,
            }
        })
        if(!user) return res.status(404).json({ message: "Usuario no encontrado." })
        if(user.password !== password) return res.status(403).json({ message: "Contraseña Incorrecta." })
        res.send({ access: true })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = login;