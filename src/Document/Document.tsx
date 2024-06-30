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
    setSections([]);
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
    <>
      <Background />
      <div className="flex items-stretch h-screen w-screen ">
        <div className="flex flex-col items-stretch grow overflow-y-auto">
          <div className="flex justify-center items-center py-10">
            <input
              value={fileName}
              className="p-3 border-2 border-black max-w-[800px] grow rounded-md bg-white/50  text-lg"
              onChange={(e) => handleFileName(e.target.value)}
            />
          </div>
          <Sections sections={sections} setSections={setSections} />
          <DocumentButtons
            {...{
              handleClickDraw,
              handleRemove,
              handleSave,
              handleClickNew,
              sections,
            }}
          />
        </div>
      </div>
    </>
  );
};

const Background = () => (
  <div
    className="w-screen h-screen fixed top-0 left-0 opacity-30 -z-50"
    style={{
      background:
        "conic-gradient(from 3.1416rad at 20% 50%, #e66465, #9198e5,  #e66465)",
    }}
  ></div>
);
const Sidebar: FC = () => {
  return <div className="lg:w-[200px] h-full p-5 bg-white/30 ">Sidebar</div>;
};
