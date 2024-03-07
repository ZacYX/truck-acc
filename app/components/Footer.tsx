import { IoLogoYoutube } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <div className="relative-box bg-zinc-800">
      <div className="content-box flex-col ">
        <div className="w-full flex flex-wrap justify-between leading-8 text-zinc-100">
          <div>
            <p className="text-2xl py-8 text-zinc-400">Bussiness hours</p>
            <div className="text-orange-500">
              <p>Sunday and Monday: Closed</p>
              <p>Tuesday and Wednesday: 10 a.m. to 4 p.m.</p>
              <p>Thursday to Friday: 10 a.m. to 6 p.m.</p>
              <p> Saturday: 10 a.m. to 6 p.m.</p>
            </div>
          </div>
          <div>
            <p className="text-2xl py-8 text-zinc-400">Contact</p>
            <div>
              <p>Phone: 1 888 898 4444</p>
              <p>Email: Zac.xu@outlook.com</p>
            </div>
          </div>
          <div>
            <p className="text-2xl py-8 text-zinc-400">Subcribe to the newsletter</p>
            <div>
              <p>Enter your email to subscribe</p>
              <input placeholder="Email"></input>
              <button type="submit" className="bg-orange-500 ml-4 px-2">Subscribe</button>
            </div>
          </div>

        </div>
        <div className="flex flex-row space-x-4 py-8">
          <SiFacebook size={24} fill="white" />
          <IoLogoYoutube size={24} fill="white" />
        </div>
      </div>
    </div>
  );
}