import { FC, useState } from "react";

export interface CardModel {
  header: string;
  content: string;
  startPos: { x: number; y: number };
  endPos: { x: number; y: number };
}

type CardProps = {
  update: (c: CardModel) => void;
} & CardModel;

const Card: FC<CardProps> = ({ update, ...cardModel }) => {
  const [onHover, setOnHover] = useState(false);

  const {
    header,
    content,
    startPos: { x: x0, y: y0 },
    endPos: { x: x1, y: y1 },
  } = cardModel;

  const updateHeader = (header: string) => update({ ...cardModel, header });
  const updateContent = (content: string) => update({ ...cardModel, content });
  const gridColumn = `${x0}/${x1 + 1}`;
  const gridRow = `${y0}/${y1 + 1}`;
  return (
    <div
      className="rounded-lg bg-slate-50 p-2 border-2 border-sky-600 hover:scale-[1.02] flex flex-col pointer-events-auto "
      onMouseOut={() => setOnHover(false)}
      onMouseOver={() => setOnHover(true)}
      style={{
        gridColumn,
        gridRow,
      }}
    >
      <textarea
        className=" appearance-none outline-none text-black font-bold h-[1.5em] text-[20px] w-[100%] mb-2 mx-1 text-center bg-inherit"
        disabled={!onHover}
        spellCheck="false"
        value={header}
        onChange={(e) => {
          updateHeader(e.target.value);
        }}
      />
      <hr className="border-t-2 border-t-sky-700 my-1 shadow-xl" />
      <textarea
        className="appearance-none outline-none text-black w-[100%] grow mx-1 bg-inherit"
        disabled={!onHover}
        spellCheck="false"
        value={content}
        onChange={(e) => {
          updateContent(e.target.value);
        }}
      />
    </div>
  );
};

export default Card;
