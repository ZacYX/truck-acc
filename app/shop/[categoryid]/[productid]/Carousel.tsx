"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PopupImage from "./PopupImage";
import { Picture } from "@prisma/client";

export default function Carousel({ isLandscape = true, images }: {
  isLandscape?: boolean,
  images: Picture[]
}) {
  const [imagesToShow, setImagesToShow] = useState<Picture[]>();

  useEffect(() => {
    const getImagesToShow = async () => {
      let sortedImages;
      if (images.length > 1) {
        sortedImages = images.toSorted((a, b) => {
          if (!a.order || a.order === undefined) return 1;
          if (!b.order || b.order === undefined) return -1;
          return a.order.localeCompare(b.order);
        });
      } else {
        sortedImages = images;
      }
      const sotedImagesWithPresignedUrl = await Promise.all(
        sortedImages.map(async (item) => {
          const response = await fetch(`/api/upload?name=${item.url}`);
          const presignedUrl = await response.json();
          return ({
            ...item,
            url: presignedUrl,
          })
        }))
      setImagesToShow(sotedImagesWithPresignedUrl);
    }
    getImagesToShow();
  }, [images])

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
    if (!imagesToShow || !imagesToShow?.length) {
      return
    }
    switch (action) {
      case "close": {
        setShowPopup(false);
        break;
      }
      case "next": {
        let nextImageIndex = currentImageIndex + 1;
        if (nextImageIndex === imagesToShow.length) nextImageIndex = 0;
        setCurrentImageIndex(nextImageIndex);
        break;
      }
      case "prev": {
        let nextImageIndex = currentImageIndex - 1;
        if (nextImageIndex === -1) nextImageIndex = imagesToShow.length - 1;
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
          {imagesToShow?.map((item, index) => (
            <Image
              key={index} src={item.url} alt={item.alt || ""} width={item.width ?? 400} height={item.height ?? 400}
              className={`hover:opacity-35 hover:cursor-pointer aspect-auto object-cover object-center ${isLandscape ? "w-full" : "h-full "}`}
              onClick={() => setCurrentImageIndex(imagesToShow.indexOf(item))}
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
        {imagesToShow &&
          <Image
            src={imagesToShow[currentImageIndex].url}
            alt={imagesToShow[currentImageIndex].alt ?? ""}
            width={imagesToShow[currentImageIndex].width ?? 400}
            height={imagesToShow[currentImageIndex].height ?? 400}
            className="w-full h-full object-center object-contain hover:cursor-zoom-in"
            onClick={() => setShowPopup(true)}
          />

        }
      </div>
      {
        showPopup &&
        imagesToShow &&
        <PopupImage
          imageList={imagesToShow}
          imageIndex={currentImageIndex}
          isLandscape={isLandscape}
          callback={handlePopupAction}
        />
      }
    </div>
  )
}