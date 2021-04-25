const Router = require("express").Router();


//Message Model
const Message = require("../models/Message");

Router.get("/",  async (req, res) => {
  try {
    const messages = await Message.find({ reciever: req.user.email });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: [{ msg: "Server Error" }] });
  }
});

Router.get('/:id',  async(req, res) => {
  try{
    const messages = await Message.find({ reciever: req.params.id});
  res.json(messages)
} catch (err) {
  console.error(err.message);
  res.status(500).json({ error: [{ msg: "Server Error" }] });
}
});


module.exports = Router;