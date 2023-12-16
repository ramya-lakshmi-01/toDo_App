console.log("loginPage");
document.addEventListener('DOMContentLoaded', function () {

  // class userLogin {
  //   constructor(userName, password) {
  //     this.loginUsername = userName,
  //       this.loginPassword = password
  //   }
  // }
  let loginSubmit = document.getElementById("loginForm");

  loginSubmit?.addEventListener('submit', (e) => { e.preventDefault(); onUserLogin() });

  async function onUserLogin() {

    let loginUsername = document.getElementById("loginUsername").value;
    let loginPassword = document.getElementById("loginPassword").value;
    console.log('data reflected')
    if (loginUsername && loginPassword) {
      // if(document.getElementById("loginUsername").value && document.getElementById("loginPassword").value){
      let user = {
        username: loginUsername,
        password: loginPassword
      }
      // let newUserLogin = new userLogin(document.getElementById("loginUsername").value,document.getElementById("loginPassword").value);
      console.log('newUserLogin', user)
      let options = {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user),

      }
      await fetch('http://localhost:3000/users/login', options)
        .then((data) => data.json()).then(data => {
          console.log('msg is', data.message)
          if(data.message!='Username not found!!' && data.message!="Password Incorrect!!"){
            localStorage.setItem("user",JSON.stringify(data))
            window.location.href="post.html"
          }else if(data.message=='Username not found!!'){
            alert(`Username not found!!`)
          }else if(data.message=='Password Incorrect!!'){
            alert(`Password Incorrect!!`)
          }
          
          console.log("data:---***", data)
        })
      // .catch(
      //     console.log('error')
      // )
      // console.log('newUserLogged in', newUserLogin)
    }

  }
  // async function fetchData(route, data, methodType) {
  //   const response = await fetch(`http://localhost:3000${route}`, {
  //     method: methodType, // *POST, PUT, DELETE, etc.
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   if (response.ok) {
  //     return await response.json();
  //   } else {
  //     throw await response.json();
  //   }
  // }



})

// export async function fetchData(route = '', data = {}, methodType) {
//     const response = await fetch(`http://localhost:3000${route}`, {
//       method: methodType, // *POST, PUT, DELETE, etc.
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data) 
//     });
//     if(response.ok) {
//       return await response.json(); 
//     } else {
//       throw await response.json();
//     }
// }