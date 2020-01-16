import React from 'react';

const Todos = ({todos, deleteTodo, editTodo}) => {

  const todoList = todos.length ? (
    todos.map(todo => {
      return (
        <div className="collection-item" key={todo.id}>
          <span>{todo.title} &nbsp; 
              <i className="btn green right" onClick={() => {deleteTodo(todo.id)}}>Complete</i>
              <i className="btn red right" onClick={() => {deleteTodo(todo.id)}}>Delete</i>   
              <i className="btn orange right" onClick={() => {editTodo(todo.id)}}>Edit</i>
          </span><br/>
          <span>{todo.description}</span><br/>
          <span>{todo.created_date}</span>
        </div>
      )
    })
  ) : (
    // If there isn't any todo's to display
    <p className="center">You have no todo's left, yay!</p>
  );

  return (
    <div className="todos collection">
      {todoList}
    </div>
  )
}

export default Todos;
