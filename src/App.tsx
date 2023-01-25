
import React, {useState, useEffect} from 'react'; 
import { isEqual } from 'lodash';

import Grid from './Grid/Grid'

function App(props){
 
    
    const [fileName, setFileName] = useState("file"); 

    const [cards,setCards] = useState([]); 
    const [onEdit, setOnEdit] = useState(false); 

    

    useEffect(() => {
      if(fileName !== ""){
        let item = localStorage.getItem(fileName);
        if(item !== null){
          let parsedCards = JSON.parse(item);
          if(isEqual(parsedCards, cards)=== false){
            console.log(`${JSON.stringify(cards)} vs ${JSON.stringify(parsedCards)}` );
            
            setCards( parsedCards); 
          }
                     
        }
        else{
          
           
            setCards([]);
          
        }
        console.log(cards); 
      
      }
    }, [fileName])

    useEffect(() => {
      if(fileName !== null ){
        localStorage.setItem(fileName, JSON.stringify(cards)); 
      }
    
    }, [cards])
  
  return (
    <div className="flex flex-col items-center text-white  justify-center h-screen">
      <div className="m-10 flex flex-col items-center w-[100%] overflow-y-auto">
      <div className="bg-inherit flex flex-col fixed top-0 left-0 w-[100%] max-h-[150px] md:max-h-[175px] xl:max-h-[200px] z-40 ">
       <svg preserveAspectRatio='none'  viewBox="0 0 400 200" >
       <linearGradient  id="a">
        <stop offset="0%" stopColor="#FF0031" />
       
        <stop offset="50%" stopColor="#FF7800" />
       
        <stop offset="100%" stopColor="#FFCD00" />
        
            </linearGradient> 
          <path d="M 0,130 L 400,200 L 400,0 L 0,0 Z" fill="url(#a)"></path>
         
       </svg>
       
      </div>
      <div className=" flex flex-col items-center  mt-10  fixed top-0 left-0 w-[100%] max-h-[150px] md:max-h-[175px] xl:max-h-[200px] z-50">
        <p className="text-4xl font-mono  xl:mt-5 tracking-wider font-semibold">Tiling Notes</p>
      </div>
      <div className="pt-[100px] md:pt-[125px] xl:pt-[150px]   pb-[20px] w-[90%] max-w-[800px]">
        {cards.map((x) =>(<Grid grid={x.content} delete={deleteGrid} width={4} height={4} key={`${x.id} ${x.fileName}`} id={x.id} file={fileName} update={updateContent} initialized={x.content.length !== 0}/> ))}
      </div>
      </div>
      <div className="flex flex-row  p-3  fixed left-0 bottom-0 items-center justify-center w-[100%] z-2 bg-white border-t-2 border-t-sky-600">
        <button className=" rounded-md bg-sky-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={handleClickNew} >+ New</button>
        <input className=" border-b-2 border-green-700 text-[18px] py-2 px-3 mx-2 whitespace-nowrap text-black" value={fileName} placeholder="Your File"  onInput={(e) => {
          setFileName((e.target as HTMLInputElement).value);
          if(fileName !== null ){
            localStorage.setItem(fileName, JSON.stringify(cards)); 
          }
        }}></input>
        <button className=" rounded-md bg-red-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={(e) => {
          localStorage.removeItem(fileName);
          setCards([]);
        }} >x Delete</button>
        <button className="rounded-md bg-slate-200 text-[18px] text-black py-2 px-3 mx-2 whitespace-nowrap hover:scale-95" onClick={handleClickEdit}>Settings</button>
      </div>
    </div>
    
  );
  

  function deleteGrid(id){
   setCards(cards.filter(x => x.id != id));
  }

  function updateContent(id, content){
   
    let cardsLocal = [...cards];  
    if(id < cardsLocal.length){
      if(cardsLocal[id] !== undefined){
        cardsLocal[id].content = content; 
        setCards(cardsLocal);
      }
      else{
        console.error(`Undefined ${cardsLocal}`);
      }
   
    }
    else{
      console.error(`Trying to access ${id} for list of size ${cardsLocal.length}`);
    }

    
  }
  function handleClickNew(){
    setCards(cards.concat({content:[], id: cards.length})); 
   
    
  }
  
 

  function handleClickEdit(){
    setOnEdit(!onEdit); 
  }
}

export default App;
