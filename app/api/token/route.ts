import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "../lib/zod-validation";
import { createVerificationToken, deleteVerificationTokenByToken, findVerificationTokenByToken } from "@/prisma/db-interface/token";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json("Wrong content-type", { status: 400 });
    }
    const data = await req.json();
    const result = validateToken.safeParse(data);
    if (!result.success) {
      console.log("Validate token error." + JSON.stringify(result.error.issues));
      return NextResponse.json(result.error.issues, { status: 400 });
    }
    const token = await createVerificationToken(result.data.email);
    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json("Wrong content-type", { status: 400 });
    }
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      console.log("There is no token in url");
      return NextResponse.json("There is no token in url", { status: 400 })
    }
    const existingToken = await findVerificationTokenByToken(token);
    return NextResponse.json(existingToken, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (req.headers.get("content-type") !== "application/json") {
      return NextResponse.json("Wrong content-type", { status: 400 });
    }
    const token = req.nextUrl.searchParams.get("token");
    if (!token) {
      console.log("There is no token in url");
      return NextResponse.json("There is no token in url", { status: 400 });
    }
    const result = await deleteVerificationTokenByToken(token);
    return NextResponse.json(result, { status: 202 })

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}
