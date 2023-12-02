const express = require("express")
const User = require("../models/user")
const router = express.Router()

router

.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.getUsers();
    res.send(users)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})
module.exports = router