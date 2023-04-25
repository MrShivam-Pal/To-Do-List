window.addEventListener("load" , () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#new-task");
    const tasks = document.querySelector("#tasks");
    const ls = localStorage.getItem("todo");
    let todo = ls ? JSON.parse(ls) : [];

    for( i in todo){
        create_element(todo[i]);
    }

    form.addEventListener("submit" , (e) => {
        e.preventDefault();

        const task = input.value;

        if(!task){
            alert("Please Enter Your Task!");
            return;
        }
        input.value = "";
        create_element(task);

    });

    function create_element(text){
        const taskbar = document.createElement('div');
        const taskbar_content = document.createElement('div');
        const task_input = document.createElement('input');
        const taskbar_control = document.createElement('div');
        const control_edit = document.createElement("button");
        const control_delete = document.createElement("button");


        taskbar.classList.add("task"); 
        taskbar_content.classList.add("content");
        task_input.classList.add("text");
        task_input.type = "text";
        task_input.setAttribute("readonly" , "readonly");
        task_input.value = text;
        taskbar_control.classList.add("controls");
        control_edit.classList.add("edit");
        control_edit.innerText = "Edit";
        control_delete.innerText = "Delete"
        control_delete.classList.add("delete");
        

        taskbar.appendChild(taskbar_content);
        tasks.appendChild(taskbar);
        taskbar_content.appendChild(task_input);
        taskbar_control.appendChild(control_edit);
        taskbar_control.appendChild(control_delete);
        taskbar.appendChild(taskbar_control);

        if(!todo.includes(text)){
            todo.push(text);
            localStorage.setItem('todo' , JSON.stringify(todo));    
        }

        control_edit.addEventListener('click' ,(e) => {

            if(control_edit.innerText == "Edit"){
                let val  = task_input.value;
                todo = del(todo , val);
                task_input.removeAttribute("readonly");
                task_input.focus();
                control_edit.innerText = "Save";
            }
            else{
                val  = task_input.value;
                todo.push(val);
                task_input.setAttribute("readonly" , "readonly");
                control_edit.innerText = "Edit";
            }

        localStorage.setItem('todo' , JSON.stringify(todo));
    } );

    control_delete.addEventListener('click', () => {
        let val  = task_input.value;
        todo = del(todo , val);
        localStorage.setItem('todo' , JSON.stringify(todo));
        tasks.removeChild(taskbar);
    });

    function del(todo , val){
        for( i=0;i<todo.length - 1;i++){
            if(todo[i] == val){
              [todo[i] , todo[i+1]] = [todo[i+1],todo[i]];
            }
        }
        todo =  todo.slice(0 , todo.length - 1);
        return todo;
    }

    }

}); 
