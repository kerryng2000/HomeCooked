const express = require('express')
const router = new express.Router()
const Dish = require('../models/Dish')

router.post('/AddDish', (req, res) =>{
    const newDish = new Dish({
        name: req.body.name,
        price: req.body.price,
        chef: req.body.chef,
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
   
        const dishes =  await Dish.find()
        res.send(dishes)
      
})
router.delete('/:id', (req, res) => {
    try{
        const dish = Dish.findOneAndDelete({_id: req.params.id, chef: req.user._id })
        if(!dish){
            res.status(404).send()
        }
        res.send(dish)
    }
    catch(error){
        res.status(500).send()
    }
})
router.get('/', (req, res) => {
    res.json("Dish router")
})

module.exports = router