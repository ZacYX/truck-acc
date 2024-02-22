import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className=" w-screen h-screen">
        <Image
          src="/images/tent-sky.jpg"
          alt="sky"
          width={4032}
          height={3024}
          className="object-cover object-center"
        />
      </div>
      <div className=" w-screen h-screen">
        <Image src="/images/tent-montain.jpg" alt="mountain" width={5082} height={3388} className="object-cover object-center"/>
      </div>
    </div>
  );
}
