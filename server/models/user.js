// const users=[
//     {
//         username:"Ramya",
//         password:"ramya123",
//         email:'ramya@gmail'
//     },
//     {
//         username:"Lakshmi",
//         password:"Lakshmi123",
//         email:'lakshmi@gmail'
//     },
//     {
//         username:"Keerthi",
//         password:"killerKeerthi",
//         email:'killerKeerthi@gmail'
//     }

// ];

// let getUsers = () => users

// module.exports={getUsers}

const con = require("./db_connect");

async function createTable() {
  let sql = `
    CREATE TABLE IF NOT EXISTS users (
      UserId INT NOT NULL AUTO_INCREMENT,
      UserName VARCHAR(25) NOT NULL,
      Password VARCHAR(255) NOT NULL,
      Email VARCHAR(255) NOT NULL,
      CONSTRAINT UserPK PRIMARY KEY(UserId));`

      await con.query(sql)
}

createTable()

// CRUD
// Read - Login User 

// Testing out login function
// let newUser = {
//   username: "cathy123",
//   password: "icecream"
// }

// login(newUser);

async function login(user) {
  console.log('user: ', user);
  let userResult = await getUser(user.username)
  if(!userResult[0]) throw Error("Username not found!!")
  if(userResult[0].Password != user.password) throw Error("Password Incorrect!!")

  return userResult[0]
}

// Register (Create) New User
async function register(user) {
  console.log('reg user recieved ip', user)
  let userResult = await getUser(user.userName)
  let userMail = await getUserMail(user.userEmail) 
  console.log('userResult: ', userResult);
  if(userResult.length > 0) throw Error("Username already in use!!")
  if(userMail.length > 0) throw Error("Email already in use!!")

  let sql = `
    INSERT INTO users(UserName, Password, Email)
    VALUES("${user.userName}", "${user.userPassword}", "${user.userEmail}")
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
  console.log('username: ', username);
  let sql = `
    SELECT * FROM users 
    WHERE UserName = "${username}" 
  `
  return await con.query(sql)
}
async function getUserMail(userEmail) {
  console.log('userMail: ', userEmail);
  let sql = `
    SELECT * FROM users 
    WHERE Email = "${userEmail}" 
  `
  return await con.query(sql)
}

module.exports = {login, register, editUser, deleteUser}