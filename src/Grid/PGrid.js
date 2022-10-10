import React from "react";


function ShowPositionGrid(props) {
        return(
            <div className="bg-primary px-3 py-2 btn text-light" style={{ gridColumn: `${props.x} / ${props.x+1}`, gridRow: `${props.y} / ${props.y+1}`}} 
            onClick={() => props.onChange(props.x, props.y)}>
                <h5 className="m-auto">{props.value}</h5>  
            </div>
        ); 
}

export default ShowPositionGrid; 



