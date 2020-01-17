import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Todos Daily',
      act: 0,
      index: '',
      datas: [],
      removed: []
    }
    this.form = React.createRef();
  }

  componentDidMount() {
    this.refs.name.focus();
    this.GetDataTodos();
    this.GetDataDeletedTodos();
  }

  //Get data from local storage of todos
  GetDataTodos = () =>{
    try {
      const todoos = localStorage.getItem("Todos");
      if (todoos === null) return undefined;
      this.setState({
        datas: JSON.parse(todoos)
      });
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  //Get data from local storage of deleted todos
  GetDataDeletedTodos = () =>{
    try {
      const deletedtodoos = localStorage.getItem("RemovedTodos");
      if (deletedtodoos === null) return undefined;
      this.setState({
        removed: JSON.parse(deletedtodoos)
      });
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

  //Create a new todo
  CreateTodo = (e) => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let date = this.refs.date.value;

    if (this.state.act === 0) {   //new
      let data = {
        name, date, description
      }

      //Check title duplication
      datas.forEach(item => {
        if(item.name === name){
          console.log('Item duplicate here ', name );
          alert('Duplicate title')
          return item 
        } 
        else{
          if(item.name !== name){
          datas.push(data);
          }
        }
      });
      
      // if(name.match("^[a-zA-Z ]*$") !== null){
      //       datas.push(data);
      // }
      
      // if(!name || !date){
      //   alert("Fields or Field can't be empty.!");
      // }
      // else{
      //   if(name.match("^[a-zA-Z ]*$") != null){
      //     datas.push(data);
      //   }
      // }
      
    } else {                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].date = date;
      datas[index].description = description;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

    //Save to local storage
    localStorage.setItem("Todos", JSON.stringify(datas))
  }

  //Remove the todo from the list
  RemoveTodo = (i) => {
    let datas = this.state.datas;
    let removedList = this.state.removed;
    let removeitem = datas.splice(i, 1);
    console.log('Removed ', removeitem[0].name);
    removedList.push(removeitem);
    console.log('Removed ', removedList); 
    
    this.setState({
      datas: datas,
      removed: removedList
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

    //Save to local storage
    localStorage.setItem("Todos", JSON.stringify(datas));
    localStorage.setItem("RemovedTodos", JSON.stringify(removedList));
  }

  //Edit the selected todo from the list
  EditTodo = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.date.value = data.date;
    this.refs.description.value = data.description;
    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }

  render() {
    let datas = this.state.datas;
    let removed = this.state.removed;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Title" className="formField" required />
          <input type="text" ref="description" placeholder="Description" className="formField" />
          <input type="date" ref="date" className="formField" required />
          <button type="submit" onClick={(e) => this.CreateTodo(e)} className="myButton">submit </button>
        </form>

        {/* Read all the todos */}
        <pre className="collection-item">
          {datas.map((data, i) =>
            <li key={i}>
              {i + 1}. {data.name}, {data.date}, {data.description}
              <button onClick={() => this.RemoveTodo(i)} className="red center">remove </button>
              <button onClick={() => this.EditTodo(i)} className="green denter">edit </button>
            </li>
          )}
        </pre>

        {/* Read the deleted todos */}
        <pre className="collection-item">
          Deleted todos
          {removed.map((ele, j) =>
            <li key={j} className="myList">
              {j + 1}. {ele[0].name}, {ele[0].date}, {ele[0].description}
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
