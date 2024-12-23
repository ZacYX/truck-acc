"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { WebPicture } from "@prisma/client";
import { aboutUsFirstData, SectionData } from "../lib/data";


export default function AboutUs() {
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const [aboutUsFirst, setAboutUsFirst] = useState<SectionData>();

  const fetchData = async (
    sectionName: string,
    initData: SectionData,
    cb: (data: SectionData) => void
  ) => {
    const response = await fetch(`/api/web-info?name=${sectionName}`);
    if (!response.ok) {
      console.error(`fetch section data ${sectionName} of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of ${sectionName} is empty`);
      cb(initData);
      return;
    }
    //update image url to the presigned url
    const { images } = result;
    if (!images || images.length === 0) {
      cb({
        ...result,
        images: initData.images,
      })
      return
    }
    const urlPromises = images.map((image: WebPicture) => (
      fetch(`/api/upload?name=${image.url}`)
    ))
    const urlResponses = await Promise.all(urlPromises);
    const urls = await Promise.all(urlResponses.map((item) => (
      item.json()
    )));
    const updatedImages = images.map((item: WebPicture, index: number) => ({
      ...item,
      url: urls[index]
    }))
    cb({
      ...result,
      images: updatedImages
    });
  }

  useEffect(() => { fetchData(`aboutUsFirst`, aboutUsFirstData, setAboutUsFirst); }, [])

  return (
    <div>
      {
        aboutUsFirst &&
        < div className={`relative h-screen flex justify-center items-center ${isFirstLoaded ? "block" : "hidden"}`}>
          {
            aboutUsFirst.images &&
            <Image
              src={aboutUsFirst.images[0].url}
              alt={aboutUsFirst.images[0].alt}
              width={aboutUsFirst.images[0].width}
              height={aboutUsFirst.images[0].height}
              className="absolute w-full h-full object-cover object-center"
              priority
              onLoadingComplete={() => setIsFirstLoaded(true)}
            />
          }
          <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center font-bold text-2xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl ">
            <p className="text-orange-500 ">{aboutUsFirst.title[0]}</p>
            <p className="text-amber-400 ">{aboutUsFirst.title[1]}</p>
            <p className="text-stone-400 ">{aboutUsFirst.title[2]}</p>
          </div>
        </div>
      }

    </div >
  );
}
