import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { CanvasModel } from "../Main";

type CanvasProps = {
  update: (data: string) => void;
  deleteCanvas: () => void;
} & CanvasModel;

export const Canvas: FC<CanvasProps> = ({ canvasData, deleteCanvas }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const onDraw = useRef(false);

  const [prevCoords, setPrevCoords] = useState<{ x?: number; y?: number }>({
    x: undefined,
    y: undefined,
  });

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const currX = e.nativeEvent.offsetX;
    const currY = e.nativeEvent.offsetY;
    setPrevCoords({ x: currX, y: currY });
    onDraw.current = true;
  };
  const onMouseUp = () => {
    setPrevCoords({ x: undefined, y: undefined });
    onDraw.current = false;
  };
  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!onDraw.current) return;
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const currX = e.nativeEvent.offsetX;
      const currY = e.nativeEvent.offsetY;
      ctx.fillStyle = "blue";
      //Adding new shape
      ctx.beginPath();
      ctx.moveTo(prevCoords.x ?? currX, prevCoords.y ?? currY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      setPrevCoords({ x: currX, y: currY });
      //Getting the current image
      if (!image.current) {
        if (image.current.src !== canvasData) {
          image.current.src = canvasData || "";
        }

        if (image.current.src.trim().length > 0) {
          ctx.drawImage(
            image.current,
            0,
            0,
            canvasRef.current.clientWidth,
            canvasRef.current.clientHeight
          );
        }
        image.current.src = canvasRef.current.toDataURL();
      }

      //update( model.id, canvas.current.toDataURL());
    }
  }

  const onInit = () => {
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;

    if (!image.current) {
      image.current = new Image();
    } else {
      if (image.current.src !== canvasData) {
        image.current.src = canvasData || "";
      }
      if (image.current.src !== "") {
        let ctx = canvasRef.current.getContext("2d");

        ctx.drawImage(
          image.current,
          0,
          0,
          canvasRef.current.clientWidth,
          canvasRef.current.clientHeight
        );
      }
      image.current.src = canvasRef.current.toDataURL();
    }
  };
  useEffect(() => {
    onInit();
  }, []);

  return (
    <div className="flex">
      <canvas
        ref={canvasRef}
        className="grow m-5 w-[100%] aspect-video border-solid border-2 border-indigo-600"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <button
        className=" bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center"
        onClick={deleteCanvas}
      >
        X
      </button>
    </div>
  );
};
