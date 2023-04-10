const mongoose = require('mongoose');

const dbConnect = () => {
  const user = 'admin';
  const pass = 'WEMqHJQU90NEGa6w';
  const dbName = 'netflix';

  const uri = `mongodb+srv://${user}:${pass}@cluster0.7sdcrz4.mongodb.net/${dbName}?retryWrites=true&w=majority`;


  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('conectado a mongodb'))
    .catch((e) => console.log('error de conexión', e));
};
module.exports = dbConnect;

//WEMqHJQU90NEGa6w