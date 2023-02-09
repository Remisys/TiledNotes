import React, {useState, useEffect, HTMLInputTypeAttribute} from 'react'; 
import { isEqual } from 'lodash';
import Grid  from './Grid/Grid'
import { CardModel } from './Card/Card';
import { v4 as uuidv4 } from 'uuid';
import Canvas from './Canvas/Canvas';


export interface GridModel{
  content : CardModel[];
  id : number,
  
}


export interface CanvasModel{
  data? : string; 
  id : number, 
 
}

export interface SectionModel{
  grid : GridModel | null, 
  canvas : CanvasModel | null, 
  type : "grid" | "canvas"
}


export function Main(props){
    const [fileName, setFileName] = useState("yourFile"); 
    const [sections,setSections] = useState<SectionModel[]>([]); 
   

    useEffect(() => {
      loadFile(fileName);
    }, [])

    function handleSave(file: string, content:SectionModel[]){
      localStorage.setItem(file, JSON.stringify(content)); 
    }

    function loadFile(newFileName:string){
      if(newFileName !== ""){
        let item = localStorage.getItem(newFileName);
        
        if(item !== null){
         
          let parsedCards : SectionModel[] = JSON.parse(item);
          if(isEqual(parsedCards, sections)=== false){
            console.log("Getting stuff from backend" + JSON.stringify(parsedCards));
            setSections(parsedCards);
          }        
        }
        else{
           
           setSections([]);
        }
       
      }
      setFileName(newFileName);
    }
    function handleFileName(newFileName:string) {
      localStorage.setItem(fileName, JSON.stringify(sections));  
      loadFile(newFileName);
      
    }

    
  
   

    function deleteElement(id:number, type:"canvas" | "grid"){
      let cardsLocal = [...sections]; 
      cardsLocal = cardsLocal.filter(x => {
        if(x.type === type){
          if(x.type === "grid"){
            return x.grid.id !== id;
          }
          else{
            return x.canvas.id !== id; 
          }
           
        } 
        return true;
      }); 
      setSections(cardsLocal);
      handleSave(fileName, cardsLocal);
    }

  
    function updateGrid(id, content : CardModel[]){
     
      let gridsLocal = [...sections];
      const index = gridsLocal.findIndex(x => {
        if(x.grid !== null){
          return x.grid.id === id; 
        }
        return false ; 
      });
      
      
      if(index !== -1){
        gridsLocal[index].grid.content = content;  
        setSections(gridsLocal);
      }
      else{
        console.error(`Section Id ${id} is not found in the records`);
      }
    }
  
      function updateCanvas( id:number,  data : string,){
     
        let drawingsLocal = [...sections];  
        const index = drawingsLocal.findIndex(x => {
          if(x.canvas !== null){
            return x.canvas.id === id; 
          }
          return false;
        } );
        if(index !== -1){
            drawingsLocal[index].canvas.data = data;        
            setSections(drawingsLocal); 
        }
        else{
          console.error(`Section Id ${id} is not found in the records`);
        }

        
     
     
      
    }
    function handleClickNew(){
      setSections(x => [...x, {grid:{content:[], id:uuidv4()}, canvas:null, type:"grid"}]); 
    }
    function handleClickDraw(){
      setSections(x => [...x, {grid:null, canvas:{data:null, id:uuidv4()}, type:"canvas"}]); 
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
        {sections.map((x) => {
          if(x.type === "grid" && x.grid !== null){
            return <Grid update={updateGrid} delete={(id:number) => deleteElement(id, "grid")} model={x.grid} file={fileName} key={x.grid.id}></Grid>
          }
          else if(x.type === "canvas" && x.canvas !== null){
            return <Canvas update={updateCanvas} delete={(id:number) => deleteElement(id, "canvas")} model={x.canvas} key={x.canvas.id}></Canvas>
          } 
         
        })}
      </div>
      
     
      <div className="flex justify-between w-[90%] max-w-[715px] mb-10  py-5 relative right-[20px] ">
        <button className=" rounded-md bg-sky-600 text-[18px] py-2 px-3 mr-2  whitespace-nowrap  hover:scale-95" onClick={handleClickNew} >+ New</button>
        <button className=" rounded-md bg-purple-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={handleClickDraw} >Draw</button>
        <button className=" rounded-md bg-green-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95" onClick={(e) => {handleSave(fileName, sections)}} >Save</button>
      
      <button className=" rounded-md bg-red-600 text-[18px] py-2 px-3 ml-2  whitespace-nowrap  hover:scale-95" onClick={(e) => {
        localStorage.removeItem(fileName);
        setSections([]);
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
  


  

}