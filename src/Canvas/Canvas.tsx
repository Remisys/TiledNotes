import React, { useState, useEffect, useRef} from 'react';
export default function Canvas(props){
    const canvas = useRef(null); 
    const width = 20; 
    const height = width; 
    let image = useRef(null); 
    let record = useRef(false);
    const [init, setInit] = useState(false);   

    function onMouseDown(e){
        record.current = true; 
        console.log(`Mouse down : ${record.current}`); 
    }
    function onMouseUp(e){
        record.current = false;
        console.log(`Mouse up : ${record.current}`);  
    }
    function onMouseOver(e : React.MouseEvent<HTMLCanvasElement>){
        
        
        if(canvas.current !== null ){
            let context = (canvas.current as HTMLCanvasElement).getContext("2d"); 
            
           
            context.fillStyle = "blue";
             //Adding new shape
             context.beginPath(); 
             context.arc(e.nativeEvent.offsetX - (width/2), e.nativeEvent.offsetY - (height/2), width, 0,  2 * Math.PI)
             context.fill();
             //context.fillRect(e.nativeEvent.offsetX - (width/2), e.nativeEvent.offsetY - (height/2), width, height);

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

           
            
           
            props.update(canvas.current.toDataURL(), props.id, false);
            
            
        }        
    }
   
    useEffect(() => {
        if(init === false){
            canvas.current.width = canvas.current.clientWidth; 
            canvas.current.height = canvas.current.clientHeight; 
            console.log("Init changed");
            setInit(true);
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
            <canvas ref={canvas}  className="w-[100%] aspect-video border-solid border-2 border-indigo-600" onMouseDown={(e) => onMouseDown(e) } onMouseMove={(e) => onMouseOver(e) } onMouseUp={(e) => onMouseUp(e) } >

            </canvas>
    ); 
}