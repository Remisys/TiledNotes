import React from 'react'; 
import './CardButtons.scss'; 

class CardButtons extends React.Component{
    constructor(props){
        super(props); 
        this.state = {}; 
    }
    render(){
        return(
            <div id = "layout" >
                <button id=  "card-edit" className="btn btn-primary">Edit</button>
                <button id = "card-danger" className="btn btn-danger">Delete</button>
                <button id = "card-draw" className="btn btn-success">Draw</button>
            </div>
        ); 
    }
}

export default CardButtons; 