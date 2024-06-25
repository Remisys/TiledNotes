import { DragEvent, FC, useState } from "react";
import Card, { CardModel } from "../Card/Card";
import { GridModel } from "../Main";
import ShowPositionGrid from "./PGrid";

type GridProps = {
  file: string;
  update: (content: CardModel[]) => void;
  deleteGrid: () => void;
} & GridModel;

export const Grid: FC<GridProps> = ({
  gridCards,
  file,
  update,
  deleteGrid,
}) => {
  const [cards, setCards] = useState<CardModel[]>(gridCards);
  if (!cards) return;
  const width = 4;
  const height = 4;
  let grid = Array(width * height).fill(0);

  const getXY = (index: number) => ({
    x: (index % width) + 1,
    y: Math.floor(index / width) + 1,
  });

  for (let i = 0; i < grid.length; i++) {
    const xTile = getXY(i).x;
    const yTile = getXY(i).y;
    let found = false;
    for (let j = 0; j <= cards.length; j++) {
      const note = cards[j];
      if (note !== undefined) {
        if (
          note.startPos[0] <= xTile &&
          xTile <= note.endPos[0] &&
          note.startPos[1] <= yTile &&
          yTile <= note.endPos[1]
        ) {
          grid[i] = j + 1;
          found = true;
          break;
        }
      }
    }
    if (!found) {
      grid[i] = 0;
    }
  }

  const onDragStart = (x: number, y: number) => (e: DragEvent) => {
    console.log("X : ", x, ", Y: ", y);
    e.dataTransfer.setData("text/plain", `${x} ${y}`);
  };
  const onDrop = (xEnd: number, yEnd: number) => (e: DragEvent) => {
    e.preventDefault();
    const coordinates = e.dataTransfer.getData("text/plain").split(" ");
    const x = Number(coordinates[0]);
    const y = Number(coordinates[1]);
    setCards((cards) => [
      ...cards,
      {
        header: "Header",
        content: "Content",
        startPos: [x, y],
        endPos: [xEnd, yEnd],
      },
    ]);
  };

  function isAllFilled() {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === 0) return false;
    }
    return true;
  }

  function updateCard(id: number, header: string, content: string) {
    setCards((x) => {
      const localCards = [
        ...x.slice(0, id),
        { ...x[id], header: header, content: content },
        ...x.slice(id + 1),
      ];
      return localCards;
    });
    const localGridNotes = [
      ...cards.slice(0, id),
      { ...cards[id], header: header, content: content },
      ...cards.slice(id + 1),
    ];
    update(localGridNotes);
  }
  const styleA = {
    gridGap: "1rem",
    display: "grid",
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  };

  const showPositionGrid = (value: number, index: number) => {
    const x = getXY(index).x;
    const y = getXY(index).y;
    return (
      <ShowPositionGrid
        value={value}
        x={x}
        y={y}
        key={`${x} ${y}`}
        onDragStart={onDragStart(x, y)}
        onDrop={onDrop(x, y)}
      />
    );
  };

  return (
    <div className="flex">
      <div className="grow">
        {isAllFilled() && (
          <div className="p-5" style={styleA}>
            {cards.map((val, index) => (
              <Card
                gridColumn={`${val.startPos[0]}/${val.endPos[0] + 1}`}
                gridRow={`${val.startPos[1]}/${val.endPos[1] + 1}`}
                key={`${val.startPos} ${val.endPos} ${file} ${index}`}
                id={index}
                card={val}
                update={updateCard}
              />
            ))}
          </div>
        )}

        {!isAllFilled() && (
          <div className="p-5" style={styleA}>
            {grid.map((val, index) => showPositionGrid(val, index))}
          </div>
        )}
      </div>
      <button
        className=" bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center"
        onClick={deleteGrid}
      >
        X
      </button>
    </div>
  );
};
