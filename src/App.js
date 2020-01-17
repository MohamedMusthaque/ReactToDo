import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "ToDo's ",
      act: 0,
      index: '',
      datas: [],
      removed: []
    }
  }

  componentDidMount() {
    this.refs.name.focus();

      //Get data from local storage
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

  fSubmit = (e) => {
    e.preventDefault();

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let date = this.refs.date.value;

    if (this.state.act === 0) {   //new
      let data = {
        name, date, description
      }

       datas.forEach(item => {
        if(item.name === name){
          console.log('Item duplicate here ', item.name, name );
          alert('Duplocate')
          return true
        }else{
          datas.push(data);
        }
      });
      
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


  fRemove = (i) => {
    let datas = this.state.datas;
    let removeitem = datas.splice(i, 1);
    console.log('Removed ', removeitem); 
    let removedList = this.state.removed; 
    removedList.push(removeitem);
    console.log('Removed ', removedList); 
    
    this.setState({
      datas: datas,
      removed: removedList
    });

    this.refs.myForm.reset();
    this.refs.name.focus();

    //Save to local storage
    localStorage.setItem("Todos", JSON.stringify(datas))
  }

  fEdit = (i) => {
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
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Title" className="formField" required />
          <input type="text" ref="description" placeholder="Description" className="formField" />
          <input type="date" ref="date" className="formField" required />
          <button onClick={(e) => this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre className="container">
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i + 1}. {data.name}, {data.date}, {data.description}
              <button onClick={() => this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={() => this.fEdit(i)} className="myListButton">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}


export default App;
