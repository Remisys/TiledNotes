
import React, {useState, useEffect} from 'react'; 


import Grid from './Grid/Grid'

function App(props){
 
    
   
    const [cards,setCards] = useState([{content:[], id:0}]); 
    const [onEdit, setOnEdit] = useState(false); 
    const [count, setCount] = useState(0); 
   
    
    useEffect(() => {
      localStorage.setItem("file", JSON.stringify(cards)); 
    })
  
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
        {cards.map((x) =>(<Grid delete={deleteGrid} width={4} height={4} key={x.id} id={x.id} init={initContent} /> ))}
      </div>
      </div>
      <div className="flex flex-row  p-3  fixed left-0 bottom-0 items-center justify-center w-[100%] z-2 bg-white border-t-2 border-t-sky-600">
        <button className=" rounded-md bg-sky-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={handleClickNew} >+ New</button>
        <button className="rounded-md bg-emerald-600 text-[18px] py-2 px-3 mx-2 whitespace-nowrap hover:scale-95" >✓ Save</button>
        <button className="rounded-md bg-red-600 text-[18px] py-2 px-3 mx-2 whitespace-nowrap hover:scale-95" >- Delete</button>
        <button className="rounded-md bg-slate-200 text-[18px] text-black py-2 px-3 mx-2 whitespace-nowrap hover:scale-95" onClick={handleClickEdit}>Settings</button>
      </div>
    </div>
    
  );
  

  function deleteGrid(id){
    
   setCards(cards.filter(x => x.id != id));
  }

  function initContent(id, content){
    console.log("ID : " + id);
    let cardsLocal = [...cards];  
    cardsLocal[id].content = content; 
    setCards(cardsLocal); 
  }
  function handleClickNew(){
    setCards(cards.concat({content:[], id: count+1})); 
    setCount(count+1);
    
  }
  
 

  function handleClickEdit(){
    
    setOnEdit(!onEdit); 
  }
}

export default App;
