import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'; 
import './App.scss';
import Grid from './Grid/Grid.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {cards : [{header:"", content: "", id: 0}], onEdit: false, count: 1};
    this.handleClickNew = this.handleClickNew.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this); 
  }
  
  render(){
  return (
    <div className="App">
      
        {this.state.cards.map((x) =>(<Grid width="4" height="4" key={x.id}/>))}
      
      <div className="explore p-5 ">
        <button className="btn btn-primary" onClick={this.handleClickNew} >+ New</button>
        <button className="btn btn-success" > Save</button>
        <button className="btn btn-danger" >- Delete</button>
        <button className="btn btn-light" onClick={this.handleClickEdit}>Settings</button>
      </div>
    </div>
    
  );
  }

  handleClickNew(){
    this.setState( (state)    =>    ({...state, count: state.count+1, cards: state.cards.concat({header: "", content: "", id: state.count+1})}) ); 
  }
  
  handleClickEdit(){
    this.setState ( (state) => ({...state, onEdit: !state.onEdit})); 
  }
}

export default App;
