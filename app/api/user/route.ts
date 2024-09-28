import { NextRequest, NextResponse } from "next/server";
import { User, Address, Post, Prisma } from "@prisma/client";
import { validateUser } from "../lib/zod-validation";
import { createUser, findUserByEmail, findUserById, updateUser } from "@/prisma/db-interface/user";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    let data = await req.json();
    const result = validateUser.safeParse(data);
    if (!result.success) {
      console.log("Validate data of user error." + JSON.stringify(result.error.issues));
      return NextResponse.json(result.error.issues, { status: 400 });
    }
    const extUser = await createUser(data);
    return NextResponse.json({ extUser }, { status: 201 });
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
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const take = Number.parseInt(req.nextUrl.searchParams.get("page-size") ?? "10");
    const skip = (Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;
    if (req.nextUrl.searchParams?.has("id")) {
      const id = req.nextUrl.searchParams.get("id") ?? "0";
      const result = await findUserById(id);
      return NextResponse.json(result, { status: 201 });
    }
    if (req.nextUrl.searchParams?.has("email")) {
      const email = req.nextUrl.searchParams.get("email") ?? "";
      const result = await findUserByEmail(email);
      return NextResponse.json(result, { status: 201 });
    }
    // if (req.nextUrl.searchParams?.has("count")) {
    //   const param = req.nextUrl.searchParams.get("count") ?? undefined;
    //   const result = await getUserCount(param);
    //   console.log("getCount: " + result);
    //   return NextResponse.json(result, { status: 200 });
    // }
    // if (req.nextUrl.searchParams?.has("keyword")) {
    //   const name = req.nextUrl.searchParams.get("keyword") ?? "";
    //   const result = await findUserByName(name, skip, take);
    //   return NextResponse.json(result, { status: 200 });
    // }
    // const result = await findAllUser(skip, take);
    // return NextResponse.json(result, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    let data = await req.json();
    // console.log(`PUT: ${JSON.stringify(data)}`)
    const result = validateUser.safeParse(data);
    if (!result.success) {
      console.log("Validate data of user error." + JSON.stringify(result.error.format()));
      return NextResponse.json(result.error.format(), { status: 400 });
    }
    const extUser = await updateUser(data);
    return NextResponse.json({ extUser }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}


// export async function DELETE(req: NextRequest) {
//   try {
//     if (req.headers.get("Content-Type") !== "application/json") {
//       return NextResponse.json("Wrong Content-Type", { status: 400 });
//     }
//     const id = req.nextUrl.searchParams.get("id");
//     if (id) {
//       const result = await deleteUserById(Number.parseInt(id));
//       return NextResponse.json(result, { status: 202 });
//     }
//     return NextResponse.json("Id needed to delete a user!", { status: 400 })
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
//     } else {
//       return NextResponse.json(`Server error.`, { status: 500 })
//     }
//   }
// }