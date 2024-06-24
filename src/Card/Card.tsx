import { useState } from "react";

export interface CardModel {
  header: string;
  content: string;
  startPos: number[];
  endPos: number[];
}

function Card(props) {
  const [onHover, setOnHover] = useState(false);

  function pushTitle(title: string) {
    console.log("Triggered now");
    props.update(props.id, title, props.card.content);
  }
  function pushContent(content: string) {
    console.log("Triggered now");
    props.update(props.id, props.card.header, content);
  }

  return (
    <div
      className="rounded-lg bg-slate-50 p-2 border-2 border-sky-600 hover:scale-[1.02] flex flex-col "
      onMouseOut={() => setOnHover(false)}
      onMouseOver={() => setOnHover(true)}
      style={{ gridRow: props.gridRow, gridColumn: props.gridColumn }}
    >
      <textarea
        className=" appearance-none outline-none text-black font-bold h-[1.5em] text-[20px] w-[100%] mb-2 mx-1 text-center bg-inherit"
        disabled={!onHover}
        spellCheck="false"
        value={props.card.header}
        onChange={(e) => {
          pushTitle((e.target as HTMLTextAreaElement).value);
        }}
      ></textarea>
      <hr className="border-t-2 border-t-sky-700 my-1 shadow-xl"></hr>
      <textarea
        className="appearance-none outline-none text-black w-[100%] grow mx-1 bg-inherit"
        disabled={!onHover}
        spellCheck="false"
        value={props.card.content}
        onChange={(e) => {
          pushContent((e.target as HTMLTextAreaElement).value);
        }}
      ></textarea>
    </div>
  );
}

export default Card;
