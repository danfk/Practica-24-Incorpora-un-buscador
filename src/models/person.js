const mongoose =  require ('mongoose');

let PersonSchema = new mongoose.Schema({
        nombre: String,
        edad: String,
        tipoSangre: String,
        nss: String
});

router.post('/find',(req, res)=>{
        PersonSchema.find({ nombre: { $regex: req.body.criteria, $options: "i" } })
        .then((Persons)=>{res.render('persons', {Persons})})
        .catch((error)=>{res.json({message:error})});
});

module.exports = mongoose.model('Person', PersonSchema);