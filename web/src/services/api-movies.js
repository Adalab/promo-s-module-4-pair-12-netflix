// login

const getMoviesFromApi = (params) => {
  //params puede ser cualquier palabra. ejemplo:pepino
  //sort y gender vienen del valor del name de los inputs.
  console.log(params.gender);
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`//localhost:4000/movies_all_mongo?gender=${params.gender}&sort=${params.sort}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => {
      return data;
    });

};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
