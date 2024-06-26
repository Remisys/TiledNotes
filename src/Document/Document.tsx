import { isEqual } from "lodash";
import { FC, useEffect, useState } from "react";
import { CanvasModel } from "./Canvas/Canvas";
import { DocumentButtons } from "./DocumentButtons";
import { GridModel } from "./Grid/Grid";
import { Sections } from "./Sections/Sections";

export enum SectionEnum {
  Grid,
  Canvas,
}
export type SectionModel = {
  type: SectionEnum;
} & GridModel &
  CanvasModel;

export const Document: FC = () => {
  const [fileName, setFileName] = useState("yourFile");

  const [sections, setSections] = useState<SectionModel[]>([]);
  useEffect(() => {
    loadFile(fileName);
  }, []);

  const handleSave = () => {
    localStorage.setItem(fileName, JSON.stringify(sections));
  };

  const loadFile = (newFileName: string) => {
    if (newFileName.trim().length > 0) {
      let item = localStorage.getItem(newFileName);
      if (item !== null) {
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

  const handleRemove = () => {
    localStorage.removeItem(fileName);
    setSections([]);
  };

  return (
    <div className="flex flex-col items-center text-white  justify-center h-screen">
      <Sections
        fileName={fileName}
        sections={sections}
        setSections={setSections}
      />

      <DocumentButtons
        {...{
          handleClickDraw,
          handleRemove,
          handleSave,
          handleClickNew,
          sections,
        }}
      />
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
