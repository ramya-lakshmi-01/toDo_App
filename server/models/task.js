// const tasks=[
//     {
//         taskTitle:"walking",
//         taskDescription:"for 30 minutes"
//     },
//     {
//         taskTitle:"cooking",
//         taskDescription:"cook healthy"
//     },
//     {
//         taskTitle:"read",
//         taskDescription:"read a book"
//     }
// ];

// let getTasks = () => tasks

// module.exports={getTasks}


const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      TaskId INT NOT NULL AUTO_INCREMENT,
      UserId INT NOT NULL,
      taskDescription VARCHAR(255) NOT NULL,
      taskStatus BOOLEAN NOT NULL,
      CONSTRAINT TaskPK PRIMARY KEY(TaskId));`

      await con.query(sql)
}

createTable()


// add new Tasks

async function addTasks(task){
    let sql = `
    INSERT INTO tasks(UserId, taskDescription,taskStatus)
    VALUES("${task.UserId}", "${task.taskDescription}", "${task.taskStatus??0}")
  `

  await con.query(sql)
  return true
}


async function editTask(updatedTask){
  const existingTask = await getTaskByTaskId(updatedTask.TaskId);
  if(existingTask.length>0){

    let sql = `UPDATE tasks
      SET taskDescription="${updatedTask.taskDescription}", taskStatus=${updatedTask.taskStatus}
      WHERE TaskId = ${updatedTask.TaskId}
    `
    await con.query(sql);
  
    const task = await getTaskByTaskId(updatedTask.TaskId);
    return task[0];

  }else{
     throw Error("The task you are trying to edit does not exist!!")
  }

}

async function deleteTask(task){
  let sql = `
  DELETE FROM tasks WHERE TaskId=${task.TaskId}`
  await con.query(sql);

  return true;
}

async function getTasksByUserId(userId){
  let sql=`
  SELECT * FROM tasks WHERE UserId=${userId}`

  return await con.query(sql);
}


async function getTaskByTaskId(taskId){
  let sql = `
  SELECT * FROM tasks WHERE TaskId=${taskId}
  `
  return await con.query(sql);
}




// Register (Create) New User
async function register(user) {
  let userResult = 
  await getUser(user.username)
  if(userResult.length > 0) throw Error("Username already in use!!")

  let sql = `
    INSERT INTO users(UserName, Password, Email)
    VALUES("${user.username}", "${user.password}", "${user.email}")
  `

  await con.query(sql)
  const newUser = await getUser(user.username)
  return newUser[0]
}

// Update - CRUD
async function editUser(user) {
  let updatedUser = await getUser(user.username)
  if(updatedUser.length > 0) throw Error("Username not available!")

  let sql = `UPDATE users
    SET UserName = "${user.username}"
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
  updatedUser = await getUser(user.username)
  return updatedUser[0]
}

// Delete User 
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE UserId = ${user.UserId}
  `
  await con.query(sql)
}

// Useful functions
async function getUser(username) {
  let sql = `
    SELECT * FROM users 
    WHERE UserName = "${username}" 
  `
  return await con.query(sql)
}

module.exports = {addTasks, editTask, deleteTask,getTasksByUserId}