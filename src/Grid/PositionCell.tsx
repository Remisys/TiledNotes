import { DragEventHandler, FC, useState } from "react";

type PositionCellProps = {
  x: number;
  y: number;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
};
const PositionCell: FC<PositionCellProps> = ({ x, y, onDragStart, onDrop }) => {
  const gridColumn = `${x} / ${x + 1}`;
  const gridRow = `${y} / ${y + 1}`;
  const [draggedHere, setDraggedHere] = useState(false);
  return (
    <div
      className={` ${draggedHere ? "bg-sky-500" : "border-blue-500"} w-full  hover:scale-105 hover:bg-sky-500 border-2 hover:border-none aspect-square`}
      style={{ gridColumn, gridRow }}
      onDragStart={onDragStart}
      draggable
      onDrop={onDrop}
      onDragEnter={(e) => {
        e.preventDefault();
        setDraggedHere(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDraggedHere(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};

export default PositionCell;
