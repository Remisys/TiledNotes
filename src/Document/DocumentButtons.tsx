import Link from "next/link";
import { FC } from "react";
import { SectionModel } from "./Document";

export const DocumentButtons: FC<{
  handleClickNew: () => void;
  handleClickDraw: () => void;
  handleSave: () => void;
  handleRemove: () => void;
  sections: SectionModel[];
}> = ({
  handleClickNew,
  handleClickDraw,
  handleRemove,
  handleSave,
  sections,
}) => (
  <div className="self-stretch flex justify-center mb-20 self-trans ">
    <div className="px-5 grow  max-w-[800px] flex justify-between">
      <Link href={`./#${sections.length}`} scroll={false}>
        <button
          className=" rounded-md bg-sky-600 text-[18px] py-2 px-3  whitespace-nowrap  hover:scale-95"
          onClick={handleClickNew}
        >
          + New
        </button>
      </Link>
      <button
        className=" rounded-md bg-purple-600 text-[18px] py-2 px-3  whitespace-nowrap  hover:scale-95"
        onClick={handleClickDraw}
      >
        Draw
      </button>
      <button
        className=" rounded-md bg-green-600 text-[18px] py-2 px-3   whitespace-nowrap  hover:scale-95"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className=" rounded-md bg-red-600 text-[18px] py-2 px-3   whitespace-nowrap  hover:scale-95"
        onClick={handleRemove}
      >
        x Delete
      </button>
    </div>
    <button className="invisible  px-3 py-1 rounded-full hover:scale-[1.1] text-center">
      X
    </button>
  </div>
);
