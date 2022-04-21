import React, { useEffect, useState } from "react";
import axios from "axios";

function MoreDetailCard(props){
    const [detail,setDetail]=useState([]);
    useEffect(()=>{
        axios.post("http://localhost:5000/books/"+props.link)
        .then(response => setDetail(response.data))
        .catch(error=> console.log(error));
    },[props.stat])
    return(
        detail.length===0 || detail===undefined
        ?
        <></>
        :
        <div className="more">
            <div className="publisher">{detail.volumeInfo.publisher}</div>
            <div className="publishedDate">{detail.volumeInfo.publishedDate}</div>
            <div className="Description">{detail.volumeInfo.description}</div>
        </div>
    );
}

export default MoreDetailCard;