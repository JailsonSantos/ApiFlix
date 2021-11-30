const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');

// Login
router.post('/login', async (req, res) => {
  try {
    const credentials = req.body;
    const usuario = await Usuario.findOne(credentials);

    if (usuario) {
      res.json({ error: false, usuario });
    } else {
      res.json({ error: true, message: "Nenhum usuário encontrado!" });
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
});

module.exports = router;