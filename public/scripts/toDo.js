console.log('toDoPage');

document.addEventListener('DOMContentLoaded', function (){


    const listTasks = async () =>{
        let UserId =  JSON.parse(localStorage.getItem("user")??{})?.UserId;
        let options = {
            method: "GET",
            headers: {
              "content-type": "application/json"
            },
    
          }
        await fetch(`http://localhost:3000/tasks/get-tasks-by-userid/${UserId}`,options).then(res=>res.json()).then(data=>{
            if(data.length>0){
                data.map(listItem=>{

                    const li = document.createElement("li")
                        li.innerHTML = listItem?.taskDescription
                        document.getElementById("list").appendChild(li)
                })
            }
        })
    }
    listTasks()



    class taskEnter {
        constructor(taskDescription,UserId){
            this.taskDescription=taskDescription,
            this.UserId=UserId,
            this.status = 0;
        }
    }
    let toDoTask = document.getElementById("toDoForm");
    
        toDoTask?.addEventListener('submit', (e)=>{e.preventDefault(); onTaskEnter() });
    
       function onTaskEnter(){
        
        let task =  document.getElementById("userTask").value;
        let UserId =  JSON.parse(localStorage.getItem("user")??{})?.UserId;

       
        if(task){
            let taskEntered = new taskEnter(task,UserId)
            console.log('task entered is', taskEntered)

            let options = {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify(taskEntered),
        
              }
            fetch('http://localhost:3000/tasks/add-task', options)
                .then((data) => data.json()).then(data => {
                //   window.location.href="post.html"
                  console.log("add task data:---***", data)
                }).then( data=>{
                    document.getElementById("toDoForm").reset()
                    // let listItem=document.getElementById("list").innerText()
                    const li = document.createElement("li")
                    li.innerHTML = taskEntered?.taskDescription
                    document.getElementById("list").appendChild(li)


                }
                )
              // .catch(
              //     console.log('error')
              // )
              // console.log('newUserLogged in', newUserLogin)
            }
            
        }
       
    
    
    })
    
    