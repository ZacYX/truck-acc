"use client";

import { WebInfo, WebPicture } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { aboutUs } from "../lib/data";

type WebInfoWithImages = WebInfo & { images: WebPicture[] }

export default function AboutUs() {
  const [aboutUsInfo, setAboutUsInfo] = useState<WebInfoWithImages>(aboutUs as WebInfoWithImages);

  useEffect(() => {
    const getImage = async () => {
      const response = await fetch(`/api/web-info?name=aboutus`);
      if (!response.ok) {
        console.log(`Fetch about us image failed`);
        return;
      }
      const result = await response.json();
      setAboutUsInfo(result);
    }
  }, [])

  return (
    <div>
      <div className="relative w-full flex justify-center items-center min-h-[75vh] ">
        <Image
          src={aboutUsInfo?.images[0].url}
          alt={aboutUsInfo?.images[0].alt ?? ""}
          width={aboutUsInfo?.images[0].width ?? 400}
          height={aboutUsInfo?.images[0].height ?? 400}
          className="absolute w-full h-full object-cover object-center"
        />
        <div
          className="z-10 relative  w-full p-16 flex flex-col justify-center items-center 
            text-zinc-300"
        >
          <p className="xs:flex py-2 xs:py-4 text-center text-xl xs:text-2xl md:text-4xl">
            {aboutUsInfo.title[0]}
          </p>
          <p className="py-2 xs:py-4 ">{aboutUsInfo.content[0]}</p>
        </div>
      </div>
    </div >
  );
}
