const express = require('express')
const router = new express.Router()
const Dish = require('../models/Dish')

router.post('/', async(req, res) =>{
    const dish = new Dish({
        ...req.body,
        email: req.user.email
    })
})

router.get('/', (req,res) => {
    res.json("Dish router")
})

module.exports = router