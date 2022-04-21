import React, { useState } from "react";
import MoreDetailCard from "./moredetailcard";

function BookView(props){
    const [viewDetail,setViewDetail]=useState(false);
    const [hide,setHide]=useState("View Details.")
    const [tags,setags]=useState();
    const changestate=(e)=>{
        if(viewDetail){
            setHide("View Details");
            setViewDetail(false);
            setags();
        }
        else{
            setHide("Hide Details");
            setViewDetail(true);
            setags(e.target.parentNode);
        }
    };
    return(
        <>
        <div className="bookcard">
            <img src={props.cover} alt="NotAvailiable"></img>
            <div className="booktitle">{props.title}</div>
            {
            props.author.map((val,index)=>{
                return(
                    <div className="bookauthor" key={index}>{val}</div>
                );
            })}
            <button type="button" className="moreDetail" onClick={changestate}>
                {hide}
            </button>
        </div>
        {
            viewDetail
            ?
            <MoreDetailCard stat={viewDetail} link={props.id} tag={tags}/>
            :
            <></>
        }
        </>
    )
}

export default BookView;