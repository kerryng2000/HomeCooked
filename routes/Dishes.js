const express = require('express')
const router = new express.Router()
const Dish = require('../models/Dish')

router.post('/', async(req, res) =>{
    const dish = new Dish({
        ...req.body,
        email: req.user.email
    })
})
router.get('/alldishes', auth,  async (req, res) => {
    try{
        const dishes = await Dish.find()
        res.status(201).send(dishes)
    }
    catch(error){
        res.status(500).send(error)
    }   
})
router.delete('/:id', auth, async (req, res) => {
    try{
        const dish = await Dish.findOneAndDelete({_id: req.params.id, owner: req.user._id })
        if(!dish){
            res.status(404).send()
        }
        res.send(dish)
    }
    catch(error){
        res.status(500).send()
    }
})
router.get('/', (req,res) => {
    res.json("Dish router")
})

module.exports = router