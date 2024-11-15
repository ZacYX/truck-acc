import { NextRequest, NextResponse } from "next/server";
import { validateWebInfo } from "../lib/zod-validation";
import { WebInfo } from "@prisma/client";
import { createWebInfo, deleteWebInfoById, findAllWebInfo, findWebInfoByCategory, findWebInfoById, findWebInfoByName, updateWebInfo } from "@/prisma/db-interface/web-info";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const data = await req.json();
    const validationResult = validateWebInfo.safeParse(data);
    if (!validationResult.success) {
      console.log(`Validate data of webInfo error: ${validationResult.error}`);
      return NextResponse.json("Validate data of product error", { status: 400 });
    }
    const result = await createWebInfo(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
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
    const data = await req.json();
    //omit createAt and updateAt from product to update 
    const { images, ...webInfo } = data;
    if (!webInfo || !webInfo.id) {
      console.error(`No data to update`);
      return NextResponse.json(`No data or id`, { status: 400 });
    }
    const validateResult = validateWebInfo.safeParse(webInfo);
    if (!validateResult.success) {
      console.error(`Parse data failed`);
      return NextResponse.json(`Parse data failed`, { status: 400 });
    }

    const updateResult = await updateWebInfo(webInfo);
    if (!updateResult) {
      return NextResponse.json(`update product failed`, { status: 500 });
    }
    return NextResponse.json(updateResult, { status: 200 })
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
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await findWebInfoById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("id must be a number", { status: 200 })
      }
    }

    const name = req.nextUrl.searchParams.get("name");
    if (name) {
      const result = await findWebInfoByName(name);
      return NextResponse.json(result, { status: 200 });
    }

    const category = req.nextUrl.searchParams.get("category");
    if (category) {
      const result = await findWebInfoByCategory(category);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await findAllWebInfo();
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 })
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }

}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (Number.isInteger(idNumber)) {
        const result = await deleteWebInfoById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("id must  be number.", { status: 400 })
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
