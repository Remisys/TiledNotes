import React, { useState,  useRef } from 'react';
import Card, { CardModel } from '../Card/Card'
import { v4 as uuidv4 } from 'uuid';
import ShowPositionGrid from './PGrid';
import { GridModel } from '../Main';


interface CachedCoordinatesModel{
    x: number,
    y: number, 
    index : number
}

interface GridProps{
    model : GridModel,
    file:string,
    update : (id:number, content:CardModel[]) => void,
    delete : (id:number) => void,  
}

export default function Grid(props : GridProps) {

    const [cards, setCards] = useState<CardModel[]>(props.model.content);
    
    const cachedCoordinatesNew = useRef<CachedCoordinatesModel>({x:0, y:0, index:1}); 
    const width = 4;
    const height = 4;  
    let grid = Array(width * height).fill(0);

   
    
    for (let i = 0; i < grid.length; i++) {
        const xTile = getXY(i)[0];
        const yTile = getXY(i)[1];
        let found = false;
        for (let j = 0; j <= cards.length; j++) {

            const note = cards[j];
            if (note !== undefined) {
                if (note.startPos[0] <= xTile && xTile <= note.endPos[0] && note.startPos[1] <= yTile && yTile <= note.endPos[1]) {
                    grid[i] = j + 1;
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            grid[i] = 0;
        }

    }

    

    function getXY(index: number) {
        let result = [index % width + 1, Math.floor(index / width) + 1];
        return result;
    }
   
    function handleChange(x: number, y: number) {
        
        if(cachedCoordinatesNew.current.x !== 0 && cachedCoordinatesNew.current.y !== 0){
            let c: CardModel = { header: "Header", content: "Content", startPos: [cachedCoordinatesNew.current.x, cachedCoordinatesNew.current.y], endPos: [x, y]};
            setCards((old2) => [...old2, c])
            props.update(props.model.id, [...cards, c]); 
            cachedCoordinatesNew.current.x = 0; 
            cachedCoordinatesNew.current.y = 0;
            cachedCoordinatesNew.current.index += 1;  
           
        }
        else{
            cachedCoordinatesNew.current.x = x; 
            cachedCoordinatesNew.current.y = y; 
        }
       



    }
    function isAllFilled() {
        
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === 0) return false;
        }
        return true;
    }


    function updateCard(id: number, header: string, content: string) {
        
        setCards((x) => {
            const localCards = [...x.slice(0, id), { ...x[id], header: header, content: content }, ...x.slice(id + 1)];
            return localCards;
        });
        const localGridNotes = [...cards.slice(0, id), { ...cards[id], header: header, content: content }, ...cards.slice(id + 1)];
        props.update(props.model.id, localGridNotes); 


    }
    const styleA = { gridGap: '1rem', display: 'grid', gridTemplateColumns: `repeat(${width}, 1fr)`, gridTemplateRows: `repeat(${height}, 1fr)` };

   
    return (
        <div className='flex' >
            <div className='grow'>
                {
                    isAllFilled() &&
                    <div className="p-5" style={styleA}>
                        {cards.map((val, index) =>
                            <Card gridColumn={`${val.startPos[0]}/${val.endPos[0] + 1}`} gridRow={`${val.startPos[1]}/${val.endPos[1] + 1}`}  key={`${val.startPos} ${val.endPos} ${props.file} ${index}`} id={index} card={val} update={updateCard} ></Card>)
                        }
                    </div>
                }

                {

                    !isAllFilled() &&
                    <div className="p-5" style={styleA}>
                        {grid.map((val, index) => (
                            <ShowPositionGrid value={val} x={getXY(index)[0]} y={getXY(index)[1]} onChange={handleChange}  key={`${getXY(index)[0]} ${getXY(index)[1]} ${props.file} ${val} ${index}`} ></ShowPositionGrid>
                        ))}
                    </div>
                }



            </div>
            <button className=' bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center' onClick={() => props.delete(props.model.id)}>X</button>
        </div>
    );

}

