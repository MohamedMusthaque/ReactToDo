import React, { Component } from 'react';
import Todos from './components/Todos';
import CreateTodo from './components/CreateTodo'

class App extends Component {
  state = {
    //Array of sample todos
    todos: [
      {edit:false, id:1, title:"Buy Vegitables", description:"Vegitables for this week", created_date:"12-01-2020"},
      {edit:false, id:2, title:"Shopping", description:"Monthly home goods", created_date:"14-01-2020"}
    ]
  }

  //Delete todo
  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos //todos: todos - no need to use since key and value having the same name
    });
  }

  //Add todo
  addTodo = (todo) => {
    todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({
      todos
    });
  }

  //Edit todo
  editTodo = (todo) => {
    this.setState({
      edit:true
    });
  }

  render() {
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <CreateTodo addTodo={this.addTodo}/>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;