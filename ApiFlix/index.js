const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const database = require('./src/services/database');
const cors = require('cors');
const app = express();

const filmeRoutes = require('./src/routes/filmes.routes');
const usuarioRoutes = require('./src/routes/usuarios.routes');
const episodioRoutes = require('./src/routes/episodios.routes');
// o Morgan Só vai funcionar em ambiente de desenvolvimento
// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// ROUTES
app.use('/', filmeRoutes); // prefixo global das rotas
app.use('/usuario', usuarioRoutes);
app.use('/episodio', episodioRoutes);

app.listen(8000, () => {
  console.log('Meu servidor está funcionando');
});