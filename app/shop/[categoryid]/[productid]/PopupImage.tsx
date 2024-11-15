import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Picture } from "@prisma/client";

export default function PopupImage(
  { imageList, imageIndex, isLandscape = true, callback }:
    { imageList: Picture[], imageIndex: number, isLandscape?: boolean, callback: (e: React.MouseEvent, action: string) => void }) {

  const [isOriginal, setIsOriginal] = useState(false);

  const handleZoomIn = () => {
    isOriginal === false ? setIsOriginal(isLandscape ? true : false) : setIsOriginal(false);
  }

  return (
    <div className={` flex z-40 bg-black/30 fixed top-0 left-0 py-4 w-full h-[100vh] ${isLandscape ? "flex-row " : "flex-col"}`}>
      <IoClose
        size={30}
        className="z-50 absolute top-2 left-2 hover:cursor-pointer text-zinc-50/20 hover:text-zinc-50/70"
        onClick={(e) => callback(e, "close")}
      />
      {!isLandscape &&
        <div
          className={`relative flex justify-center items-center ${isLandscape ? "flex-col" : "flex-row"}`}
          onClick={(e) => callback(e, "close")}
        >
          <IoIosArrowUp
            size={70}
            className="z-40 hover:cursor-pointer text-zinc-50/20 hover:text-zinc-50/70"
            onClick={(e) => callback(e, "prev")}
          />
        </div>
      }
      {isLandscape &&
        <div
          className={`relative flex justify-center items-center ${isLandscape ? "flex-col" : "flex-row"}`}
          onClick={(e) => callback(e, "close")}
        >
          <IoIosArrowBack
            size={70}
            className="z-40 hover:cursor-pointer text-zinc-50/20 hover:text-zinc-50/70"
            onClick={(e) => callback(e, "prev")}
          />
        </div>
      }
      <div
        className="relative box-border w-full h-full p-4 bg-white rounded-2xl "
      >
        <Image
          src={imageList[imageIndex].url}
          alt={imageList[imageIndex].alt ?? ""}
          width={imageList[imageIndex].width ?? 400}
          height={imageList[imageIndex].height ?? 400}
          className={` w-full h-full object-center object-contain ${isLandscape ? "hover:cursor-zoom-in " : ""}`}
          onClick={handleZoomIn}
        />
      </div>
      {!isLandscape &&
        <div
          className={`relative flex justify-center items-center ${isLandscape ? "flex-col" : "flex-row"}`}
          onClick={(e) => callback(e, "close")}
        >
          <IoIosArrowDown
            size={70}
            className="z-40 hover:cursor-pointer text-zinc-50/20 hover:text-zinc-50/70"
            onClick={(e) => callback(e, "next")}
          />
        </div>
      }
      {isLandscape &&
        <div
          className={`relative flex justify-center items-center ${isLandscape ? "flex-col" : "flex-row"}`}
          onClick={(e) => callback(e, "close")}
        >
          <IoIosArrowForward
            size={70}
            className="z-40 hover:cursor-pointer text-zinc-50/20 hover:text-zinc-50/70"
            onClick={(e) => callback(e, "next")}
          />
        </div>
      }
      {isOriginal &&
        <div className={` z-[60] fixed top-0 left-0 w-full h-[100vh] bg-white overflow-auto overscroll-none `}>
          <Image
            src={imageList[imageIndex].url}
            alt={imageList[imageIndex].alt ?? ""}
            width={imageList[imageIndex].width ?? 400}
            height={imageList[imageIndex].height ?? 400}
            quality={100}
            className={`hover:cursor-zoom-out object-center `}
            onClick={handleZoomIn}
          />
        </div>
      }
    </div>
  )
}