console.log("loginPage");
document.addEventListener('DOMContentLoaded', function (){

class userLogin {
    constructor(userName, password){
        this.loginUsername=userName,
        this.loginPassword=password
    }
}
let loginSubmit = document.getElementById("loginForm");

    loginSubmit?.addEventListener('submit', (e)=>{e.preventDefault(); onUserLogin() });

   function onUserLogin(){
    
    let loginUsername =  document.getElementById("loginUsername").value;
    let loginPassword =  document.getElementById("loginPassword").value;
    
    if(loginUsername && loginPassword){
        // if(document.getElementById("loginUsername").value && document.getElementById("loginPassword").value){
        let newUserLogin = new userLogin(document.getElementById("loginUsername").value,document.getElementById("loginPassword").value);
        console.log('newUserLogged in', newUserLogin)
    }
   
}

})

