import { IoLogoYoutube } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";

export default function MessageBar() {
  return (
    <div className="relative flex flex-col justify-center items-center z-10">
      {/* Facebook and Youtube */}
      <div className="bg-zinc-900 hidden lg:flex justify-center items-center h-8 w-full ">
        <div className="lg:w-[1024px] xl:w-[1280px] flex flex-row justify-end space-x-4 ">
          <SiFacebook size={16} fill="white" />
          <IoLogoYoutube size={16} fill="white" />
        </div>
      </div>
    </div>
  );
}