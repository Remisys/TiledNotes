import React from "react";


function ShowPositionGrid(props) {
        return(
            <div className=" bg-blue-500 rounded-full hover:scale-105 hover:bg-sky-500 text-lg z-0" style={{ gridColumn: `${props.x} / ${props.x+1}`, gridRow: `${props.y} / ${props.y+1}`}} 
            onClick={() => {props.onChange(props.x, props.y)}}>
                <h5 className="px-4 py-2 hover:underline hover:underline-offset-4">{props.value}</h5>  
            </div>
        ); 
}

export default ShowPositionGrid; 



