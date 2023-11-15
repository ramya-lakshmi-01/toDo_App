console.log('registerPage');
document.addEventListener('DOMContentLoaded', function (){

    class RegisteredUser {
        constructor(email,username,password){
            this.userEmail= email,
            this.userName=username,
            this.userPassword=password

        }
    }
    let userRegistered = document.getElementById("registerForm");
    
        userRegistered?.addEventListener('submit', (e)=>{e.preventDefault(); onUserRegister() });
    
       function onUserRegister(){
        
        let regUsername =  document.getElementById("regUsername").value;
        let regPassword =  document.getElementById("regPasssword").value;
        let regEmail =  document.getElementById("regEmail").value;
        if(regUsername && regPassword && regEmail){
            let registeredUser = new RegisteredUser(regEmail,regUsername,regPassword);
            console.log('Registered user details', registeredUser);
        }
       
    }
    
    })
    
    