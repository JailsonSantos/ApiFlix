const express = require('express');
const router = express.Router();
const _ = require('underscore');

const Filme = require('../models/filme');
const Temporada = require('../models/temporada');

// Recuperar a tela HOME
router.get('/home', async (req, res) => {
  try {

    // Recuperar todos os filmes
    let filmes = await Filme.find({});
    let finalFilmes = [];

    // Recuperando temporadas
    for (let filme of filmes) {
      const temporadas = await Temporada.find({
        filme_id: filme._id
      });

      const newFilme = { ...filme._doc, temporadas };
      finalFilmes.push(newFilme);
    }

    // Misturar resultados aleatóriamente
    finalFilmes = _.shuffle(finalFilmes);

    // Definir o filme principal
    const principal = finalFilmes[0];

    // Separar por seções
    const secoes = _.chunk(finalFilmes, 5);

    res.json({ error: false, principal, secoes });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Selecionar todos os registros
router.get('/', async (req, res) => {
  try {
    const filmes = await Filme.find({});
    res.json({ error: false, filmes });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Selecionar um registro específico com ID 
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const filme = await Filme.findById(id);
    res.json({ error: false, filme });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Criar um registro
router.post('/', async (req, res) => {
  try {
    const filme = req.body;
    const response = await new Filme(filme).save();
    res.json({ error: false, filme: response });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Atualizar um registro
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const novo_filme = req.body;

    const filme = await Filme.findByIdAndUpdate(id, novo_filme);
    res.json({ error: false, filme })
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

// Deletar um registro
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Filme.findByIdAndDelete(id);

    res.json({ error: false });

  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;