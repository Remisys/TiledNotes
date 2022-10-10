import React from 'react'; 
import Card from './../Card/Card.js'
import './Grid.scss'; 
import ShowPositionGrid from './PGrid';

class Grid extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            gridWidth: parseInt(props.width, 10), 
            gridHeight: parseInt(props.height,10), 
            grid: [],
            cachedCoordinates: [0,0,1],
            showNotes: false,
            gridNotes: []
        }; 
         
        for(let i = 0; i < this.state.gridWidth * this.state.gridHeight; i++){ 
            this.state = {...this.state, grid: [...this.state.grid, [this.getXY(i), 0]]}; 
        }
        
        this.handleChange = this.handleChange.bind(this);  
        this.returnNewGrid = this.returnNewGrid.bind(this);
        this.getIndex = this.getIndex.bind(this);
        this.isAllFilled = this.isAllFilled.bind(this); 
    }
    
    getXY(index){
        //XY like cartesian coordinates not like matrix coordinates
        let result = [ index % this.state.gridWidth + 1, Math.floor(index/this.state.gridWidth) + 1]; 
        //console.log(`${index} => (${result[0]}, ${result[1]})`);
        return result; 
    }
    getIndex(x,y){
        return (x-1) + (y-1) * this.state.gridWidth; 
    }
    handleChange(x,y){
        this.setState((state) => ({...state, 
        grid: this.returnNewGrid(state,x,y), 
        gridNotes: (state.cachedCoordinates[0] !== 0 && state.cachedCoordinates[1] !== 0)? [...state.gridNotes, [state.cachedCoordinates.slice(0,2),[x,y]]]:state.gridNotes,
        cachedCoordinates: (state.cachedCoordinates[0] !== 0 && state.cachedCoordinates[1] !== 0)? [0,0,state.cachedCoordinates[2]+1] : [x,y, state.cachedCoordinates[2]]})); 
        this.setState((state) => ({...state, showNotes: this.isAllFilled(state)}))
    }
    isAllFilled(state){
        for(let i = 0; i < state.gridHeight * state.gridWidth; i++){
            if(state.grid[i][1] === 0) return false; 
        }
        return true; 
    }

    returnNewGrid(state, givenX, givenY){
        console.log(`${givenX} , ${givenY}, ${state.cachedCoordinates}`);
        if(state.cachedCoordinates[0] === 0 && state.cachedCoordinates[1] === 0){
            return state.grid; 
        }
        else{
            let newGrid = state.grid; 
            for(let y = state.cachedCoordinates[1]; y <= givenY ; y++){
                for(let x = state.cachedCoordinates[0]; x <= givenX; x++){   
                    newGrid[this.getIndex(x,y)] = [[x,y], state.cachedCoordinates[2]]; 
                }
                
            }
            return newGrid; 
        }
    }
    render(){
        let styleA = {gridGap: '1rem', display: 'grid', gridTemplateColumns: `repeat(${this.state.gridWidth}, 1fr)`, gridTemplateRows: `repeat(${this.state.gridHeight}, 1fr)`}; 
        return (
            <div >
                {   
                    !this.state.showNotes && 
                    <div className="gridcontainer p-5 " style={styleA}>
                    {this.state.grid.map( (val) => ( 
                            <ShowPositionGrid value={val[1]} x={val[0][0]} y={val[0][1]} onChange={this.handleChange} key={`${val[0]}`}  ></ShowPositionGrid>  
                    ))} 
                    </div>
                }
                {
                    this.state.showNotes && 
                    <div className="gridcontainer p-5" style={styleA}>
                    {this.state.gridNotes.map( (val) => 
                    <Card gridColumn={`${val[0][0]}/${val[1][0]+1}`} gridRow={`${val[0][1]}/${val[1][1]+1}`} key={`${val}`}></Card>)}
                   </div>
                }
            </div>
        ); 
    }
}

export default Grid; 