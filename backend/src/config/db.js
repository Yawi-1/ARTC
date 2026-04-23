const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('Database connected :', connect.connection.host)
    } catch (error) {
        console.log('Db connection failed : ', error)
        process.exit(1)
    }
}

module.exports = dbConnection