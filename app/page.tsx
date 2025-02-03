"use client";

import Image from "next/image";
import InfoCard from "./dashboard/InfoCard";
import { firstData, secondData, thirdData, fourthData, fifthData, fourthCardsData } from "./lib/data";
import ShowCase from "./dashboard/Showcase";
import { useEffect, useState } from "react";
import type { SectionData, SectionImage } from "./lib/data";
import { fetchData } from "./fetchHomePageData";


export default function Home() {
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isSecondLoaded, setIsSecondLoaded] = useState(false);

  const [first, setFirst] = useState<SectionData>();
  const [second, setSecond] = useState<SectionData>();
  const [third, setThird] = useState<SectionData>();
  const [fourth, setFourth] = useState<SectionData>();
  const [fourthCards, setFourthCards] = useState<SectionData>();
  const [fifth, setFifth] = useState<SectionData>();

  useEffect(() => { fetchData(`first`, firstData, setFirst); }, [])
  useEffect(() => { fetchData(`second`, secondData, setSecond); }, [])
  useEffect(() => { fetchData(`third`, thirdData, setThird); }, [])
  useEffect(() => { fetchData(`fourth`, fourthData, setFourth); }, [])
  useEffect(() => { fetchData(`fourthCards`, fourthCardsData, setFourthCards); }, [])
  useEffect(() => { fetchData(`fifth`, fifthData, setFifth); }, [])

  return (
    <div>
      {
        < div className={`relative h-screen flex justify-center items-center `}>
          {
            first && first.images &&
            <Image
              src={first.images[0].url}
              alt={first.images[0].alt}
              width={first.images[0].width}
              height={first.images[0].height}
              className="absolute w-full h-full object-cover object-center"
              priority
              onLoadingComplete={() => setIsFirstLoaded(true)}
            />
          }
          <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center font-bold text-2xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl ">
            <p className="text-orange-500 ">{first?.title[0]}</p>
            <p className="text-amber-400 ">{first?.title[1]}</p>
            <p className="text-stone-400 ">{first?.title[2]}</p>
          </div>
        </div>
      }

      {
        <div className={`relative h-[50vh] flex justify-center items-center `}>
          {
            second && second.images &&
            <Image
              src={second.images[0].url}
              alt={second.images[0].alt}
              width={second.images[0].width}
              height={second.images[0].height}
              className="absolute w-full h-full object-cover object-center"
              priority
              onLoadingComplete={() => setIsSecondLoaded(true)}
            />

          }
          <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center text-zinc-300">
            <p className="xs:flex py-2 xs:py-4 text-center text-xl xs:text-2xl md:text-4xl">{second?.title[0]}</p>
            <p className="py-2 xs:py-4 ">{second?.content[0]}</p>
          </div>
        </div>
      }

      {
        third &&
        <div className="relative  h-[50vh] flex justify-center items-center bg-emerald-500 text-zinc-200">
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
              src={fourth.images[0].url}
              alt={fourth.images[0].alt}
              width={fourth.images[0].width}
              height={fourth.images[0].height}
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
