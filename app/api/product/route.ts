import { NextRequest, NextResponse } from "next/server";
import { validateProduct } from "../lib/zod-validation";
import { DEFAULT_PAGINATION_SIZE } from "../lib/data";
import {
  createProduct,
  findProductById,
  findProductBySku,
  findProductByName,
  findProductByCategory,
  findAllProduct,
  deleteProductById,
  updateProduct,
  getProductCount,
  connectCategories,
  disconnectCategories
} from "@/prisma/db-interface/product";
import { OmitProduct } from "@/prisma/db-interface/product";
import { Category, Product } from "@prisma/client";

type ProductWithCategory = Product & { categories: Category[] };

export async function POST(req: NextRequest) {
  try {
    if (req.headers.get("Content-Type") !== "application/json") {
      return NextResponse.json("Wrong Content-Type", { status: 400 });
    }
    const data = await req.json();
    const product: OmitProduct = {
      ...data,
      inventory: data.inventory ? parseInt(data.inventory) : null,
      price: data.price ? parseInt(data.price) : null,
      salePrice: data.salePrice ? parseInt(data.salePrice) : null,
    }
    const validationResult = validateProduct.safeParse(product);
    if (!validationResult.success) {
      console.log(`Validate data of product error: ${validationResult.error}`);
      return NextResponse.json("Validate data of product error", { status: 400 });
    }
    const result = await createProduct(product);
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
    const { id: productId, createAt, updateAt, categories, ...product } = data;
    if (!productId) {
      console.error(`Id needed to update product`);
      return;
    }
    if (product.inventory) {
      product.inventory = parseInt(product.inventory);
    }
    if (product.price) {
      product.price = parseInt(product.price);
    }
    if (product.salePrice) {
      product.salePrice = parseInt(product.salePrice);
    }
    const productResult = await updateProduct(parseInt(productId), product);
    if (!productResult) {
      return NextResponse.json(`update product failed`, { status: 500 });
    }
    if (categories) {
      //get existing categories connected
      const { categories: connectedCategories } = productResult;
      //categories: {id: number}[] to connect 
      const connectedCategoryIds: Number[] = connectedCategories.map(((cat: Category) => cat.id));
      const categoriesToConnect: Array<{ id: number }> = [];
      categories.forEach((cat: { id: string }) => {
        const catId = parseInt(cat.id);
        if (Number.isInteger(catId) && !connectedCategoryIds.includes(catId)) {
          categoriesToConnect.push({ id: catId });
        }
      });
      const connectResult = await connectCategories(parseInt(productId), categoriesToConnect);
      //categories: {id: number}[] to disconnect 
      const inputCategoryIds: Number[] = categories.map((cat: { id: string }) => parseInt(cat.id));
      const categoriesToDisconnect: Array<{ id: number }> = [];
      connectedCategories.forEach((cat) => {
        if (!inputCategoryIds.includes(cat.id)) {
          categoriesToDisconnect.push({ id: cat.id });
        }
      });
      const disconnectResult = await disconnectCategories(parseInt(productId), categoriesToDisconnect);
      return NextResponse.json({ disconnectResult }, { status: 200 });
    }
    return NextResponse.json(productResult, { status: 200 })
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
    const take = parseInt(req.nextUrl.searchParams.get("page-size") ?? DEFAULT_PAGINATION_SIZE.toString());
    const skip = (parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;

    if (req.nextUrl.searchParams.has("count")) {
      const result = await getProductCount();
      return NextResponse.json(result, { status: 200 });
    }

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

    const category = req.nextUrl.searchParams.get("category");
    if (category) {
      const result = await findProductByCategory(skip, take, category);
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
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (Number.isInteger(idNumber)) {
        const result = await deleteProductById(idNumber);
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
