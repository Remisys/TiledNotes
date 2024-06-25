import { DragEventHandler, FC } from "react";

type PositionCellProps = {
  x: number;
  y: number;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
};
const PositionCell: FC<PositionCellProps> = ({ x, y, onDragStart, onDrop }) => {
  const gridColumn = `${x + 1} / ${x + 2}`;
  const gridRow = `${y + 1} / ${y + 2}`;
  return (
    <div
      className="w-full border-blue-500  hover:scale-105 hover:border-sky-500 border aspect-square "
      style={{ gridColumn, gridRow }}
      onDragStart={onDragStart}
      draggable
      onDrop={onDrop}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    />
  );
};

export default PositionCell;
