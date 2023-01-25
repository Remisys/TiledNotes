import React, {useState, useEffect} from 'react'; 
import Card, {CardModel} from '../Card/Card'

import ShowPositionGrid from './PGrid';



export default function Grid(props) {
   
    const [gridNotes, setGridNotes] = useState<CardModel[]>(props.grid); 
        const [gridWidth, ] = useState(props.width);
        const [gridHeight, ] = useState(props.height); 
        const [grid, setGrid] = useState(loop(gridWidth, gridHeight)); 
        const [cachedCoordinates, setCachedCoordinates] = useState([0,0,1]); 
        const [showNotes, setShowNotes] = useState(false); 
         
        
       
    useEffect(() => {
        
        props.update(props.id, gridNotes); 
    },[gridNotes])  
   
    function loop(x : number,y : number){
        let newGrid = []; 
            for(let i = 0; i < x*y; i++){
                const xTile = getXY(i)[0]; 
                const yTile = getXY(i)[1];
                let found = false;  
                for(let j = 0; j <= gridNotes.length; j++){
                   
                    const note = gridNotes[j];
                    if(note !== undefined){
                        if(note.startPos[0] <= xTile && xTile <= note.endPos[0] && note.startPos[1] <= yTile && yTile <= note.endPos[1]){
                            newGrid = [...newGrid,[[xTile, yTile], j+1]];
                            found = true;         
                            break;    
                        }
                    } 
                } 
                if(!found){
                    newGrid = [...newGrid, [[xTile, yTile], 0]];
                }
                    
            }
        return newGrid; 
    }
    function getXY(index : number){
        let result = [ index % gridWidth + 1, Math.floor(index/gridWidth) + 1]; 
        return result; 
    }
    function getIndex(x : number,y : number){
        return (x-1) + (y-1) * gridWidth; 
    }
    function handleChange(x:number,y:number){

        
        setGrid(returnNewGrid(x,y)); 
        if(cachedCoordinates[0] !== 0 && cachedCoordinates[1] !== 0){
            let c : CardModel = {header:"Header", content:"Content", startPos: cachedCoordinates.slice(0,2), endPos:[x,y]}; 
            setGridNotes([...gridNotes, c]); 
            setCachedCoordinates([0,0,cachedCoordinates[2]+1]);
           
            
        }
        else{
            setCachedCoordinates([x,y,cachedCoordinates[2]]);
        }
        setShowNotes(isAllFilled());
    }
    function isAllFilled(){
        for(let i = 0; i < gridHeight * gridWidth; i++){
            if(grid[i][1] === 0) return false; 
        }
        return true; 
    }

    function returnNewGrid(givenX, givenY){
        //console.log(`${givenX} , ${givenY}, ${cachedCoordinates}`);
        if(cachedCoordinates[0] === 0 && cachedCoordinates[1] === 0){
            return grid; 
        }
        else{
            let newGrid = grid; 
            for(let y = cachedCoordinates[1]; y <= givenY ; y++){
                for(let x = cachedCoordinates[0]; x <= givenX; x++){   
                    newGrid[getIndex(x,y)] = [[x,y], cachedCoordinates[2]]; 
                }
                
            }
            return newGrid; 
        }
    }
    function updateCard(id:number,header:string, content:string){
        let localNotes = [...gridNotes]; 
        localNotes[id].header = header;
        localNotes[id].content = content; 
        setGridNotes(localNotes);
     
    }
    const styleA = {gridGap: '1rem', display: 'grid', gridTemplateColumns: `repeat(${gridWidth}, 1fr)`, gridTemplateRows: `repeat(${gridHeight}, 1fr)`}; 
    return (
            <div className='flex' >
                <div className='grow'>
                {
                    isAllFilled() && 
                    <div className="p-5" style={styleA}>
                    {gridNotes.map( (val,index) => 
                    <Card gridColumn={`${val.startPos[0]}/${val.endPos[0]+1}`} gridRow={`${val.startPos[1]}/${val.endPos[1]+1}`} key={`${val.startPos} ${val.endPos} ${props.file} ${index}` } id={index} card={val}  update={updateCard} ></Card>)}
                   </div>
                }
                
                {   
                    
                    !isAllFilled() && 
                    <div className="p-5" style={styleA}>
                    {grid.map( (val,index) => ( 
                            <ShowPositionGrid value={val[1]} x={val[0][0]} y={val[0][1]} onChange={handleChange} key={`${val[0]} ${index}`} ></ShowPositionGrid>  
                    ))} 
                    </div>
                }

                
                
                </div>
                <button className=' bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center' onClick={() => props.delete(props.id)}>X</button>
            </div>
        ); 
   
}

