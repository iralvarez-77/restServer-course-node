const mongoose = require('mongoose');

// Funcion para conectarme a la base de datos con mongoose
const dbConnection = async() => {

    try {

         await mongoose.connect(process.env.
            MONGODB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

            console.log('Base de datos online');



        
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse con la base de datos');
    }



}

module.exports = {
    dbConnection
}



