
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

//imports de las rutas
const indexRoutes = require('./routes/index');

const { Console } = require('console');

//inicializacion de la aplicacion
const app = express();

//Conexion con la base de datos
/*mongoose.connect('mongodb://localhost/primeraCrud',
{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
//then cuando todo va bien
.then((res)=>console.log('Conexion exitosa'))
//catch nos indica el error 
.catch((err)=>console.log("@db",err));
*/
//conectar con la web
mongoose.connect('mongodb+srv://userDB:userDB@cluster0.khdcl.mongodb.net/primeraCrud?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then((res)=> console.log('Conexion exitosa a la base de datos')).catch((err) => console.log("@db ",err))


//seetings- Generamos constantes en todo el proyecto
app.set("port", process.env.PORT || 400);
app.set("views", path.join(__dirname+"/view"));
app.set("view engine", "ejs");
app.set("models", path.join(__dirname+"/models"));
app.set("routes", path.join(__dirname+"/routes"));

//
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));

//ruta
app.use("/",indexRoutes);


//ejecutar el servidor
app.listen(app.get("port"), ()=>{
    console.log(`Server run on port http://localhost:${app.get("port")}`);
})



