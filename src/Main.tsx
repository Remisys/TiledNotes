import { isEqual } from "lodash";
import { FC, useEffect, useState } from "react";
import { CardModel } from "./Card/Card";
import { InnerSections } from "./InnerSections";

export type GridModel = {
  gridCards?: CardModel[];
};

export type CanvasModel = {
  canvasData?: string;
};

export enum SectionEnum {
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

  const handleClickNew = () =>
    setSections((x) => [...x, { gridCards: [], type: SectionEnum.Grid }]);

  const handleClickDraw = () =>
    setSections((x) => [...x, { type: SectionEnum.Canvas }]);

  return (
    <div className="flex flex-col items-center text-white  justify-center h-screen">
      <InnerSections
        fileName={fileName}
        sections={sections}
        setSections={setSections}
      />

      <div className="self-stretch flex justify-center mb-20 self-trans ">
        <div className="px-5 grow  max-w-[800px] flex justify-between">
          <button
            className=" rounded-md bg-sky-600 text-[18px] py-2 px-3  whitespace-nowrap  hover:scale-95"
            onClick={handleClickNew}
          >
            + New
          </button>
          <button
            className=" rounded-md bg-purple-600 text-[18px] py-2 px-3  whitespace-nowrap  hover:scale-95"
            onClick={handleClickDraw}
          >
            Draw
          </button>
          <button
            className=" rounded-md bg-green-600 text-[18px] py-2 px-3   whitespace-nowrap  hover:scale-95"
            onClick={() => {
              handleSave(fileName, sections);
            }}
          >
            Save
          </button>
          <button
            className=" rounded-md bg-red-600 text-[18px] py-2 px-3   whitespace-nowrap  hover:scale-95"
            onClick={() => {
              localStorage.removeItem(fileName);
              setSections([]);
            }}
          >
            x Delete
          </button>
        </div>
        <button className="invisible  px-3 py-1 rounded-full hover:scale-[1.1] text-center">
          X
        </button>
      </div>
      <div className="flex flex-row  p-3  fixed left-0 bottom-0 items-center justify-center w-[100%] z-2 bg-white border-t-2 border-t-sky-600">
        <input
          className=" border-b-2 border-green-700 text-[18px] py-2 px-3 mx-2 whitespace-nowrap text-black appearance-none outline-none"
          value={fileName}
          placeholder="Your File"
          onChange={(e) => {
            handleFileName(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
