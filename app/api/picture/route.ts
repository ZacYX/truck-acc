import { NextRequest, NextResponse } from "next/server";
import { validatePicture } from "../lib/zod-validation";
import { createPicture, createPictures, deletePictureById, deletePictureByUrl, updatePicture } from "@/prisma/db-interface/picture";
import type { PictureWithoutId } from "@/prisma/db-interface/picture";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    let data: PictureWithoutId = await req.json();
    if (!Array.isArray(data)) {
      const result = await createPicture(data);
      return NextResponse.json(result, { status: 201 });
    }
    if (Array.isArray(data)) {
      const result = await createPictures(data);
      return NextResponse.json(result, { status: 201 });
    }
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
    //create one picture
    if (!data.id || data.id === undefined) {
      console.error(`Can not update a picture without valid id`);
      return NextResponse.json("Can not update a picture without valid id", { status: 400 });
    }
    const picture = data;
    picture.id = parseInt(data.id);
    if (data.height) {
      picture.height = parseInt(data.height)
    }
    if (data.width) {
      picture.width = parseInt(data.width)
    }
    if (data.productId) {
      picture.productId = parseInt(data.productId)
    }
    const result = validatePicture.safeParse(picture);
    if (!result.success) {
      console.log("Validate data of picture error." + JSON.stringify(result.error.issues));
      return NextResponse.json(result.error.issues, { status: 400 });
    }
    const user = await updatePicture(picture);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }

}

export async function GET(req: NextRequest) {

}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const url = req.nextUrl.searchParams.get("url");
    if (id) {
      const result = await deletePictureById(id);
      return NextResponse.json(result, { status: 202 });
    }
    if (url) {
      const result = await deletePictureByUrl(url);
      return NextResponse.json(result, { status: 202 });
    }
    return NextResponse.json("Id needed to delete a picture!", { status: 400 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

