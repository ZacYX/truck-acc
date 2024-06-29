import { createEmail, deletEmailById, findAllEmail, findEmailByEmailAddress, findEmailById, findEmailByUserId } from "@/prisma/lib/email-interface";
import { Email } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_PAGINATION_SIZE } from "../lib/data";

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
    console.log("nexturl.searchParams: " + req.nextUrl.searchParams?.toString());
    let take = Number.parseInt(req.nextUrl.searchParams.get("page-size") ?? DEFAULT_PAGINATION_SIZE.toString());
    let skip = (Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;

    const id = req.nextUrl.searchParams.get("id");
    console.log("getEmailById: " + id);
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await findEmailById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("Id must be a number", { status: 400 });
      }
    }

    const userId = req.nextUrl.searchParams.get("userid");
    if (userId) {
      const userIdNumber = parseInt(userId);
      if (userIdNumber) {
        const result = await findEmailByUserId(userIdNumber, skip, take);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("userId must be a number", { status: 400 });
      }
    }

    const emailAddress = req.nextUrl.searchParams.get("keyword");
    if (emailAddress) {
      const result = await findEmailByEmailAddress(skip, take, emailAddress);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await findAllEmail(skip, take);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.log("catch error: " + error);
    return NextResponse.json("Server error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("delete email");
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await deletEmailById(idNumber);
        return NextResponse.json(result, { status: 200 })
      } else {
        return NextResponse.json("Id must be a number", { status: 400 });
      }
    }
    return NextResponse.json("Id must be specified to delete", { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 })
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}