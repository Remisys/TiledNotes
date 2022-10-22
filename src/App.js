import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react'; 
import './App.scss';
import Grid from './Grid/Grid.js'

function App(props){
 
    
   
    const [cards,setCards] = useState([{header:"", content:"", id:0}]); 
    const [onEdit, setOnEdit] = useState(false); 
    const [count, setCount] = useState(1); 
   
  
  
  
  return (
    <div className="App">
      
        {cards.map((x) =>(<Grid width={4} height={4} key={x.id}/>))}
      
      <div className="explore p-5 ">
        <button className="btn btn-primary" onClick={handleClickNew} >+ New</button>
        <button className="btn btn-success" > Save</button>
        <button className="btn btn-danger" >- Delete</button>
        <button className="btn btn-light" onClick={handleClickEdit}>Settings</button>
      </div>
    </div>
    
  );
  

  function handleClickNew(){
    
    setCount(count+1); 
    setCards(cards.concat({header: "", content: "", id: count+1})); 
  }
  
  function handleClickEdit(){
    
    setOnEdit(!onEdit); 
  }
}

export default App;
