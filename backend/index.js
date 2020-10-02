/*
    Backend E-commerce

    Nota del cliente: 
    "Necesito un servicio RESTFul que me permita registrar un listado de productos comprados, precio, identificador de cliente y metodo de pago"

    Modelo de datos : 
    {
        "id": string,
        "clientId": string,
        "products": Array[], (Se guarda el identificador de producto, string)
        "amount": number,
        "paymentMethod": "Credit Card" | "Cash" | "Bitcoin"
        
    }

    Ejemplo:
    {
        "id": "adkjfh",
        "clientId": "1000",
        "products": ["100","300","400","500","600","700","800"],
        "amount": 10000,
        "paymentMethod": "Credit Card"
    }
*/

/*

MARATON BACKEND

1) Completar el servicio API REST, está incompleto.
2) Crear pruebas utilizando POSTMAN para todas las rutas (GET/POST/PUT/DELETE).
3) Validar en la carga/modificación (POST/PUT) que recibimos todos los datos necesarios. Sino, informar error de request.
4) Agregar al modelo de datos el atributo: createdAt (Date). Se debe cargar la fecha actual.  
5) BONUS: Crear un front-end simple que permita hacer una carga de datos desde un formulario. Respetando el modelo de datos.
6)  Elegí algún ejercicio de la maratón, e intenta encontrar una nueva forma de resolución, que sea distinta a la primera. 
7) Si fueses mentor/a, y tuvieses que pensar un ejercicio para la maratón, ¿Cuál sería? Te proponemos inventar un ejercicio nuevo que implique poner en práctica los conocimientos vistos hasta acá sobre Backend. 
Para finalizar:
A cada estudiante le tocará corregir el código de algún compañero/a. Tendrán que darle una devolución por escrito, marcando los aciertos y desaciertos, y las cosas que se pueden mejorar. Tengan en cuenta, a la hora de escribir, que el mensaje sea lo más organizado posible, para que el texto tenga claridad a la hora de leerse. Además, entendiendo que tendrán que juzgar el trabajo de un compañero/a, trabajen desde la empatía, para lograr una evaluación constructiva.
*/


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const uniqid = require("uniqid");

const app = express();
const PORT = 3001;

//////////////////// Aplico Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

///////////////////// Init Array de Compras. (Simulo una Base de datos)

const compras = [
    {
        "id": "0",
        "clientId": "1000",
        "products": ["100","300","400","500","600","700","800"],
        "amount": 10000,
        "paymentMethod": "Credit Card",
        "createdAt": mostrarFecha()
        
    },
    {
      "id": "1",
      "clientId": "1001",
      "products": ["100","300","400","500","600","700","800"],
      "amount": 3000,
      "paymentMethod": "Cash",
      "createdAt":mostrarFecha()
    }
];

//////////////////// Defino Rutas, me baso en el modelo REST

//GET 
app.get("/compras", function (req, res) {
  res.status(200).json({compras});
});


// GET by ID
app.get("/compras/:id", function (req, res) {
  const id = req.params.id;

  let compraEncontrada = undefined;

  compras.forEach(function(compra){
    if(compra.id == id){
      compraEncontrada = compra;
      return res.status(200).json({compra:compraEncontrada});
    }
  });

  res.status(404).json({"message":"Compra Not Found - 404"});

});


//POST
app.post("/compras/", function (req, res) {
  if(!req.body || !req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod) {
    return res.status(400).send({"mensaje":"no carga"});
  }
  let id = compras.length;
  const NEWCOMPRA = {
    "id":req.body.id,
      "clientId": req.body.clientId,
      "products": req.body.products,
      "amount": req.body.amount,
      "paymentMethod": req.body.paymentMethod,
      "createdAt": mostrarFecha()

  }
  let compraPush = compras.push(NEWCOMPRA);



  //201 ==> OK CREATED
  return res.status(201).send({"compra":NEWCOMPRA});
});


//PUT
app.put("/compras/:id", function (req, res) {
  if(!req.body || !req.body.clientId || !req.body.products || !req.body.amount || !req.body.paymentMethod) {
    return res.status(400).send({"mensaje":"no carga"});
  }
  const COMPRAID = req.params.id;
  let compraReemplazo = null;
  const NEWRCOMPRA = {
    "id":req.body.id,
      "clientId": req.body.clientId,
      "products": req.body.products,
      "amount": req.body.amount,
      "paymentMethod": req.body.paymentMethod,
      "createdAt": mostrarFecha()
  }
  compras.forEach(function(compra, i){
    if(compra.id == COMPRAID){
      compraReemplazo = i;
    }
  });
  if(compraReemplazo !== null){
  let compraSpliceR = compras.splice(compraReemplazo, 1, NEWRCOMPRA);
  return res.status(200).send({compra:compraSpliceR});  
  }
  res.status(404).send({"mensaje":"compra no encontrada"});
});


//DELETE
app.delete("/compras/:id", function (req, res) {
  const COMPRAID = req.params.id;
  let compraEliminada = null;
  compras.forEach(function(compra, i){
    if(compra.id == COMPRAID){
      compraEliminada = i;
    }
  });  
  if(compraEliminada !== null){
    compras.splice(compraEliminada, 1);
    res.status(200).send({"mensaje":"compra encontrada"});
  }else{
    res.status(404).send({"mensaje":"compra no encontrada"});
  }
});



//Función que me muestra fecha
function mostrarFecha(){
  let createdAt = new Date();
  let fecha = `${createdAt.getDate()}/${createdAt.getMonth()+1}/${createdAt.getUTCFullYear()}`;
  return fecha;
}


//////////////////// Ahora que tengo todo definido y creado, levanto el servicio escuchando peticiones en el puerto
app.listen(PORT, function () {
  console.log(`Maraton Guayerd running on PORT: ${PORT}\n\n`);
});



//Ejercicio 6
/*
app.post("/compras/", function (req, res) {
  if(req.body || req.body.clientId || req.body.products || req.body.amount || req.body.paymentMethod) {
  let id = compras.length;
  const NEWCOMPRA = {
    "id":req.body.id,
      "clientId": req.body.clientId,
      "products": req.body.products,
      "amount": req.body.amount,
      "paymentMethod": req.body.paymentMethod,
      "createdAt": mostrarFecha()

  }
  let compraPush = compras.push(NEWCOMPRA);



  //201 ==> OK CREATED
  return res.status(201).send({"compra":NEWCOMPRA});  
  }else{
    res.status(400).send({"mensaje":"no carga"});
  }
});
*/