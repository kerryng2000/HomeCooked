const express = require('express')
const router = new express.Router()
const Dish = require('../models/Dish')
const mongoose = require("mongoose");
const multer = require('multer');
const passport = require("passport");
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
      cb(null, true);
    else cb(null, false);
  };
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
  });

router.post('/AddDish', passport.authenticate("jwt", { session: false }), (req, res) =>{
    const newDish = new Dish({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        chef: req.user._id,
        stock: req.body.stock
      });
    try{
        newDish.save()
        res.status(201).send(newDish)
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.get('/allDishes',  async(req, res) => {
   
        const dishes =  await Dish.find().populate("chef", "firstName lastName")
        res.send(dishes)
      
})
router.get('/:id',  async(req, res) => {
    try{
    const dish = await Dish.find({_id: req.params.id})
    if(!dish){
        res.status(404).send()
    }
    res.send(dish)
}
catch(error){
    console.log(error)
}
})
router.get('/', (req, res) => {
    res.json("Dish router")
})

module.exports = router