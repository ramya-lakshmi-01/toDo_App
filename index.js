const express = require('express')
const app = express()
const path = require('path')
const cors = require("cors")

app.use(cors());

app.use(express.json()); // parse JSON bodies

const userRoutes = require('./server/routes/user')
const taskRoutes = require('./server/routes/tasks')
//route to at least one other entity that is NOT user/customer/etc.

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)
// app.use for routes above

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}!!!`))