/*
 * ToDo List
 *
 */

// Container for List
var todo = {};

todo.model = function (title, done){
    return data = {
        title: title,
        done: done,
        created: Date.now()
    };
};

todo.getTodos = function (){
  if (user.auth()){
    var data = app.config.todoList; //JSON.parse(localStorage.getItem(user.email+"_todo"));
    console.log(data);
    var div = document.getElementById("todo-titles");
    div.innerHTML = "";
    if (data==null){
      console.log("no-data");
    } else {
      var ulData=document.createElement("UL");
      ulData.classList.add("list");
      for (var i=0; i<data.length; i++){
        var listViewItem=document.createElement('LI');
        var form=document.createElement("FORM");
        form.name="edit-todo-form";
        form.classList.add("edit-todo-form");
        // listViewItem.appendChild(addButton("add", "+", ["todo-list", "btn-add"]));
        // form.appendChild(addButton("edit", "edit", ["todo-list", "btn-edit"]));
        form.appendChild(helpers.addSubmit("save", "save", ["todo-list", "btn-add"]));
        // form.appendChild(addSubmit("delete", "del", ["todo-list", "btn-delete"]));
        form.appendChild(helpers.addCheckBox("done", data[i].done));
        form.appendChild(helpers.addInput("title", data[i].title));
        form.appendChild(helpers.addInput("id", i, "hidden"));
        // form.appendChild(addDiv(data[i].title, 'todo-list'));
        // listViewItem.appendChild(document.createTextNode(data[i].title));
        listViewItem.appendChild(form);
        ulData.appendChild(listViewItem);
      }
      div.appendChild(ulData);
      // bindClick("button.todo-list", "name");
      helpers.bindClick("input[type='submit'].todo-list", "app", "name");
    }
  }
};

todo.setTodos = function (todoItem){
// todo.setTodos = function (title, done){
  if (user.auth()){
    // var todoItem = todo.model(title, done);
    // var data = JSON.parse(localStorage.getItem("ernestoharias@gmail.com_todo"));
    var data = app.config.todoList;//JSON.parse(localStorage.getItem(user.email+"_todo"));
    if (data==null){
      var todo = [];
      todo.push(todoItem);
      localStorage.setItem(app.config.user.email+"_todo", JSON.stringify(todo));//add new todo
      app.config.todoList = todo;
      return true;
    } else {
      if (!helpers.isDuplicated(data, "title", todoItem.title)){
        data.push(todoItem);
        localStorage.setItem(app.config.user.email+"_todo", JSON.stringify(data));//update existing todos
        app.config.todoList = data;
        return true;
      } else {
        return false;
      }
    }
  }
};
