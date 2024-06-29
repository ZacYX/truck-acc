import { NextRequest, NextResponse } from "next/server";
import { User, Email, Address, Post, Prisma } from "@prisma/client";
import { createUser, findUserByName, findUserById, getUserCount, deleteUserById } from "@/prisma/lib/user-interface";
import { createAddress } from "@/prisma/lib/address-interface";
import { createPost } from "@/prisma/lib/post-interface";
import { createEmail } from "@/prisma/lib/email-interface";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("Content-Type");

    let data;
    if (contentType === "application/x-www-form-urlencoded") {
      //Request body of DataForm
      data = Object.fromEntries(await req.formData());
    } else if (contentType === "application/json") {
      //Request body of Json
      data = await req.json();
    } else {
      console.error("Wrong Content-Type");
      return NextResponse.json(null, { status: 400 });
    }
    const { emails, addresses, posts, ...user } = data;

    const userResult = await createUser(user as unknown as User);

    let emailResult = null;
    if (emails) {
      emailResult = await Promise.all(emails.map(async (item: Email) => {
        item.userId = userResult.id;
        return await createEmail(item)
      }));
      console.log("emailResult: " + JSON.stringify(emailResult));
    }

    let addressResult = null;
    if (addresses) {
      addressResult = await Promise.all(addresses.map(async (item: Address) => {
        item.userId = userResult.id;
        return await createAddress(item);
      }));
      console.log("addressResult: " + JSON.stringify(addressResult));
    }

    let postResult = null;
    if (posts) {
      postResult = await Promise.all(posts.map(async (item: Post) => {
        item.authorId = userResult.id;
        return await createPost(item);
      }));
      console.log("postResult: " + JSON.stringify(postResult));
    }

    return NextResponse.json({
      ...userResult,
      emails: emailResult,
      addresses: addressResult,
      posts: postResult,
    }, { status: 201 });



  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const take = Number.parseInt(req.nextUrl.searchParams.get("page-size") ?? "10");
    const skip = (Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;
    if (req.nextUrl.searchParams?.has("id")) {
      const id = req.nextUrl.searchParams.get("id") ?? "0";
      const result = await findUserById(Number.parseInt(id));
      return NextResponse.json(result, { status: 201 });
    }
    if (req.nextUrl.searchParams?.has("count")) {
      const param = req.nextUrl.searchParams.get("count") ?? undefined;
      const result = await getUserCount(param);
      console.log("getCount: " + result);
      return NextResponse.json(result, { status: 200 });
    }
    if (req.nextUrl.searchParams?.has("keyword")) {
      const name = req.nextUrl.searchParams.get("keyword") ?? "";
      const result = await findUserByName(name, skip, take);
      return NextResponse.json(result, { status: 200 });
    }
    const result = await findUserByName(undefined, skip, take);
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error("Server error!")
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const result = await deleteUserById(Number.parseInt(id));
      return NextResponse.json(result, { status: 202 });
    }
    return NextResponse.json("Id needed to delete a user!", { status: 400 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(`prisma error code: ${e.code}`, { status: 400 })
    }
    return NextResponse.json(null, { status: 500 })
  }
}