const database = require('../services/database');
const Filme = require('../models/filme');
const filmesLogoMobileJSON = require('../data/filmeLogoMobile.json');

const addUsers = async () => {
  try {
    for (let filmeLogoMobile of filmesLogoMobileJSON) {
      await Filme.findByIdAndUpdate(filmeLogoMobile.filme_id, {
        logoMobile: filmeLogoMobile.logoMobile,
      });
    }
    console.log('Final do Script');
  } catch (err) {
    console.log(err.message);
  }
};

addUsers();
