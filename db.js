require("dotenv").config();
const {MongoClient,ObjectId} = require("mongodb")


function conectar(){
    return MongoClient.connect(process.env.URL_MONGODB);
}

function leerColores(){
    return new Promise(async (ok,ko) => {
        
        try{
            const conexion = await conectar();

            let colores = await conexion.db("colores").collection("colores").find({}).toArray();

            conexion.close();

            ok(colores.map(({_id,r,g,b}) => {
                return {id:_id,r,g,b}
            }));

        }catch(error){
            ko({error : "Error en la base de datos"});
        }
    })
}


function crearColor({r,g,b}){
    return new Promise(async (ok,ko) => {
    
        try{
            
            const conexion = await conectar();

            let {insertedId} = await conexion.db("colores").collection("colores").insertOne({r,g,b})

            conexion.close();

            ok(insertedId);

        }catch(error){
            ko({error : "Error en la base de datos"});
        }
    })
}
//'666946982e6703ce3d2b0e50'

function borrarColor({id}){
    return new Promise(async (ok,ko) => {
        
        try{

            const conexion = await conectar();

            let {deletedCount} = await conexion.db("colores").collection("colores").deleteOne({ _id : new ObjectId(id)})

            conexion.close();

            ok(deletedCount);
        }
        catch(error){
            ko({error : "Error en la base de datos"});
        }
    })
}


module.exports = {leerColores, crearColor, borrarColor};



