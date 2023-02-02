import React, {useState, useEffect, HTMLInputTypeAttribute} from 'react'; 
import { isEqual } from 'lodash';
import Grid  from './Grid/Grid'
import { CardModel } from './Card/Card';
import { v4 as uuidv4 } from 'uuid';
import Canvas from './Canvas/Canvas';

interface GridsModel{
  content : CardModel[];
  id : number,
  key:number
}

interface DrawModel{
  data? : string; 
  id : number, 
  key : number
}


export function Main(props){
    const [fileName, setFileName] = useState("yourFile"); 
    const [grids,setGrids] = useState<GridsModel[]>([{content:[], id:0, key:uuidv4()}]); 
    const [drawings, setDrawings] = useState<DrawModel[]>([{data:undefined, id:0, key:uuidv4()}]); 

    useEffect(() => {
      loadFile(fileName, true);
    }, [])

    function handleSave(file: string, content:GridsModel[]){
      localStorage.setItem(file, JSON.stringify(content)); 
    }

    function loadFile(newFileName:string, firstTry:boolean){
      if(newFileName !== ""){
        let item = localStorage.getItem(newFileName);
        
        if(item !== null){
         
          let parsedCards : GridsModel[] = JSON.parse(item);
          if(isEqual(parsedCards, grids)=== false){
            console.log("Getting stuff from backend" + JSON.stringify(parsedCards));
            setGrids(parsedCards);
          }        
        }
        else{
           
           setGrids([{content:[], id:0, key:uuidv4()}]);
        }
        setFileName(newFileName);
      }
    }
    function handleFileName(newFileName:string) {
      localStorage.setItem(fileName, JSON.stringify(grids));  
      loadFile(newFileName, false);
      
    }

  
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
      <div className="pt-[100px] md:pt-[125px] xl:pt-[150px]   pb-[0px] w-[90%] max-w-[800px] ">
        {grids.map((x) =>(<Grid grid={x.content} delete={deleteGrid} width={4} height={4}  key={x.key} id={x.id} file={fileName} update={updateContent} initialized={x.content.length !== 0}/> ))}
      </div>
      {
        
      <div className="   w-[90%] max-w-[800px] ">
        {drawings.map((x) => <Canvas key={x.key} id={x.id} delete={deleteCanvas}  data={x.data} update={updateCanvas}></Canvas>)}
      </div>
         
      }
     
      <div className="flex justify-between w-[90%] max-w-[715px] mb-10  py-5 relative right-[20px] ">
        <button className=" rounded-md bg-sky-600 text-[18px] py-2 px-3 mr-2  whitespace-nowrap  hover:scale-95" onClick={handleClickNew} >+ New</button>
        <button className=" rounded-md bg-purple-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={handleClickDraw} >Draw</button>
        <button className=" rounded-md bg-green-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={(e) => {handleSave(fileName, grids)}} >Save</button>
      
      <button className=" rounded-md bg-red-600 text-[18px] py-2 px-3 ml-2  whitespace-nowrap  hover:scale-95" onClick={(e) => {
        localStorage.removeItem(fileName);
        setGrids([]);
      }} >x Delete</button>
      </div>
      </div>
      <div className="flex flex-row  p-3  fixed left-0 bottom-0 items-center justify-center w-[100%] z-2 bg-white border-t-2 border-t-sky-600">
       
       
          <input className=" border-b-2 border-green-700 text-[18px] py-2 px-3 mx-2 whitespace-nowrap text-black appearance-none outline-none" value={fileName} placeholder="Your File"  onInput={(e) => {
         
        handleFileName((e.target as HTMLInputElement).value); 
       }}></input>
        
      </div>
    </div>
    
  );
  

  function deleteGrid(id){
    let cardsLocal = [...grids]; 
    cardsLocal = cardsLocal.filter(x => x.id !== id); 
    setGrids(cardsLocal);
    handleSave(fileName, cardsLocal); 
  }

  function deleteCanvas(id){
    let cnvs = [...drawings]; 
    cnvs = cnvs.filter(x => x.id !== id); 
    setDrawings(cnvs); 
     
  }

  function updateContent(id, content : CardModel[], refresh:boolean){
   
    let gridsLocal = [...grids];  
    if(id < gridsLocal.length){
      if(gridsLocal[id] !== undefined){
        setGrids(grids => [...grids.slice(0,id), {content:content, id:id, key:refresh? uuidv4() : gridsLocal[id].key }, ...grids.slice(id+1)]);
        handleSave(fileName, [...grids.slice(0,id), {content:content, id:id, key:refresh? uuidv4() : gridsLocal[id].key}, ...grids.slice(id+1)]); 
      }
      else{
        console.error(`Undefined ${gridsLocal}`);
      }
   
    }
    else{
      console.error(`Trying to access ${id} for list of size ${gridsLocal.length}`);
    }
  }

    function updateCanvas( data : string, id:number,  refresh:boolean){
   
      let drawingsLocal = [...drawings];  
      if(id < drawingsLocal.length){
        if(drawingsLocal[id] !== undefined){
          
          setDrawings(x => [...x.slice(0,id), {data:data, id:id, key:refresh? uuidv4() : drawingsLocal[id].key }, ...x.slice(id+1)]); 
        }
        else{
          console.error(`Undefined ${drawingsLocal}`);
        }
     
      }
      else{
        console.error(`Trying to access ${id} for list of size ${drawingsLocal.length}`);
      }
   
   
    
  }
  function handleClickNew(){
    setGrids(cards => [...cards, {content:[], id: cards.length,key:uuidv4()}]); 
  }
  function handleClickDraw(){
    setDrawings(x => [...x, {data:undefined, id: x.length, key:uuidv4()}]); 
  }
  

}