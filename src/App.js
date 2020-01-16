import React, { Component } from 'react';
import Todos from './components/Todos';
import CreateTodo from './components/CreateTodo'

class App extends Component {
  state = {
    //Array of sample todos
    todos: [
      { edit:false, id:1, title:"Buy Vegitables", description:"Vegitables for this week", created_date:"12-01-2020" , deleted:false },
      { edit:false, id:2, title:"Shopping", description:"Monthly home goods", created_date:"14-01-2020", deleted:false }
    ]
  }

  componentDidMount(){
    this.getTodo();
  }

  //Delete todo
  deleteTodo = (id) => {
    console.log(id); //deleted item's id

    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos //todos: todos - no need to use since key and value having the same name
    });

    //Save to local storage
    localStorage.setItem("Todos",JSON.stringify(todos))
  }

  //Add todo
  addTodo = (todo) => {
    
    // this.state.todos.forEach(element => {
    //   if (element.title === todo['title']){  
    //     alert( "Title cannot be duplicate.!" );
    //     return;
    //   }
    //   else {
        
    //     return;
    //   }
    // })

    todo.id = Math.random();
        let todos = [...this.state.todos, todo];
        this.setState({
          todos
        }); 
        
        //Save to local storage
        localStorage.setItem("Todos",JSON.stringify(todos))
  }

  //Get data from local storage
  getTodo = () => {
    try {
      const todoos = localStorage.getItem("Todos");
      if( todoos === null) return undefined;
      this.setState({
        todos : JSON.parse(todoos)
      });
    }catch(e){
      console.log(e);
      return undefined;
    }
  }

  //Edit todo
  editTodo = (title) => {
    console.log(title); //selected item's id

    const todos = this.state.todos.filter(todo => {
      if(todo.title !== title){
        alert("duplicate");
      }
      return todo.title 
    });
    this.setState({
      todos
    });
  }

  // fEdit = (i) => {
  //   let data = this.state.datas[i];
  //   this.refs.name.value = data.name;
  //   this.refs.address.value = data.address;

  //   this.setState({
  //     act: 1,
  //     index: i
  //   });

  //   this.refs.name.focus();
  // }  


  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <CreateTodo addTodo={this.addTodo} saveTodo={this.saveTodo}/>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;