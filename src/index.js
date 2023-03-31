const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

//arrancamos el servidor
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//guardar la conexión

let connection;

//crear la conexion mySQL

mysql
  .createConnection({
    host: 'sql.freedb.tech',
    database: 'freedb_netflix-mod4',
    user: 'freedb_team12',
    password: '?t#BW$e3WjQBzM4',
  })
  .then((conn) => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log('Conectado con el identificador ' + connection.threadId);
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });


  server.get('/movies', (req, res) => {
    let sql= 'SELECT * FROM movies';
    console.log('Pidiendo a la base de datos información de películas.');
    connection
      .query(sql)
      .then(([results, fields]) => {
        console.log('Información recuperada:');
        results.forEach((result) => {
          console.log(result);
        });
  
        res.json({
          success: true,
          movies:  results
        });
      })
      .catch((err) => {
        throw err;
      });
  });

