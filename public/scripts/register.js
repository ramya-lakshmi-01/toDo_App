console.log('registerPage');
document.addEventListener('DOMContentLoaded', function (){

    class RegisteredUser {

        constructor(email,username,password){
            console.log('email,username,password: ', email,username,password);
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
            // let registeredUser={


            // }
            console.log('Registered user details', registeredUser);
            //fetch('route',data,method)

            fetch('http://localhost:3000/users/register',{
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(registeredUser),
        
              }).then((data)=>data.json()).then(data=>{
                console.log('msg is for register', data.message);
                if(data.message!='Username already in use!!' && data.message!='Email already in use!!'){
                    window.location.href="login.html";
                }else if(data.message=='Username already in use!!'){
                    console.log('reg user is 1', data.message,data)
                    alert(`Username already in use!!`)
                }else if(data.message=='Email already in use!!'){
                    alert('Email already in use!!')
                }
              })
           //bgfgg      | khjg      | tehz@nxfg1 
        }
       
    }
    
    })
    
    