const { User } = require('../DB_connection')


const postUser = async (req, res) => {
    try {
        const { email, password } = req.body;// destruturamos lo que envian por body.
        if(!email || !password) return res.status(400).json({ message: "Datos incompletos." })
        const [user, isCreated] = await User.findOrCreate({// si todo esta ok usamos la función findOrCreate() para crear el user en al BD.
            where: { email },
            defaults: {
                password,
            }
        })  
        if(!isCreated) return res.status(409).json({ error: "El email ya está registrado." })      
        res.status(201).json({ user, created: isCreated })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


module.exports = postUser;


//* isCreated propiedad del objeto User que retorna un booleano que indica si el usuario se creo con exito o no.