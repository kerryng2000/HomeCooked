const Router = require("express").Router();

//Message Model
const Message = require("../models/Message");


Router.post('/SendMessage', (req, res) =>{
  const  message = new Message({
    sender: req.body.sender,
    reciever: req.body.reciever,
    text: req.body.text
  });
  try{
      message.save()
      res.status(201).send(message)
  }
  catch (error){
      res.status(400).send(error)
  }
})

module.exports = Router;