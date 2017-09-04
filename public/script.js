const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const ACTIVE_TODO_ID = "todo_list_active"
const COMPELTE_TODO_ID = "todo_list_complete"
const DELETE_TODO_ID = "todo_list_delete"
const TODO_ID_NEW = "todo_input"
const STATUS_ACTIVE = "ACTIVE"
const STATUS_COMPLETE = "COMPLETE"
const STATUS_DELETE = "DELETED"

window.onload = getTodosAJAX();

function removeChildNode(parent) {
    while(parent.hasChildNodes())
    {
        parent.removeChild(parent.lastChild);
    }
}

//add todo elements
function addTodoElements(todo_data_json) {

    var todos = JSON.parse(todo_data_json);
    var complete_parent = document.getElementById(COMPELTE_TODO_ID);
    var active_parent = document.getElementById(ACTIVE_TODO_ID);
    var delete_parent = document.getElementById(DELETE_TODO_ID);

    removeChildNode(active_parent)
    removeChildNode(complete_parent);
    removeChildNode(delete_parent);

    for(_id in todos)
    {
        if(todos[_id].status === STATUS_ACTIVE)
        {
            active_parent.appendChild(activeCreateElement(_id,todos[_id]));
        }
        if(todos[_id].status === STATUS_COMPLETE)
        {
            complete_parent.appendChild(completeCreateElement(_id,todos[_id]));
        }
        if(todos[_id].status === STATUS_DELETE)
        {
            delete_parent.appendChild(deleteCreateElement(_id,todos[_id]));
        }
    }
}

//active elements section
function activeCreateElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id",_id);
    todo_element.appendChild(createCheckbox(_id, todo_object));
    todo_element.appendChild(createTitle(todo_object));
    todo_element.appendChild(createDeleteX(_id));
    return todo_element;
}

//complete elements section
function completeCreateElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id", _id);
    todo_element.appendChild(createCheckbox(_id, todo_object));
    todo_element.appendChild(createTitle(todo_object));
    todo_element.appendChild(createDeleteX(_id));
    return todo_element;
}

//deleted elements section
function deleteCreateElement(_id,todo_object) {
    var todo_element = document.createElement("div");
    todo_element.setAttribute("data-id", _id);
    todo_element.appendChild(createTitle(todo_object));
    return todo_element;
}

//checkbox
function createCheckbox(_id,todo_object) {
    var _div = document.createElement("div");
    var checkbox = document.createElement("input");
    _div.setAttribute("class", "col-xs-2");
    _div.setAttribute("align", "right");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onchange", "getCompleteTODOAJAX(" + _id + ")");
    if (todo_object.status === STATUS_COMPLETE ) {
        checkbox.checked = true;
        checkbox.setAttribute('onchange', "getActiveTODOAJAX(" + _id + ")");
    }
    _div.appendChild(checkbox);
    return _div;

}


function createTitle(todo_object) {
    var todo_text = document.createElement("div");
    todo_text.setAttribute("class", "col-xs-8 todoStatus" + todo_object.status);
    todo_text.innerText = todo_object.title;
    return todo_text;
}

//Delete button
function createDeleteX(_id) {
    var x_div = document.createElement("div");
    var delete_x = document.createElement("button");
    delete_x.setAttribute("class", "btn btn-link");
    delete_x.innerHTML = "X";
    delete_x.setAttribute("onclick", "getDeletedTODOAJAX(" + _id + ")");
    x_div.appendChild(delete_x);
    return x_div;
}

//visibility button of compete todos section
function completeVisibilityToggle() {
    var content = document.getElementById(COMPELTE_TODO_ID);
    if(content.style.display == 'none')
        content.style.display = 'block';
    else
        content.style.display = 'none';
}

//visibility button of deleted todos section
function deleteVisibilityToggle() {
    var content = document.getElementById(DELETE_TODO_ID);
    if(content.style.display == 'none')
        content.style.display = 'block';
    else
        content.style.display = 'none';
}

// Get all the todos
function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                addTodoElements(xhr.responseText);
            } else {
                var resp = JSON.parse(xhr.responseText);
                alert(resp.error);
            }
        }
    };
    xhr.send(data = null);
}

//Add todo
function addTodoAJAX() {
    var title = document.getElementById(TODO_ID_NEW).value;
    console.log(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_title="+encodeURI(title) ;
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {
                addTodoElements(xhr.responseText);
            }
            else{
                var resp = JSON.parse(xhr.responseText);
                alert(resp.error);
            }
        }

    }
    xhr.send(body_data);
}

//get deleted todos
function getDeletedTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT", "/api/todos/" + id);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status="+encodeURI(STATUS_DELETE);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

//get active todos
function getActiveTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT","api/todos/"+id);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status="+(STATUS_ACTIVE);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText); //sending responses
                console.log(xhr.responseText);

            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}

//get completed todos
function getCompleteTODOAJAX(id) {
    var xhr = new XMLHttpRequest();
//xhr - JS object for making requests to server via JS
    xhr.open("PUT","api/todos/"+id,true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var body_data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status ==  STATUS_OK)
            {

                addTodoElements(xhr.responseText); //sending responses
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(body_data);
}