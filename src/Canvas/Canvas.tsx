import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { CanvasModel } from "../Main";
interface position {
  x: number;
  y: number;
}

interface CanvasProps {
  model: CanvasModel;
  update: (id: number, data: string) => void;
  deleteCanvas: (id: number) => void;
}

export const Canvas = ({ model, update, deleteCanvas }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef(null);
  const onDraw = useRef(false);
  const init = useRef(false);

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
    if (canvas.current !== null) {
      const ctx = canvas.current.getContext("2d");
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
      if (image.current !== null) {
        if (image.current.src !== model.data) {
          image.current.src = model.data || "";
        }

        if (image.current.src !== "") {
          ctx.drawImage(
            image.current,
            0,
            0,
            canvas.current.clientWidth,
            canvas.current.clientHeight
          );
        }
        image.current.src = canvas.current.toDataURL();
      }

      //update( model.id, canvas.current.toDataURL());
    }
  }

  useEffect(() => {
    if (init.current === false) {
      canvas.current.width = canvas.current.clientWidth;
      canvas.current.height = canvas.current.clientHeight;
      console.log("Init changed");
      init.current = true;
    }
    if (image.current === null) {
      image.current = new Image();
    } else {
      if (image.current.src !== model.data) {
        image.current.src = model.data || "";
      }
      if (image.current.src !== "") {
        let context = (canvas.current as HTMLCanvasElement).getContext("2d");

        context.drawImage(
          image.current,
          0,
          0,
          canvas.current.clientWidth,
          canvas.current.clientHeight
        );
      }
      image.current.src = canvas.current.toDataURL();
    }
  }, []);

  return (
    <div className="flex">
      <canvas
        ref={canvas}
        className="grow m-5 w-[100%] aspect-video border-solid border-2 border-indigo-600"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      />
      <button
        className=" bg-red-500 self-center px-3 py-1 rounded-full hover:scale-[1.1] text-center"
        onClick={() => deleteCanvas(model.id)}
      >
        X
      </button>
    </div>
  );
};
