// const express = require("express")
// const Task = require("../models/task")
// const router = express.Router()

// router

// .get('/getAllTasks', async (req, res) => {
//   try {
//     const tasks = await Task.getTasks();
//     res.send(tasks)
//   } catch(err) {
//     res.status(401).send({message: err.message})
//   }
// })
// module.exports = router



const express = require("express")
const Task = require("../models/task")
const router = express.Router()

router

// login post
.post('/add-task', async (req, res) => {
  try {
    const task = await Task.addTasks(req.body)
    res.send({success:"Task Added successfully!!"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})


.put("/edit-task",async (req,res)=>{
  try {
    const updatedTask = await Task.editTask(req.body)
    res.send(updatedTask);
  } catch (err) {
    res.status(401).send({message: err.message})
    
  }
})

.delete("/delete-task",async (req,res)=>{
  try {
    const deletedTask = await Task.deleteTask(req.body);
    res.send({success:"Deleted Successfully!!"})
  } catch (err) {
    res.status(401).send({message: err.message})
    
  }
})


.get("/get-tasks-by-userid/:userId",async(req,res)=>{
  try {
    // const {userId} = req.params;
    const userId = req.params.userId;

    const tasks = await Task.getTasksByUserId(userId);

    res.send(tasks)
    
  } catch (err) {
    res.status(401).send({message: err.message})
    
  }
})



module.exports = router;
