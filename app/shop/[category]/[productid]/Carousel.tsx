"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { carouselImages } from "../../../constants/data";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopupImage from "./PopupImage";

export default function Carousel({ isLandscape = true }: { isLandscape?: boolean }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);

  const scrollImage = (direction: string) => {
    switch (direction) {
      case "up":
        scrollRef.current?.scrollBy({ top: -200, left: 0, behavior: "smooth" });
        break;
      case "down":
        scrollRef.current?.scrollBy({ top: 200, left: 0, behavior: "smooth" });
        break;
      case "left":
        scrollRef.current?.scrollBy({ top: 0, left: -200, behavior: "smooth" });
        break;
      case "right":
        scrollRef.current?.scrollBy({ top: 0, left: 200, behavior: "smooth" });
        break;
      default:
        console.log("default");

    }
  }

  const handlePopupAction = (e: React.MouseEvent, action: string) => {
    switch (action) {
      case "close": {
        setShowPopup(false);
        break;
      }
      case "next": {
        let nextImageIndex = currentImageIndex + 1;
        if (nextImageIndex === carouselImages.length) nextImageIndex = 0;
        setCurrentImageIndex(nextImageIndex);
        break;
      }
      case "prev": {
        let nextImageIndex = currentImageIndex - 1;
        if (nextImageIndex === -1) nextImageIndex = carouselImages.length - 1;
        setCurrentImageIndex(nextImageIndex);
        break;
      }
      default: console.log("switch default")
    }
    e.stopPropagation();

  };

  useEffect(() => {
    if (showPopup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showPopup]);

  return (
    <div className={`w-full h-full flex gap-4 ${isLandscape ? "flex-row" : "flex-col-reverse"} `}>
      <div className={`relative flex ${isLandscape ? "flex-col w-1/5 h-full " : "flex-row w-full h-1/5"}`}>
        <div className={` flex flex-col justify-center items-center py-2 ${isLandscape ? "w-full " : "h-full"}`}>
          {isLandscape &&
            <IoIosArrowUp
              size={40}
              className="hover:cursor-pointer text-zinc-200 hover:text-zinc-100"
              onClick={() => scrollImage("up")}
            />
          }
          {!isLandscape &&
            <IoIosArrowBack
              size={40}
              className="hover:cursor-pointer text-zinc-200 hover:text-zinc-100"
              onClick={() => scrollImage("left")}
            />
          }
        </div>
        {/* carousel thumbnail */}
        <div
          ref={scrollRef}
          className={`w-full h-full flex gap-4 overflow-scroll scrollbar-none ${isLandscape ? "flex-col" : "flex-row"}`}
        >
          {carouselImages.map((item, index) => (
            <Image
              key={index} src={item.url} alt={item.name} width={item.width} height={item.height}
              className={`hover:opacity-35 hover:cursor-pointer aspect-auto object-cover object-center ${isLandscape ? "w-full" : "h-full "}`}
              onClick={() => setCurrentImageIndex(carouselImages.indexOf(item))}
            />
          ))}
        </div>
        <div className={` flex flex-col justify-center items-center py-2 ${isLandscape ? "w-full " : "h-full"}`}>
          {isLandscape &&
            <IoIosArrowDown
              size={40}
              className="hover:cursor-pointer text-zinc-200 hover:text-zinc-100"
              onClick={() => scrollImage("down")}
            />
          }
          {!isLandscape &&
            <IoIosArrowForward
              size={40}
              className="hover:cursor-pointer text-zinc-200 hover:text-zinc-100"
              onClick={() => scrollImage("right")}
            />
          }
        </div>
      </div>
      {/* Carousel slides */}
      <div className={`${isLandscape ? "w-4/5 h-full" : "w-full h-4/5"} `}>
        <Image src={carouselImages[currentImageIndex].url} alt={carouselImages[currentImageIndex].name}
          width={carouselImages[currentImageIndex].width} height={carouselImages[currentImageIndex].height}
          className="w-full h-full object-center object-contain hover:cursor-zoom-in"
          onClick={() => setShowPopup(true)}
        />
      </div>
      {
        showPopup && <PopupImage imageList={carouselImages} imageIndex={currentImageIndex} isLandscape={isLandscape} callback={handlePopupAction} />
      }
    </div>
  )
}