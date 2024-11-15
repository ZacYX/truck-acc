import Link from "next/link";
import React from "react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  title: string;
  content: string;
}

export default function Card({icon, title, content, children}: PropsWithChildren<Props>) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start bg-zinc-100 p-8">
      {React.createElement(icon, {size: 40, color: "#000"})}
      <p className="pt-8 pb-4 text-lg font-bold">
        {title}
      </p>
      <p>
        {content}
      </p>
    </div>
  );
}

//Invoke 1
// <Card
//   icon={props => <GoBook {...props} size={60} />}
//   title={TITLE_FIRST_CARD}
//   content={CONTENT_FIRST_CARD}
//  />


//Invoke 2
// <Card icon={GoBook} title={card.title} content={card.content} />