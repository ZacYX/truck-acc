"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function ContactPage() {
  return (
    <div>
      <div className="relative-box min-h-[50vh] bg-[url('/images/tree-rooftop-suv-s.jpg')] bg-center bg-cover">
        <div className="content-box ">
          <p className="text-zinc-200 text-7xl font-bold">We are waiting for you!</p>
        </div>
      </div>
      <div className="relative-box flex-col">
        <div className="content-box flex-col">
          <div className="w-full py-3">
            <p className="text-3xl">Need any help? We are here to help ...</p>
          </div>
          {/* User infomation */}
          <div className="w-full flex flex-wrap justify-between py-3 ">
            <label className="input input-bordered flex items-center gap-2 my-2">
              Name
              <input type="text" className="grow" />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              Phone
              <input type="text" className="grow" />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-2">
              Email
              <input type="text" className="grow" />
            </label>
          </div>
          {/* Message */}
          <div className="w-full flex-col py-3 space-y-3">
            <label className="w-full input input-bordered flex items-center gap-2">
              Message
              <input type="text" className="grow" />
            </label>
            <SimpleMDE
              className="w-full"
              placeholder="More details ..."
            />
            <button type="submit" className="btn">Send</button>
          </div>
        </div>
      </div>
    </div >
  );
}
