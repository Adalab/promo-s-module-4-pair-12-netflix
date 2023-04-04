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

  //hacemos la petición al servidor de filtar por genéro y ordenar

  server.get('/movies', (req, res) => {
    const gender = req.query.gender;
    const order = req.query.sort;
    console.log('Pidiendo a la base de datos información de películas.');
  if (gender ===""){
    if (order ==='asc'){
      connection
        .query('SELECT * FROM movies ORDER BY title ASC')
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
    }else{
      connection
        .query('SELECT * FROM movies ORDER BY title DESC')
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
    }
  }else{
    if(order==="asc"){
    connection
      .query('SELECT * FROM movies WHERE gender = ? ORDER BY title ASC', [gender])
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
    }else{
    connection
    .query('SELECT * FROM movies WHERE gender = ? ORDER BY title DESC', [gender])
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
  }
  }});

  const staticServerPathPublic = './src/public-react/'; 
  // En esta carpeta ponemos los ficheros estáticos
  server.use(express.static(staticServerPathPublic));

  const staticServerPathImages = './src/public-movies-images/'; 
  // En esta carpeta ponemos los ficheros estáticos
  server.use(express.static(staticServerPathImages));