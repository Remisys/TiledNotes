import { DragEventHandler, FC } from "react";

const ShowPositionGrid: FC<{
  value: number;
  x: number;
  y: number;
  onDragStart: DragEventHandler<HTMLDivElement>;
  onDrop: DragEventHandler<HTMLDivElement>;
}> = ({ value, x, y, onDragStart, onDrop }) => {
  return (
    <div
      className=" bg-blue-500 rounded-full hover:scale-105 hover:bg-sky-500 text-lg z-0"
      style={{ gridColumn: `${x} / ${x + 1}`, gridRow: `${y} / ${y + 1}` }}
      onDragStart={onDragStart}
      draggable
      onDrop={onDrop}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
    >
      <h5 className="px-4 py-2 hover:underline hover:underline-offset-4">
        {value}
      </h5>
    </div>
  );
};

export default ShowPositionGrid;
