"use client";

// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import Header from "./Header";
import { Card, CardFooter, CardHeader, CardBody } from "@nextui-org/card";
import Social from "./Social";
import BackButton from "./BackButton";
import { createContext, useState } from "react";


type CardWrapperProps = {
  children: React.ReactNode,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean,
}

export type Message = {
  success?: string,
  error?: string,
}

type MessageContextType = {
  message?: Message,
  setMessage?: (message: Message) => void,
}

export const MessageContext = createContext<MessageContextType>({});

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps
) {
  const [message, setMessage] = useState<Message>();

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <Card className="w-[400px] shadow-md py-4">
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardBody>
          {children}
        </CardBody>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <BackButton
          href={backButtonHref}
          label={backButtonLabel} />
      </Card>
    </MessageContext.Provider>
  )

}