const { User } = require('../DB_connection')


const postUser = async (req, res) => {
    try {
        const { email, password } = req.body;// destruturamos lo que envian por body.
        if(!email || !password) return res.status(400).send({ message: "Datos incompletos." })
        const [user, isCreated] = await User.findOrCreate({// si todo esta ok usamos la función findOrCreate() para crear el user en al BD.
        where: {// especificamos que seleccione solo el email y el password.
            email: email,
            password: password,
        }})        
        res.status(201).send({ user, created: isCreated })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}


module.exports = postUser;


//* isCreated propiedad del objeto User que retorna un booleano que indica si el usuario se creo con exito o no.