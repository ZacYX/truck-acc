"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { IoLogoYoutube } from "react-icons/io5";
import { SiFacebook } from "react-icons/si";

export default function Footer() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const emailAddress = formData.get("emailAddress");
    const data = { "emailAddress": emailAddress, "isVerified": false };
    const response = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    formRef.current?.reset();
  }

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
            <form action={handleSubmit} ref={formRef}>
              <EmailInput />
            </form>
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

function EmailInput() {
  const { pending, data } = useFormStatus();
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (data?.get("emailAddress")) {
      setEmail(data?.get("emailAddress")?.toString());
    }
  }, [data]);

  return (
    <div>
      <label htmlFor="emailAddress" className="mr-4" > Email </label>
      <input
        disabled={pending}
        type="email"
        name="emailAddress"
        id="emailAddress"
        className="text-black px-2"
        required
      />
      <button type="submit" className="bg-orange-500 ml-4 px-2">
        {`${pending ? "Subscribe..." : "Subscribe"}`}
      </button>
      {email &&
        <p>{email} submitted</p>
      }
    </div>
  )
}