const allVaccine = require('../data/vaccine.json')
const path = require('path');
//const usersJSON = path.join(__dirname, '../data/vaccine.json');
//console.log({allVaccine})

const vaccineController = {
    index: (req, res) =>{
        res.render(path.resolve('./', './src/views/vaccines'));
    }
}

module.exports = vaccineController;