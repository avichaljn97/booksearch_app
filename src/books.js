import React, { Component } from 'react';
import Search from './search';
import './style.css';
import axios from 'axios';
import BookList from './booklist';
import Logout from './logout';

class Books extends Component{
    constructor(props){
        super(props);
        this.state={
            book:'',
            booklist:[]
        }

        
    }

    handleChange = e =>{
        this.setState({book:e.target.value});
    }
    sendTobackend=()=>{
        axios.post("http://localhost:5000/search",{book:this.state.book,user:JSON.parse(localStorage.getItem("logindata")).email})
        .then(response=>this.setState({booklist:response.data.items}))
        .catch(error => console.log(error));
    }

    
    render(){
        return(
            <div>
                <Search handleChange={this.handleChange} sendTobackend={this.sendTobackend}/>
                <Logout />
                    Result
                <BookList books={this.state.booklist}/>
            </div>

        );
    }
}

export default Books;