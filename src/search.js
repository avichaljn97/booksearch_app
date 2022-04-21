import React from "react";
import "./style.css";


function Search(props){
    
    return(
        <div className="searchOption">
            <form action="">
            <input type="text" onChange={props.handleChange}></input>
            <button type="button" onClick={props.sendTobackend}>Search</button>
            </form>
        </div>
        );
}



export default Search;