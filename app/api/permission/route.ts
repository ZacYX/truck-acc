import { NextRequest, NextResponse } from "next/server";
import { validatePermission } from "../lib/zod-validation";
import { createPermission, deletePermissionById, findAllPermission, findPermissionById, findPermissionByName, updatePermission } from "@/prisma/lib/permission-interface";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const data = await req.json();
    if (!validatePermission.safeParse(data).success) {
      console.log("Validate data of permission error.");
      return NextResponse.json("Validate data of permission error", { status: 400 });
    }
    const result = await createPermission(data);
    return NextResponse.json(result, { status: 201 })
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
    if (!validatePermission.safeParse(data).success) {
      console.log("Validate data of permission error.");
      return NextResponse.json("Validate data of permission error", { status: 400 });
    }
    const result = await updatePermission(data);
    return NextResponse.json(result, { status: 201 })
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
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const take = Number.parseInt(req.nextUrl.searchParams.get("page-size") ?? "10");
    const skip = (Number.parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take

    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await findPermissionById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("id must be a number", { status: 200 })
      }
    }

    const name = req.nextUrl.searchParams.get("keyword");
    if (name) {
      const result = await findPermissionByName(skip, take, name);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await findAllPermission(skip, take);
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
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const result = await deletePermissionById(Number.parseInt(id));
      return NextResponse.json(result, { status: 202 });
    }
    return NextResponse.json("Id needed to delete!", { status: 400 })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(`prisma error code: ${e.code}`, { status: 400 })
    }
    return NextResponse.json(null, { status: 500 })
  }
}