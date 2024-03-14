import { createEmail } from "@/prisma/dbinterface";
import { Email } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("Content-Type");
    console.log("content type: " + contentType);

    if (contentType === "application/json") {
      //Request body of Json
      const data = await req.json();
      if (data.emailAddress) {
        const result = await createEmail(data);
        return NextResponse.json(result, { status: 200 });
      }
      return NextResponse.json(null, { status: 400 });
    }

    if (contentType === "x-www-form-urlencoded") {
      //Request body of DataForm
      const formData = await req.formData();
      if (formData.get("emailAddress")) {
        const data = Object.fromEntries(formData);
        const result = await createEmail(data as unknown as Email);
        return NextResponse.json(result, { status: 200 });
      }
      console.error("Email address needed!");
      return NextResponse.json(null, { status: 400 });
    }
    console.error("Wrong Content-Type");
    return NextResponse.json(null, { status: 400 });

  } catch (error) {
    console.log("catch error: " + error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    console.log("Content-Type: " + req.headers.get("conten-type"));
    console.log("nexturl.pathname: " + req.nextUrl.pathname);
    console.log("nexturl.searchParams: " + req.nextUrl.searchParams.get("emailAddress"));
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.log("catch error: " + error);
    return NextResponse.json(null, { status: 500 });
  }
}