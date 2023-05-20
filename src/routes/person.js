const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
let Person = require ('../models/person.js');

router.get('/gente', async (req, res) => {
    const Persons = await Person.find({});
    res.render( Persons);
});

router.get('/addPerson', (req, res) => {
    res.render('add/Person');
});

router.post('/addPerson', (req, res) => {
    const newPerson = Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });

    newPerson
    .save()
    .then((data)=>{res.redirect('/gente')})
    .catch((error)=>{res.json({message:error})});
});

router.get('/findById/:id', (req, res)=>{
    Person.findById(req.params.id)
    .then((myPerson)=>{res.render('personUpdate', {myPerson})})
    .catch((error)=>{res.json({message:error})});
});

router.post('/updatePerson', (req, res)=>{
    Person.findById(req.params.objId,
        {
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipoSangre: req.body.tipoSangre,
            nss: req.body.nss
        })
        .then((data)=>{res.redirect('/gente')})
        .catch((error)=>{res.json({message:error})});
})

router.get('/deletePerson', (req, res)=>{
    Person.findById(req.params.id,
    {
        nss: req.body.nss
    })
    .then((myPerson)=>{res.render('/gente', {myPerson})})
    .catch((error)=>{res.json({message:error})});
    //await dotenv.deleteOne({ _id: entry._id });
});

module.exports = router;