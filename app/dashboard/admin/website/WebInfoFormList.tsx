"use client";

import { WebInfo, WebPicture } from "@prisma/client";
import { useEffect, useState } from "react";
import WebInfoForm from "./WebInfoForm";
import { CiSquarePlus } from "react-icons/ci";

export type WebInfoWithImages = WebInfo & { images: WebPicture[] };
const blankWebInfo = {
  name: "",
  category: "",
  title: [],
  content: [],
}

export default function WebInfoFormList() {
  const [webInfos, setWebInfos] = useState<Array<WebInfoWithImages>>();
  const [newWebInfoForm, setNewWebInfoForm] = useState(false);

  const fetchWebInfos = async () => {
    const response = await fetch(`/api/web-info`);
    if (!response.ok) {
      console.log(`Fetch webinfo from database failed`);
      return;
    }
    const result = await response.json();
    setWebInfos(result);
  }
  useEffect(() => {
    fetchWebInfos();
  }, [])

  return (
    <div>
      {
        webInfos && webInfos.map((item, index) => (
          <WebInfoForm
            key={index}
            webInfo={item}
            fetchWebInfos={fetchWebInfos}
            setNewWebInfoForm={setNewWebInfoForm}
          />
        ))
      }
      {
        newWebInfoForm &&
        <WebInfoForm
          webInfo={blankWebInfo}
          fetchWebInfos={fetchWebInfos}
          setNewWebInfoForm={setNewWebInfoForm} />
      }
      <div className="flex flex-row justify-start p-2 opacity-50 ">
        <CiSquarePlus
          size={40}
          className="hover:cursor-pointer"
          onClick={() => {
            setNewWebInfoForm(true)
          }}
        />
      </div>
    </div>
  )
}