import Image from "next/image";
import InfoCard from "./components/InfoCard";
import { night, green, cards, showCases } from "./constants/data";
import ShowCase from "./components/Showcase";

export default function Home() {

  return (
    <div>
      <div className="relative-box h-screen bg-[url('/images/cloud-tent-family-s.jpg')] bg-cover bg-center ">
        <div className="content-box self-end flex-col font-bold text-2xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl ">
          <p className="text-orange-500 ">BEST VALUE</p>
          <p className="text-amber-400 ">FOR</p>
          <p className="text-stone-400 ">MONEY</p>
        </div>
      </div>


      <div className="relative-box min-h-[50vh] bg-[url('/images/night-tent-man-s.jpg')] bg-cover bg-center ">
        <div className="content-box flex-col text-zinc-300">
          <p className="xs:flex py-2 xs:py-4 text-center text-xl xs:text-2xl md:text-4xl">{night.title}</p>
          <p className="py-2 xs:py-4 ">{night.content}</p>
        </div>
      </div>

      <div className="relative-box min-h-[50vh] bg-emerald-500 text-zinc-200">
        <div className="content-box flex-col ">
          <p className="py-4 text-center text-2xl md:text-4xl">{green.title}</p>
          <p className="py-4 ">{green.context}</p>
        </div>
      </div>

      <div className="relative-box bg-[url('/images/night-tree-tent-s.jpg')] bg-cover bg-center">
        <div className="content-box flex-col">
          <div className="relative-box flex-row py-8">
            <p className="text-5xl text-zinc-200">Why This Topper</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-content-center">
            {
              cards.map((card) =>
                <div className="">
                  <InfoCard icon={card.icon} title={card.title} content={card.content} />
                </div>
              )
            }
          </div>
        </div>
      </div>

      <div className="relative-box">
        <div className="content-box">
          <div className="w-full grid grid-cols-1 gap-16">
            {showCases.map((item) => <ShowCase key={item.index} {...item} />)}
          </div>
        </div>
      </div>

    </div>
  );
}
