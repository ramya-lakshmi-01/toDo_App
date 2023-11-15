console.log('toDoPage');

document.addEventListener('DOMContentLoaded', function (){

    class taskEnter {
        constructor(taskDescription){
            this.taskDescription=taskDescription
        }
    }
    let toDoTask = document.getElementById("toDoForm");
    
        toDoTask?.addEventListener('submit', (e)=>{e.preventDefault(); onTaskEnter() });
    
       function onTaskEnter(){
        
        let task =  document.getElementById("userTask").value;
       
        if(task){
            let taskEntered = new taskEnter(task)
            console.log('task entered is', taskEntered)
        }
       
    }
    
    })
    
    