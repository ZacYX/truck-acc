import { Spinner } from "@nextui-org/spinner";
import MessageBox from "./MessageBox";
import { useContext, useEffect } from "react";
import { MessageContext } from "./CardWrapper";
import { verifyEmail } from "./actions/verify-email";
import { useSearchParams } from "next/navigation";

export default function VerifyForm() {
  const { message, setMessage } = useContext(MessageContext);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async () => {
    if (!token) {
      console.log("Missing token");
      if (setMessage) {
        setMessage({ error: "Missing token" });
      }
      return;
    }
    const retMessage = await verifyEmail(token);
    console.log("retMessage: ", retMessage);
    if (setMessage && !message) {
      setMessage(retMessage);
    }
  }

  useEffect(() => {
    onSubmit();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center ">
      {message
        ? <MessageBox />
        : <Spinner />
      }


    </div>
  )

}