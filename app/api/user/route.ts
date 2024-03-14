import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User, Email, Address, Post } from "@prisma/client";
import { createAddress, createEmail, createPost, createUser } from "@/prisma/dbinterface";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("Content-Type");
    console.log("content type: " + contentType);

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
    // console.log("Request body: " + JSON.stringify(data));
    // console.log("Request body user: " + JSON.stringify(user));
    // console.log("Request body email:: " + JSON.stringify(emails));
    // console.log("Request body address: " + JSON.stringify(addresses));
    // console.log("Request body posts: " + JSON.stringify(posts));

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
    if (req.nextUrl.searchParams) { }
    const user = await prisma.user.findMany();
    return NextResponse.json(user, { status: 201 })
  } catch (error) {

  }
}