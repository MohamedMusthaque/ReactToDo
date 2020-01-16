import React, { Component } from 'react';

class CreateTodo extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description: '',
            created_date:''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    //handle Titile changes
    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        });
    }

    //handle description changes
    handleDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        });
    }

    //handle date changes
    handleDateChange = (e) => {
        this.setState({
            created_date: e.target.value
        });
    }

    //Submit the todo
    handleSubmit = (e) => {
        e.preventDefault(); //refresh the page
        this.props.addTodo(this.state); 
        this.setState({
            title:'',
            description: '',
            created_date:''
        });
    }

    render(){
        return(
            <div className="row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <label>Add your new todo: </label>
                    <div className="row">
                        <div className="input-field col s3">
                            <input type="text" onChange={this.handleTitleChange} value={this.state.title} placeholder="Enter the title" required/>         
                        </div>
                        <div className="input-field col s2">
                            <input type="date" className="datepicker" onChange={this.handleDateChange} value={this.state.created_date} placeholder="Select the date" required />  
                        </div>
                        <div className="input-field col s7">
                            <input type="text" onChange={this.handleDescriptionChange} placeholder="Enter the description" value={this.state.description}/>        
                            <button type="submit" className="btn blue right" name="action" onClick={ this.handleChange }>Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateTodo;