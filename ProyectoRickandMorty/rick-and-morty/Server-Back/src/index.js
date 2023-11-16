const server = require('./server')
const { conn } = require('./DB_connection')
const PORT = 3001;

conn.sync({ alter: true, }).then(() => {
    server.listen(PORT, () => console.log(`server running on ${PORT}`));
}).catch((error) => console.log(error))





