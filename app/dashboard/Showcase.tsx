import Image from "next/image"
import { WebPicture } from "@prisma/client"

export default function ShowCase({ index, title, content, picture }: {
  index: number,
  title: string,
  content: string,
  picture: Partial<WebPicture>
}) {
  return (
    <div className={`w-full flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:justify-between`}>
      <div className="w-full md:w-[45%] flex flex-col items-center ">
        <p className="text-3xl p-4">{title}</p>
        <p>{content}</p>
      </div>
      <div className={`w-full md:w-[45%] aspect-square`}>
        <Image
          src={picture.url ?? ""}
          alt={picture.alt ?? ""}
          width={picture.width ?? 400}
          height={picture.height ?? 400}
          className="w-full h-full object-center object-cover" />
      </div>
    </div>
  )
}