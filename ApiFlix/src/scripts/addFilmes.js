const database = require('../services/database');

const Filme = require('../models/filme');
const filmesJSON = require('../data/filme.json');

const addFilmes = async () => {
  try {
    for (let filme of filmesJSON) {
      console.log(`Inserindo ${filme.titulo}`)
      await new Filme(filme).save();
    }
    console.log('Final do Script')
  } catch (error) {
    console.log(error.message);
  }
};


addFilmes();