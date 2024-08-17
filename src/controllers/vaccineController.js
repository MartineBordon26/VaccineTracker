const vaccines = require('../data/vaccine.json')
const path = require('path');
const { validationResult } = require("express-validator");

//const usersJSON = path.join(__dirname, '../data/vaccine.json');
//console.log({allVaccine})

const vaccineController = {
    index: (req, res) =>{
        res.render(path.resolve('./', './src/views/vaccine/vaccines'), { vaccines: vaccines });
    },
    create: (req, res) =>{
        res.render(path.resolve('./', './src/views/vaccine/createVaccine'))
    },
    save: (req, res) =>{
        console.log("body ", req.body)
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/vaccine/createVaccine'), {errors: errors.mapped(), oldData: req.body});
        }
        res.redirect('/vaccines');
    },
}

module.exports = vaccineController;