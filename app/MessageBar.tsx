import { IoLogoYoutube } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";

export default function MessageBar() {
  return (
    <div className="relative-box">
      {/* Facebook and Youtube */}
      <div className="bg-zinc-900 hidden md:flex justify-center items-center h-8 w-full px-12">
        <div className="w-full flex flex-row justify-end space-x-4 ">
          <SiFacebook size={16} fill="white" />
          <IoLogoYoutube size={16} fill="white" />
        </div>
      </div>
    </div>
  );
}