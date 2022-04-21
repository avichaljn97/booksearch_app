import React from "react";
import BookView from "./bookview";

function BookList(props){
    return(
        <div>
            {
                props.books.map((val,index)=>{
                    return <BookView
                            key={index}
                            id={val.id}
                            cover={val.volumeInfo.imageLinks.thumbnail}
                            title={val.volumeInfo.title}
                            author={val.volumeInfo.authors}
                    />
                })
            }
        </div>
    )
}

export default BookList;