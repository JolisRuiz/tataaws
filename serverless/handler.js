'use strict';

const querystring = require("querystring")

const express = require('express');
const app = express();

//const servers = require('serverless-http');
const mysqlConnection = require('./src/database');
const { json } = require("body-parser");
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
//app.use(require('./src/routes/vehiculo'));

//Starting the server
app.listen(3000, () => {
    console.log('Server on port 3000', app.get('port'));
});


module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: '¡Hi Serverless!!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const findAll = () => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(`SELECT * FROM vehiculo`, (err, rows) => {
      if(err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports.obtenerVehiculo = async (event) => {
  //let id = event.pathParameters.id;
  let resultado = await findAll();
  //console.log(`id : ${id}`);
  console.log(resultado);
  return {
    statusCode: 200,
    body: JSON.stringify(resultado,
      null,
      2
    ),
  };
    
};


const guardar = (body) => {
  const {id, nombre, modelo, costo_en_creditos, longitud, maxima_velocidad_atmosferica, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculos, url} = body;
  const query = `
      SET @id =?;
      SET @nombre =?;
      SET @modelo =?;
      SET @costo_en_creditos =?;
      SET @longitud =?;
      SET @maxima_velocidad_atmosferica =?;
      SET @tripulacion =?;
      SET @pasajeros =?;
      SET @capacidad_de_carga =?;
      SET @consumibles =?;
      SET @clase_de_vehiculos =?;
      SET @url =?;
      CALL crear_vehiculo(@id, @nombre, @modelo, @costo_en_creditos, @longitud, @maxima_velocidad_atmosferica, @tripulacion, @pasajeros, @capacidad_de_carga, @consumibles, @clase_de_vehiculos, @url);
  `;

  return new Promise((resolve, reject) => {
    mysqlConnection.query(query, [id, nombre, modelo, costo_en_creditos, longitud, maxima_velocidad_atmosferica, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculos, url], (err, rows, fields) => {
      if(err) {
        reject(err);
      } else {
        resolve(`Se creo correctamente:  ${body.nombre}`);
      }
    });
  });
}

module.exports.nuevovehiculo = async (event) => {
  const body1 = JSON.parse(event["body"]);
  console.log(body1.nombre);

  let resultado = await guardar(body1);
  //console.log(`id : ${id}`);
  console.log(resultado);
  return {
    statusCode: 200,
    body: JSON.stringify(resultado,
      null,
      2
    ),
  };

  /*
  const {id, nombre, modelo, costo_en_creditos, longitud, maxima_velocidad_atmosferica, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculos, url} = body1;
  const query = `
      SET @id =?;
      SET @nombre =?;
      SET @modelo =?;
      SET @costo_en_creditos =?;
      SET @longitud =?;
      SET @maxima_velocidad_atmosferica =?;
      SET @tripulacion =?;
      SET @pasajeros =?;
      SET @capacidad_de_carga =?;
      SET @consumibles =?;
      SET @clase_de_vehiculos =?;
      SET @url =?;
      CALL crear_vehiculo(@id, @nombre, @modelo, @costo_en_creditos, @longitud, @maxima_velocidad_atmosferica, @tripulacion, @pasajeros, @capacidad_de_carga, @consumibles, @clase_de_vehiculos, @url);
  `;

  mysqlConnection.query(query, [id, nombre, modelo, costo_en_creditos, longitud, maxima_velocidad_atmosferica, tripulacion, pasajeros, capacidad_de_carga, consumibles, clase_de_vehiculos, url], (err, rows, fields) => {
      if(!err) {
         console.log('Vehiculo guardado');
      } else {
          console.log(e)
      }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Se creo correctamente:  ${body1.nombre}`
      },
      null,
      2
    ),
  };
*/

};