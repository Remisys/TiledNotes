import { FC, MouseEvent, useEffect, useRef, useState } from "react";

export type CanvasModel = {
  canvasData?: string;
};

type CanvasProps = {
  update: (data: string) => void;
  deleteCanvas: () => void;
} & CanvasModel;

export const Canvas: FC<CanvasProps> = ({
  canvasData,
  deleteCanvas,
  update,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDraw = useRef(false);

  //Eventually the coordinates will be element-wise set to another value (undefined) to force react to rerender. Undefined because that is what starting point is unknown
  const [prevCoords, setPrevCoords] = useState<{ x?: number; y?: number }>({
    x: 0,
    y: 0,
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
    if (canvasRef.current !== null) {
      update(canvasRef.current.toDataURL()); //store canvas drawing onMouseUp
    }
  };
  function onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!onDraw.current) return;
    if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const currX = e.nativeEvent.offsetX;
      const currY = e.nativeEvent.offsetY;

      //Adding new shape
      ctx.beginPath();
      ctx.moveTo(prevCoords.x ?? currX, prevCoords.y ?? currY);
      ctx.lineTo(currX, currY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      setPrevCoords({ x: currX, y: currY });
    }
  }

  const onInit = () => {
    console.log("Canvas data : ", canvasData);
    canvasRef.current.width = canvasRef.current.clientWidth;
    canvasRef.current.height = canvasRef.current.clientHeight;

    if (canvasData && canvasData.length > 0) {
      let ctx = canvasRef.current.getContext("2d");
      const image = new Image();
      image.src = canvasData;

      ctx.drawImage(
        image,
        0,
        0,
        canvasRef.current.clientWidth,
        canvasRef.current.clientHeight
      );
    }
  };

  //Rerender the canvas when the ref is populated and set something so that react will rerender
  useEffect(() => {
    onInit();
    setPrevCoords({ x: undefined, y: undefined });
  }, [canvasRef.current]);

  return (
    <div className="flex self-stretch justify-center">
      <div className="grow  max-w-[800px] aspect-video p-5">
        <canvas
          ref={canvasRef}
          className="w-full h-full border-solid border-2 border-indigo-600"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        />
      </div>
      <div className="self-center">
        <button
          className=" bg-red-500 px-3 py-1 rounded-full hover:scale-[1.1] text-center"
          onClick={deleteCanvas}
        >
          X
        </button>
      </div>
    </div>
  );
};
