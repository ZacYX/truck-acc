import { NavbarItem } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validateNavbarItem } from "../lib/zod-validation";
import { createNavbarItem, deleteNavbarItemById, findAllNavbarItems, getNavbarItemCount, updateNavbarItem } from "@/prisma/db-interface/navbar";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    let data: NavbarItem = await req.json();
    const validateResult = validateNavbarItem.safeParse(data);
    if (!validateResult.success) {
      console.error(`validate navbar item failed`);
      return;
    }
    const result = await createNavbarItem(data);
    return NextResponse.json(result, { status: 201 });
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
    const { id: idText, ...data } = await req.json();
    if (!idText || idText === undefined) {
      console.error(`Can not update a picture without valid id`);
      return NextResponse.json("Can not update a navbar item without valid id", { status: 400 });
    }
    const id = parseInt(idText);
    const result = validateNavbarItem.safeParse(data);
    if (!result.success) {
      console.log("Validate data of navbar item error." + JSON.stringify(result.error.issues));
      return NextResponse.json(result.error.issues, { status: 400 });
    }
    const user = await updateNavbarItem({ id, ...data });
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
  try {
    const take = Number.parseInt(req.nextUrl.searchParams.get("page-size") ?? "20");
    const skip = (Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;
    if (req.nextUrl.searchParams?.has("count")) {
      const param = req.nextUrl.searchParams.get("count") ?? undefined;
      const result = await getNavbarItemCount(param);
      console.log("getCount: " + result);
      return NextResponse.json(result, { status: 200 });
    }
    const result = await findAllNavbarItems();
    return NextResponse.json(result, { status: 200 });
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
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const result = await deleteNavbarItemById(id);
      return NextResponse.json(result, { status: 202 });
    }
    return NextResponse.json("Id needed to delete a item!", { status: 400 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

