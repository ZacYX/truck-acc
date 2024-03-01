
export default function ShowCase({index, title, content, pic}: {index: number, title: string, content: string, pic: string}) {
  return (
    <div className={`w-full flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:justify-between`}>
      <div className="w-full md:w-[45%] flex flex-col items-center ">
        <p className="text-3xl p-4">{ title }</p>
        <p>{ content }</p>
      </div>
      <div className={`w-full md:w-[45%] aspect-square`}>
        <img src={pic} alt="pic" className="w-full h-full object-center object-cover" />
      </div>
    </div>
  )
}