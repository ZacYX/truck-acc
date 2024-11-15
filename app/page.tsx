"use client";

import Image from "next/image";
import InfoCard from "./dashboard/InfoCard";
import { firstData, secondData, thirdData, fourthData, fifthData, fourthCardsData } from "./lib/data";
import ShowCase from "./dashboard/Showcase";
import { useEffect, useState } from "react";

export default function Home() {
  const [first, setFirst] = useState(firstData);
  const [second, setSecond] = useState(secondData);
  const [third, setThird] = useState(thirdData);
  const [fourth, setFourth] = useState(fourthData);
  const [fourthCards, setFourthCards] = useState(fourthCardsData);
  const [fifth, setFifth] = useState(fifthData);

  const fetchFirst = async () => {
    const response = await fetch(`/api/web-info?name=first`);
    if (!response.ok) {
      console.error(`fetch first of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of first is empty`);
      return;
    }
    setFirst(result);
  }
  const fetchSecond = async () => {
    const response = await fetch(`/api/web-info?name=second`);
    if (!response.ok) {
      console.error(`fetch second of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of second is empty`);
      return;
    }
    setSecond(result);
  }
  const fetchThird = async () => {
    const response = await fetch(`/api/web-info?name=third`);
    if (!response.ok) {
      console.error(`fetch third of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of third is empty`);
      return;
    }
    setThird(result);
  }
  const fetchFourth = async () => {
    const response = await fetch(`/api/web-info?name=fourth`);
    if (!response.ok) {
      console.error(`fetch fourth of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of fourth is empty`);
      return;
    }
    setFourth(result);
  }
  const fetchFourthCards = async () => {
    const response = await fetch(`/api/web-info?name=fourthcards`);
    if (!response.ok) {
      console.error(`fetch fourth cards of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of fourth cards is empty`);
      return;
    }
    setFourthCards(result);
  }
  const fetchFifth = async () => {
    const response = await fetch(`/api/web-info?name=fifth`);
    if (!response.ok) {
      console.error(`fetch fifth of home failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of fifth is empty`);
      return;
    }
    setFifth(result);
  }

  useEffect(() => { fetchFirst(); }, [])
  useEffect(() => { fetchSecond(); }, [])
  useEffect(() => { fetchThird(); }, [])
  useEffect(() => { fetchFourth(); }, [])
  useEffect(() => { fetchFourthCards(); }, [])
  useEffect(() => { fetchFifth(); }, [])

  return (
    <div>
      <div className="relative h-screen flex justify-center items-center">
        <Image
          src={first.images[0].url}
          alt={first.images[0].alt}
          width={first.images[0].width}
          height={first.images[0].height}
          className="absolute w-full h-full object-cover object-center"
          priority
        />
        <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center font-bold text-2xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl ">
          <p className="text-orange-500 ">{first.title[0]}</p>
          <p className="text-amber-400 ">{first.title[1]}</p>
          <p className="text-stone-400 ">{first.title[2]}</p>
        </div>
      </div>


      <div className="relative min-h-[50vh] flex justify-center items-center">
        <Image
          src={second.images[0].url}
          alt={second.images[0].alt}
          width={second.images[0].width}
          height={second.images[0].height}
          className="absolute w-full h-full object-cover object-center"
          priority
        />
        <div className="z-10 relative  w-full p-16 flex flex-col justify-center items-center text-zinc-300">
          <p className="xs:flex py-2 xs:py-4 text-center text-xl xs:text-2xl md:text-4xl">{second.title[0]}</p>
          <p className="py-2 xs:py-4 ">{second.content[0]}</p>
        </div>
      </div>

      <div className="relative min-h-[50vh] flex justify-center items-center bg-emerald-500 text-zinc-200">
        <div className="relative  w-full p-16 flex flex-col justify-center items-center ">
          <p className="py-4 text-center text-2xl md:text-4xl">{third.title[0]}</p>
          <p className="py-4 ">{third.content[0]}</p>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <Image
          src={fourth.images[0].url}
          alt={fourth.images[0].alt}
          width={fourth.images[0].width ?? fourthData.images[0].width}
          height={fourth.images[0].height ?? fourthData.images[0].height}
          className="absolute w-full h-full object-cover object-center"
        />
        <div className="relative  w-full p-16 flex flex-col justify-center items-center ">
          <div className="relative w-full flex justify-center items-center flex-row py-8">
            <p className="text-5xl text-zinc-200">{fourth.title[0]}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center">
            {
              fourthCards.title.map((t, index) => (
                <InfoCard key={index} icon={fourthCards.images[index].url} title={t} content={fourthCards.content[index]} />
              ))
            }
          </div>
        </div>
      </div>

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

    </div>
  );
}
