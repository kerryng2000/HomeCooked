const router = require('express').Router();
let Dish = require('../models/dish.model');

router.route('/').get((req, res) => {
  Dish.find()
    .then(dishes => res.json(Dish))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.Name;

  const newDish = new Dish({name});

  newDish.save()
    .then(() => res.json('Dish added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;