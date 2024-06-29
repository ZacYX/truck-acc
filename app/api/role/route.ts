import { NextRequest, NextResponse } from "next/server";
import { validateRole } from "../lib/zod-validation";
import { createRole } from "@/prisma/lib/role-interface";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!validateRole.safeParse(data).success) {
      console.log("Validate data of product error.");
      return NextResponse.json("Validate data of product error", { status: 400 });
    }
    const result = await createRole(data);

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }

  }
}