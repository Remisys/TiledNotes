import { isEqual } from "lodash";
import { FC, useEffect, useState } from "react";
import { Canvas } from "./Canvas/Canvas";
import { CardModel } from "./Card/Card";
import { Grid } from "./Grid/Grid";

export type GridModel = {
  gridCards?: CardModel[];
};

export type CanvasModel = {
  canvasData?: string;
};

enum SectionEnum {
  Grid,
  Canvas,
}
export type SectionModel = {
  type: SectionEnum;
} & GridModel &
  CanvasModel;

export const Main: FC = () => {
  const [fileName, setFileName] = useState("yourFile");
  const [sections, setSections] = useState<SectionModel[]>([]);

  useEffect(() => {
    //loadFile(fileName);
  }, []);

  const handleSave = (file: string, content: SectionModel[]) => {
    localStorage.setItem(file, JSON.stringify(content));
  };

  const loadFile = (newFileName: string) => {
    if (newFileName.trim().length > 0) {
      let item = localStorage.getItem(newFileName);
      if (!item) {
        let parsedCards = JSON.parse(item);
        if (!isEqual(parsedCards, sections)) {
          setSections(parsedCards);
        }
      }
    }
    setFileName(newFileName);
  };
  const handleFileName = (newFileName: string) => {
    localStorage.setItem(fileName, JSON.stringify(sections));
    loadFile(newFileName);
  };

  const deleteElement = (id: number) => () =>
    setSections((x) => [...x.slice(0, id), ...x.slice(id + 1)]);

  const updateGrid = (id: number) => (gridCards: CardModel[]) =>
    setSections((x) => [
      ...x.slice(0, id),
      { gridCards, type: SectionEnum.Grid },
      ...x.slice(id + 1),
    ]);

  const updateCanvas = (id: number) => (canvas: string) =>
    setSections((x) => [
      ...x.slice(0, id),
      { canvasData: canvas, type: SectionEnum.Canvas },
      ...x.slice(id + 1),
    ]);

  const handleClickNew = () =>
    setSections((x) => [...x, { gridCards: [], type: SectionEnum.Grid }]);

  const handleClickDraw = () =>
    setSections((x) => [...x, { type: SectionEnum.Canvas }]);

  return (
    <div className="flex flex-col items-center text-white  justify-center h-screen">
      <div className="m-10 flex flex-col items-center w-[100%] overflow-y-auto">
        <div className="bg-inherit flex flex-col fixed top-0 left-0 w-[100%] max-h-[150px] md:max-h-[175px] xl:max-h-[200px] z-40 ">
          <svg preserveAspectRatio="none" viewBox="0 0 400 200">
            <linearGradient id="a">
              <stop offset="0%" stopColor="#FF0031" />

              <stop offset="50%" stopColor="#FF7800" />

              <stop offset="100%" stopColor="#FFCD00" />
            </linearGradient>
            <path d="M 0,130 L 400,200 L 400,0 L 0,0 Z" fill="url(#a)"></path>
          </svg>
        </div>
        <div className=" flex flex-col items-center  mt-10  fixed top-0 left-0 w-[100%] max-h-[150px] md:max-h-[175px] xl:max-h-[200px] z-50">
          <p className="text-4xl font-mono  xl:mt-5 tracking-wider font-semibold">
            Tiling Notes
          </p>
        </div>
        <div className="pt-[100px] md:pt-[125px] xl:pt-[150px]   pb-[0px] w-[90%] max-w-[800px] ">
          {sections.map(({ type, gridCards, canvasData }, id) =>
            type === SectionEnum.Grid ? (
              <Grid
                update={updateGrid(id)}
                deleteGrid={deleteElement(id)}
                gridCards={gridCards}
                file={fileName}
                key={id}
              />
            ) : (
              <Canvas
                update={updateCanvas(id)}
                deleteCanvas={deleteElement(id)}
                canvasData={canvasData}
                key={id}
              />
            )
          )}
        </div>

        <div className="flex justify-between w-[90%] max-w-[715px] mb-10  py-5 relative right-[20px] ">
          <button
            className=" rounded-md bg-sky-600 text-[18px] py-2 px-3 mr-2  whitespace-nowrap  hover:scale-95"
            onClick={handleClickNew}
          >
            + New
          </button>
          <button
            className=" rounded-md bg-purple-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95"
            onClick={handleClickDraw}
          >
            Draw
          </button>
          <button
            className=" rounded-md bg-green-600 text-[18px] py-2 px-3 mx-2  whitespace-nowrap  hover:scale-95"
            onClick={() => {
              handleSave(fileName, sections);
            }}
          >
            Save
          </button>

          <button
            className=" rounded-md bg-red-600 text-[18px] py-2 px-3 ml-2  whitespace-nowrap  hover:scale-95"
            onClick={(e) => {
              localStorage.removeItem(fileName);
              setSections([]);
            }}
          >
            x Delete
          </button>
        </div>
      </div>
      <div className="flex flex-row  p-3  fixed left-0 bottom-0 items-center justify-center w-[100%] z-2 bg-white border-t-2 border-t-sky-600">
        <input
          className=" border-b-2 border-green-700 text-[18px] py-2 px-3 mx-2 whitespace-nowrap text-black appearance-none outline-none"
          value={fileName}
          placeholder="Your File"
          onInput={(e) => {
            handleFileName((e.target as HTMLInputElement).value);
          }}
        />
      </div>
    </div>
  );
};
