"use client";

import Image from "next/image";
import InfoCard from "./dashboard/InfoCard";
import { firstData, secondData, thirdData, fourthData, fifthData, fourthCardsData } from "./lib/data";
import ShowCase from "./dashboard/Showcase";
import { useEffect, useState } from "react";
import type { SectionData, SectionImage } from "./lib/data";
import { WebPicture } from "@prisma/client";


export default function Home() {
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isSecondLoaded, setIsSecondLoaded] = useState(false);
  const [isThirdLoaded, setIsThirdLoaded] = useState(false);
  const [isFourthLoaded, setIsFourthLoaded] = useState(false);
  const [isFifthLoaded, setIsFifthLoaded] = useState(false);

  const [first, setFirst] = useState<SectionData>();
  const [second, setSecond] = useState<SectionData>();
  const [third, setThird] = useState<SectionData>();
  const [fourth, setFourth] = useState<SectionData>();
  const [fourthCards, setFourthCards] = useState<SectionData>();
  const [fifth, setFifth] = useState<SectionData>();

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

  useEffect(() => { fetchData(`first`, firstData, setFirst); }, [])
  useEffect(() => { fetchData(`second`, secondData, setSecond); }, [])
  useEffect(() => { fetchData(`third`, thirdData, setThird); }, [])
  useEffect(() => { fetchData(`fourth`, fourthData, setFourth); }, [])
  useEffect(() => { fetchData(`fourthCards`, fourthCardsData, setFourthCards); }, [])
  useEffect(() => { fetchData(`fifth`, fifthData, setFifth); }, [])

  return (
    <div>
      {
        first &&
        < div className={`relative h-screen flex justify-center items-center ${isFirstLoaded ? "block" : "hidden"}`}>
          {
            first.images &&
            <Image
              src={first.images[0].url ?? firstData.images[0].url}
              alt={first.images[0].alt ?? firstData.images[0].alt}
              width={first.images[0].width ?? firstData.images[0].width}
              height={first.images[0].height ?? firstData.images[0].height}
              className="absolute w-full h-full object-cover object-center"
              priority
              onLoadingComplete={() => setIsFirstLoaded(true)}
            />
          }
          <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center font-bold text-2xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl ">
            <p className="text-orange-500 ">{first.title[0]}</p>
            <p className="text-amber-400 ">{first.title[1]}</p>
            <p className="text-stone-400 ">{first.title[2]}</p>
          </div>
        </div>
      }

      {
        second &&
        <div className={`relative min-h-[50vh] flex justify-center items-center ${isSecondLoaded ? "block" : "hidden"}`}>
          {
            second.images &&
            <Image
              src={second.images[0].url ?? secondData.images[0].url}
              alt={second.images[0].alt ?? secondData.images[0].alt}
              width={second.images[0].width ?? secondData.images[0].width}
              height={second.images[0].height ?? secondData.images[0].height}
              className="absolute w-full h-full object-cover object-center"
              priority
              onLoadingComplete={() => setIsSecondLoaded(true)}
            />

          }
          <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center text-zinc-300">
            <p className="xs:flex py-2 xs:py-4 text-center text-xl xs:text-2xl md:text-4xl">{second.title[0]}</p>
            <p className="py-2 xs:py-4 ">{second.content[0]}</p>
          </div>
        </div>
      }

      {
        third &&
        <div className="relative min-h-[50vh] flex justify-center items-center bg-emerald-500 text-zinc-200">
          <div className="relative  w-full p-16 flex flex-col justify-center items-center ">
            <p className="py-4 text-center text-2xl md:text-4xl">{third.title[0]}</p>
            <p className="py-4 ">{third.content[0]}</p>
          </div>
        </div>
      }

      {
        fourth &&
        <div className="relative flex justify-center items-center">
          {
            fourth.images &&
            <Image
              src={fourth.images[0].url ?? fourthData.images[0].url}
              alt={fourth.images[0].alt ?? fourthData.images[0].alt}
              width={fourth.images[0].width ?? fourthData.images[0].width}
              height={fourth.images[0].height ?? fourthData.images[0].height}
              className="absolute w-full h-full object-cover object-center"
            />

          }
          <div className="relative  w-full p-16 flex flex-col justify-center items-center ">
            <div className="relative w-full flex justify-center items-center flex-row py-8">
              <p className="text-5xl text-zinc-200">{fourth.title[0]}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center">
              {
                fourthCards &&
                fourthCards.title.map((t, index) => (
                  <InfoCard
                    key={index}
                    // icon={fourthCards.images[index].url}
                    title={t}
                    content={fourthCards.content[index]}
                  />
                ))
              }
            </div>
          </div>
        </div>
      }

      {
        fifth &&
        <div className="relative w-full flex justify-center items-center">
          <div className="w-full flex justify-center items-center page-padding py-16">
            <div className="w-full grid grid-cols-1 gap-16">
              {fifth.title.map((t, index) => (
                <ShowCase
                  key={index}
                  index={index}
                  title={t}
                  content={fifth.content[index]}
                  picture={fifth.images[index]}
                />
              ))}
            </div>
          </div>
        </div>
      }
    </div >
  );
}
