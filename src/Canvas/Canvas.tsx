import React, { useState, useEffect, useRef} from 'react';
interface position{
    x: number, 
    y: number
}

export default function Canvas(props){
    const canvas = useRef(null); 
    const image = useRef(null); 
    const record = useRef(false);
    const init = useRef(false);
      
    const width = 10; 
    const height = width; 
    

    function onMouseDown(e){
        record.current = true; 
       
    }
    function onMouseUp(e){
        record.current = false;
       
    }
    function onMouseOver(e : React.MouseEvent<HTMLCanvasElement>){
        
        if(record.current === false){
            return; 
        }
        if(canvas.current !== null ){
            let context = (canvas.current as HTMLCanvasElement).getContext("2d"); 
            
           
            context.fillStyle = "blue";
             //Adding new shape
             context.beginPath(); 
             context.arc(e.nativeEvent.offsetX - (width/2), e.nativeEvent.offsetY - (height/2), width, 0,  2 * Math.PI)
             context.fill();
            
            //Getting the current image
            if(image.current !== null){
                if(image.current.src !== props.data){
                    image.current.src = props.data || ""; 
                }
                
                if(image.current.src !== ""){                
                    context.drawImage(image.current,0,0,canvas.current.clientWidth, canvas.current.clientHeight);
                }
                image.current.src = canvas.current.toDataURL(); 
            }
                                  
            props.update(canvas.current.toDataURL(), props.id);
            
            
        }        
    }
   
    useEffect(() => {
        if(init.current === false){
            canvas.current.width = canvas.current.clientWidth; 
            canvas.current.height = canvas.current.clientHeight; 
            console.log("Init changed");
            init.current = true; 
        }
        if(image.current === null){
            image.current = new Image(); 
        }
        else{
            if(image.current.src !== props.data){
                image.current.src = props.data || ""; 
            }            
            if(image.current.src !== ""){ 
                let context = (canvas.current as HTMLCanvasElement).getContext("2d");
                              
                context.drawImage(image.current,0,0,canvas.current.clientWidth, canvas.current.clientHeight);
            }
            image.current.src = canvas.current.toDataURL();
        }
       
        
    }, [])
   
    

   
    return (
        <div className="flex">
             <canvas ref={canvas}  className="grow m-5 w-[100%] aspect-video border-solid border-2 border-indigo-600" onMouseDown={(e) => onMouseDown(e) } onMouseMove={(e) => onMouseOver(e) } onMouseUp={(e) => onMouseUp(e) } >

            </canvas>
            <button className=' bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center' onClick={() => props.delete(props.id)}>X</button>
        </div>
           
    ); 
}