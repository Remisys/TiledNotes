import React,{ useState} from 'react';
import './Card.scss'; 

function Card(props){
    const [onHover,setOnHover] = useState(false);  

    return(
        <div className="hello bg-light text-dark" onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)} style={{gridRow: props.gridRow, gridColumn: props.gridColumn}}>
                  
        <textarea className="noResize" style={{ height: "1.5em", fontSize: "0.9em", fontWeight: "bold"}}  disabled={!onHover} spellCheck="false" value="Heading"></textarea>
        <textarea className="resize" style={{fontSize: "0.6em"}} disabled={!onHover} spellCheck="false" value="Content"></textarea>
         
        </div>
            
    ); 

}

export default Card; 