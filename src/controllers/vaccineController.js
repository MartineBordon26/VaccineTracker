const vaccines = require('../data/vaccine.json')
const path = require('path');
const { validationResult } = require("express-validator");
const fs = require('fs');
const vaccineJSON = path.join(__dirname, '../data/vaccine.json');
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
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/vaccine/createVaccine'), {errors: errors.mapped(), oldData: req.body});
        }

        let {commercialName, laboratory, vaccineType, originCountry, manufactureDate, expirationDate, purchaseDate, acquisitionDate} = req.body;
        console.log("req.body ",req.body)


        const generateId = () =>  {
            let allVaccines = JSON.parse(fs.readFileSync(vaccineJSON, {encoding: 'utf-8'}));
            let lastVaccine = allVaccines.pop();
            if (lastVaccine) {
                return lastVaccine.id + 1;
            }
            return 1;
        }

        let newVeccine = {
            id: generateId(),
            name_commercial: commercialName,
            laboratory: laboratory,
            vaccineType: vaccineType,
            originCountry: originCountry,
            manufactureDate,
            expirationDate,
            purchaseDate,
            acquisitionDate
        }

        vaccines.push(newVeccine);
        fs.writeFileSync(vaccineJSON, JSON.stringify(vaccines, null, ' '));




        res.redirect('/vaccines');
    },
    edit: (req, res) =>{
        const vaccineID = vaccines.find(vaccine => vaccine.id == req.params.id);
        console.log(vaccineID)
        res.render(path.resolve('./', './src/views/vaccine/editVaccine'), {vaccineID})
    },
    update: (req, res) =>{
        const vaccineID = vaccines.find(vaccine => vaccine.id == req.params.id);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/vaccine/editVaccine'), {errors: errors.mapped(), oldData: req.body, vaccineID});
        }

        let idVaccine = req.params.id;

    }
    

}

module.exports = vaccineController;