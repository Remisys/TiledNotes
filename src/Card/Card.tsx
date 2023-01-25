import React,{ useEffect, useState} from 'react';

export interface CardModel{
    header:string, content:string, startPos:number[],endPos:number[]
}


function Card(props){
    const [onHover,setOnHover] = useState(false);  
    const [title, setTitle] = useState(props.card.header); 
    const [content, setContent] = useState(props.card.content);  

         
    function changeTitle(e){
        setTitle(e.target.value); 
        
    }

    function changeContent(e){
        setContent(e.target.value); 
        
    }
    useEffect(() => {pushToGrid();}, [title, content]); 
    function pushToGrid(){
        props.update(props.id, title, content); 
    }

    
  
    
    return(
        <div className="rounded-lg bg-slate-50 p-2 border-2 border-sky-600 hover:scale-[1.02] flex flex-col " onMouseOut={() => setOnHover(false)} onMouseOver={() => setOnHover(true)} style={{gridRow: props.gridRow, gridColumn: props.gridColumn}}>
        <div>          
            <textarea className=" text-black font-bold h-[1.5em] text-[20px] w-[100%] mb-2 mx-1 text-center bg-inherit"   disabled={!onHover} spellCheck="false" value={title} onInput={(e) =>changeTitle(e)}></textarea>
            <hr className="border-t-2 border-t-sky-700 my-1 shadow-xl"></hr>
            <textarea className="text-black w-[100%] grow mx-1 bg-inherit"  disabled={!onHover} spellCheck="false" value={content} onInput={(e) => changeContent(e)}></textarea>
        </div>
        </div>
            
    ); 

}

export default Card; 