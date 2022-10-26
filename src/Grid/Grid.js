import React, {useState} from 'react'; 
import Card from './../Card/Card.js'

import ShowPositionGrid from './PGrid';

export default function Grid(props) {
   
        
        const [gridWidth, ] = useState(props.width);
        const [gridHeight, ] = useState(props.height); 
        const [grid, setGrid] = useState(loop(gridWidth, gridHeight)); 
        const [cachedCoordinates, setCachedCoordinates] = useState([0,0,1]); 
        const [showNotes, setShowNotes] = useState(false); 
        const [gridNotes, setGridNotes] = useState([]);  
                 
    
    function loop(x,y){
        let newGrid = []; 
            for(let i = 0; i < x*y; i++){ 
                 newGrid = [...newGrid, [getXY(i),0]]; 
            }
        return newGrid; 
    }
    function getXY(index){
            let result = [ index % gridWidth + 1, Math.floor(index/gridWidth) + 1]; 
            return result; 
    }
    function getIndex(x,y){
        return (x-1) + (y-1) * gridWidth; 
    }
    function handleChange(x,y){

        
        setGrid(returnNewGrid(x,y)); 
        if(cachedCoordinates[0] !== 0 && cachedCoordinates[1] !== 0){
            setGridNotes([...gridNotes, [cachedCoordinates.slice(0,2), [x,y]]]); 
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
        console.log(`${givenX} , ${givenY}, ${cachedCoordinates}`);
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

    const styleA = {gridGap: '1rem', display: 'grid', gridTemplateColumns: `repeat(${gridWidth}, 1fr)`, gridTemplateRows: `repeat(${gridHeight}, 1fr)`}; 
    return (
            <div >
                {   
                    !showNotes && 
                    <div className="p-5" style={styleA}>
                    {grid.map( (val) => ( 
                            <ShowPositionGrid value={val[1]} x={val[0][0]} y={val[0][1]} onChange={handleChange} key={`${val[0]}`}  ></ShowPositionGrid>  
                    ))} 
                    </div>
                }
                {
                    showNotes && 
                    <div className="p-5" style={styleA}>
                    {gridNotes.map( (val) => 
                    <Card gridColumn={`${val[0][0]}/${val[1][0]+1}`} gridRow={`${val[0][1]}/${val[1][1]+1}`} key={`${val}`}></Card>)}
                   </div>
                }
            </div>
        ); 
   
}

