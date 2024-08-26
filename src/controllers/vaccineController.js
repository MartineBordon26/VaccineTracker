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
        const vaccine = vaccines.find(vaccine => vaccine.id == req.params.id);
        console.log("es una cadenaaa? ", vaccine)
        res.render(path.resolve('./', './src/views/vaccine/editVaccine'), {vaccine})
    },
    update: (req, res) =>{
        const vaccineID = vaccines.find(vaccine => vaccine.id == req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render(path.resolve('./', './src/views/vaccine/editVaccine'), {errors: errors.mapped(), oldData: req.body, vaccineID});
        }

        let idVaccine = req.params.id;
        console.log("id params ",idVaccine)
        let { name_commercial, laboratory, vaccineType, originCountry, manufactureDate, expirationDate, purchaseDate, acquisitionDate } = req.body
        let indexVaccine = vaccines.findIndex(vacc => vacc.id == idVaccine);
        if (indexVaccine != -1){
            vaccines[indexVaccine].name_commercial = name_commercial;
            vaccines[indexVaccine].laboratory = laboratory;
            vaccines[indexVaccine].vaccineType = vaccineType;
            vaccines[indexVaccine].originCountry = originCountry;
            vaccines[indexVaccine].manufactureDate = manufactureDate;
            vaccines[indexVaccine].expirationDate = expirationDate;
            vaccines[indexVaccine].purchaseDate = purchaseDate;
            vaccines[indexVaccine].acquisitionDate = acquisitionDate;

            fs.writeFileSync(vaccineJSON, JSON.stringify(vaccines, null, ' '));
            
            res.redirect('/vaccines');
        }else {
            res.send('Vaccine no encontrado');
        }
    },
}

module.exports = vaccineController;