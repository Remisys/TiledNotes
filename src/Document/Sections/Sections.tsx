import { Dispatch, FC, SetStateAction } from "react";
import { Canvas } from "../Canvas/Canvas";
import { CardModel } from "../Card/Card";
import { SectionEnum, SectionModel } from "../Document";
import { Grid } from "../Grid/Grid";

export const Sections: FC<{
  fileName: string;
  sections: SectionModel[];
  setSections: Dispatch<SetStateAction<SectionModel[]>>;
}> = ({ fileName, sections, setSections }) => {
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

  return (
    <div className="m-10 flex flex-col items-center w-[100%] overflow-y-auto ">
      <div className="pt-[100px] md:pt-[125px] xl:pt-[150px]   pb-[0px] w-full justify-center  ">
        {sections.map(({ type, gridCards, canvasData }, id) => (
          <div className="flex flex-col   py-4" id={`${id}`} key={id}>
            {type === SectionEnum.Grid ? (
              <Grid
                update={updateGrid(id)}
                deleteGrid={deleteElement(id)}
                gridCards={gridCards}
                file={fileName}
              />
            ) : (
              <Canvas
                update={updateCanvas(id)}
                deleteCanvas={deleteElement(id)}
                canvasData={canvasData}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
