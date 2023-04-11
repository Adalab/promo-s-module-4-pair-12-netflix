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

const dbConnect = require('../config/connection');
dbConnect();

//guardar la conexión
server.set('view engine', 'ejs');
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

  // hacemos la petición al servidor de filtar por genéro y ordenar

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

  server.get('/movie/:movieId', (req, res) => {
    console.log(req.params.movieId);
    const foundMovie = `SELECT * FROM movies WHERE idMovies=?`;
    connection
    .query(foundMovie , [req.params.movieId])
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      // res.render -> representa una plantilla de vista
      res.render('movie' , results[0]);
    })
    .catch((err) => {
      throw err;
    });
   });

   // endpoint para mongoDB

   const Movies = require ('../models/movies');
   const Actors = require ('../models/actors');
   const Users = require ('../models/users');

   server.get('/movies_all_mongo/', (req, res) => {
    const gender = req.query.gender.toLocaleLowerCase();
    const sort = req.query.sort.toLocaleLowerCase();

    const conditions = {};

    if (gender !== '') {
      conditions.gender = gender;
    }
    Movies.find( conditions ).sort({title: sort==='asc'?1:-1})
      .then((results) =>{
      res.json({
        success: true,
        movies:  results
      })
    });

      // if( sort === 'asc' ) {
    //   Movies.find( conditions ).sort({title: 1})
    //   .then((results) =>{
    //   res.json({
    //     success: true,
    //     movies:  results
    //   })
    // });
    // }
    // else {
    //   Movies.find( conditions ).sort({title: -1})
    //   .then((results) =>{
    //   res.json({
    //     success: true,
    //     movies:  results
    //   })
    // });
    // }

   });

   

   // rutas estaticas de diferente forma.
  const staticServerPathPublic = './src/public-react/'; 
  server.use(express.static(staticServerPathPublic));
  
  server.use(express.static('./src/public-movies-images/'));
  server.use(express.static('./src/public-movies-css/'));

 