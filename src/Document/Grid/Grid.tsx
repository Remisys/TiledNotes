import { DragEvent, FC } from "react";
import Card, { CardModel } from "../Card/Card";

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  getFreeSpaces,
} from "./GridHelperFunctions";
import PositionCell from "./PositionCell";

export type GridModel = {
  gridCards?: CardModel[];
};

const styleA = {
  gridGap: "1rem",
  display: "grid",
  gridTemplateColumns: `repeat(${DEFAULT_WIDTH}, 1fr)`,
  gridTemplateRows: `repeat(${DEFAULT_HEIGHT}, 1fr)`,
};

type GridProps = {
  update: (content: CardModel[]) => void;
  deleteGrid: () => void;
} & GridModel;

export const Grid: FC<GridProps> = ({ gridCards = [], update, deleteGrid }) => {
  const freePoints = getFreeSpaces(gridCards);

  const onDragStart = (x: number, y: number) => (e: DragEvent) =>
    e.dataTransfer.setData("text/plain", `${x} ${y}`);

  const onDrop = (xDrop: number, yDrop: number) => (e: DragEvent) => {
    e.preventDefault();
    const dragStartCoords = e.dataTransfer.getData("text/plain").split(" ");
    const xStart = Math.min(Number(dragStartCoords[0]), xDrop);
    const yStart = Math.min(Number(dragStartCoords[1]), yDrop);
    const xEnd = Math.max(Number(dragStartCoords[0]), xDrop);
    const yEnd = Math.max(Number(dragStartCoords[1]), yDrop);
    console.log("Card created from ", { xStart, yStart }, { xEnd, yEnd });
    update([
      ...gridCards,
      {
        header: "Header",
        content: "Content",
        startPos: { x: xStart, y: yStart },
        endPos: { x: xEnd, y: yEnd },
      },
    ]);
  };

  /**
   * Update the card with a certain id
   * @param id id of the card supplied when assigning the handler
   * @returns the function to update the card with that id
   */
  const updateCard =
    (id: number) =>
    ({ header, content }: CardModel) => {
      const localGridNotes = [
        ...gridCards.slice(0, id),
        { ...gridCards[id], header, content },
        ...gridCards.slice(id + 1),
      ];
      update(localGridNotes);
    };

  return (
    <div className="self-stretch flex justify-center  ">
      <div className="grow  max-w-[800px] ">
        <div className=" w-full aspect-square p-5" style={styleA}>
          {gridCards.map((card, index) => (
            <Card key={index} {...card} update={updateCard(index)} />
          ))}
          {freePoints.map(({ x, y }) => (
            <PositionCell
              x={x}
              y={y}
              key={`${x} ${y}`}
              onDragStart={onDragStart(x, y)}
              onDrop={onDrop(x, y)}
            />
          ))}
        </div>
      </div>
      <div className="self-center">
        <button
          className=" bg-red-500 px-3 py-1 rounded-full hover:scale-[1.1] text-center text-white"
          onClick={deleteGrid}
        >
          X
        </button>
      </div>
    </div>
  );
};
