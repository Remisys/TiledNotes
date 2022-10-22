import React,{ useState} from 'react';
import './Card.scss'; 

function Card(props){
    const [onHover,setOnHover] = useState(false);  

    return(
        <div className="rounded-lg bg-slate-50 p-2 border-2 border-sky-600 hover:scale-[1.02] flex flex-col " onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)} style={{gridRow: props.gridRow, gridColumn: props.gridColumn}}>
        <div>          
            <textarea className=" text-black font-bold h-[1.5em] text-[20px] w-[100%] mb-2 mx-1 text-center"   disabled={!onHover} spellCheck="false" value="Heading"></textarea>
            <hr className="border-t-2 border-t-sky-700 my-1 shadow-xl"></hr>
            <textarea className="text-black w-[100%] grow mx-1"  disabled={!onHover} spellCheck="false" value="Content"></textarea>
        </div>
        </div>
            
    ); 

}

export default Card; 