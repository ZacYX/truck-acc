import { NextRequest, NextResponse } from "next/server";
import { validateCategory } from "../lib/zod-validation";
import {
  createCategory,
  deleteCategoryById,
  findAllCategory,
  getCategoryCount,
  updateCategory
} from "@/prisma/db-interface/category";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const data = await req.json();
    if (!validateCategory.safeParse(data).success) {
      console.log("Validate data of product error.");
      return NextResponse.json("Validate data of product error", { status: 400 });
    }
    const result = await createCategory(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
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
      const result = await getCategoryCount(param);
      console.log("getCount: " + result);
      return NextResponse.json(result, { status: 200 });
    }
    const result = await findAllCategory(skip, take);
    return NextResponse.json(result, { status: 200 });

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
    console.log(`PUT: ${JSON.stringify(data)}`)
    const result = validateCategory.safeParse(data);
    if (!result.success) {
      console.log("Validate data error." + JSON.stringify(result.error.format()));
      return NextResponse.json(result.error.format(), { status: 400 });
    }
    const user = await updateCategory({ ...data, id: parseInt(data.id) });
    return NextResponse.json(user, { status: 201 });
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
      const result = await deleteCategoryById(id);
      return NextResponse.json(result, { status: 202 });
    }
    return NextResponse.json("Id needed to delete a user!", { status: 400 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}