"use client";

import { Role, User } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormData = async (formData: FormData) => {
    const user = {
      name: formData.get("name"),
      phone: formData.has("phone") ? formData.get("phone") : undefined,
      // roles: ["Poster"],
      email: {
        emailAddress: formData.has("email") ? formData.get("email") : undefined,
        isVerified: false,
      },
      posts: [{
        title: formData.has("title") ? formData.get("title") : undefined,
        content: formData.has("content") ? formData.get("content") : undefined,
      }]
    };

    await fetch("/api/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
    })

    formRef.current?.reset();
  }

  return (
    <div>
      <div className="relative-box min-h-[50vh] bg-[url('/images/tree-rooftop-suv-s.jpg')] bg-center bg-cover">
        <div className="content-box ">
          <p className="text-zinc-200 text-7xl font-bold">We are waiting for you!</p>
        </div>
      </div>
      <div className="relative-box flex-col " >
        <form
          className="content-box "
          action={handleFormData}
          ref={formRef}
        >
          <PostForm />
        </form>
      </div>
    </div >
  );
}

function PostForm() {
  const { pending, data } = useFormStatus();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (data?.has("email")) {
      setEmail(data?.get("email") as string);
      console.log("setEmail: " + email);
    }

  }, [data])

  const handleEmailBlur = async () => {
    await fetch("/api/")

  }

  return (
    <div
      className="w-full flex flex-col gap-4"
    >
      <div className="w-full ">
        <p className="text-3xl">Need any help? We are here to help ...</p>
      </div>
      {/* User infomation */}
      <div className="w-full flex flex-wrap justify-between">
        <label className="input input-bordered flex items-center ">
          Name
          <input name="name" type="text" className="grow px-2" required />
        </label>
        <label className="input input-bordered flex items-center ">
          Phone
          <input name="phone" type="tel" className="grow px-2" />
        </label>
        <label className="input input-bordered flex items-center ">
          Email
          <input name="email" type="email" className="grow px-2" required
            onBlur={handleEmailBlur}
          />
        </label>
      </div>
      {/* Message */}
      <div className="w-full flex flex-col gap-4">
        <label className="w-full input input-bordered flex items-center ">
          Message
          <input name="title" type="text" className="grow px-2" />
        </label>
        <textarea
          name="content"
          placeholder="More details..."
          className="h-40 w-full rounded-md py-2 px-4" />
        <button type="submit" className="btn" >
          {pending ? "Sending" : "Send"}
        </button>
      </div>

      {email &&
        <p>We will get back to you at {email} soon!</p>
      }

    </div>

  )
}
