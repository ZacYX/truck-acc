import { NextRequest, NextResponse } from "next/server";
import { validateProduct } from "../lib/zod-validation";
import { DEFAULT_PAGINATION_SIZE } from "../lib/data";
import {
  createProduct,
  findProductById,
  findProductBySku,
  findProductByName,
  findAllProduct,
  deleteProductById
} from "@/prisma/lib/product-interface";

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const data = await req.json();
    if (!validateProduct.safeParse(data).success) {
      console.log("Validate data of product error.");
      return NextResponse.json("Validate data of product error", { status: 400 });
    }
    const result = await createProduct(data);
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
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const take = parseInt(req.nextUrl.searchParams.get("page-size") ?? DEFAULT_PAGINATION_SIZE.toString());
    const skip = (parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;

    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await findProductById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("id must be a number", { status: 200 })
      }
    }

    const sku = req.nextUrl.searchParams.get("sku");
    if (sku) {
      const result = await findProductBySku(sku);
      return NextResponse.json(result, { status: 200 });
    }

    const name = req.nextUrl.searchParams.get("keyword");
    if (name) {
      const result = await findProductByName(skip, take, name);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await findAllProduct(skip, take);
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
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = deleteProductById(idNumber);
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
