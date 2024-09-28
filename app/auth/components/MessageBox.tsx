import { useContext } from "react";
import { MessageContext } from "./CardWrapper";

export default function MessageBox() {

  const { message } = useContext(MessageContext);

  return (
    <div className="pb-4">
      {message?.success &&
        <p className="text-green-600">Success: {message.success}</p>}
      {message?.error &&
        <p className="text-red-500">Error: {message.error}</p>
      }
    </div>
  )
}