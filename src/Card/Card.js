import React from 'react';
import './Card.scss'; 

class Card extends React.Component{
    constructor(props){
        super(props); 
        this.state = {text : "edit", onHover : false};
        this.onHover = this.onHover.bind(this); 
        this.onOut= this.onOut.bind(this);
    }
    render(){
      
        return(
            <div className="hello bg-light text-dark" onMouseOver={this.onHover} onMouseOut={this.onOut} style={{gridRow: this.props.gridRow, gridColumn: this.props.gridColumn}}>
                  
          <textarea className="noResize" style={{ height: "1.5em", fontSize: "0.9em", fontWeight: "bold"}}  disabled={!this.state.onHover} spellCheck="false" value="Heading"></textarea>
            <textarea className="resize" style={{fontSize: "0.6em"}} disabled={!this.state.onHover} spellCheck="false" value="Content"></textarea>
         
            </div>
            
        ); 

    }

    onHover(){
        this.setState( (state) => ({text: state.text, onHover: true}));
    }

    onOut(){
        this.setState ( (state) => ({text: state.text, onHover : false}));
    }

}

export default Card; 