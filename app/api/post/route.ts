import {
  createPost,
  deletePostById,
  findAllPost,
  findPostById,
  findPostByKeyword,
  findPostByUserId
} from "@/prisma/lib/post-interface";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_PAGINATION_SIZE } from "../lib/data";
import { validatePost } from "../lib/zod-validation";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!validatePost.safeParse(data).success) {
      console.log("Validate data of post error");
      return NextResponse.json("Validate data of post error", { status: 400 });
    }
    const result = await createPost(data);
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 })
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const take = parseInt(req.nextUrl.searchParams.get("page-size") ?? DEFAULT_PAGINATION_SIZE.toString());
    const skip = (parseInt(req.nextUrl.searchParams.get("page") ?? "1") - 1) * take;

    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const idNumber = parseInt(id);
      if (idNumber) {
        const result = await findPostById(idNumber);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("Id must be number", { status: 200 });
      }
    }

    const userId = req.nextUrl.searchParams.get("userid");
    if (userId) {
      const userIdNumber = parseInt(userId);
      if (userIdNumber) {
        const result = await findPostByUserId(userIdNumber, skip, take);
        return NextResponse.json(result, { status: 200 });
      } else {
        return NextResponse.json("User Id must be number", { status: 200 });
      }
    }

    const keyword = req.nextUrl.searchParams.get("keyword");
    if (keyword) {
      const result = await findPostByKeyword(skip, take, keyword);
      return NextResponse.json(result, { status: 200 });
    }

    const result = await findAllPost(skip, take);
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
      if (idNumber) {
        const result = deletePostById(idNumber);
        return NextResponse.json(result, { status: 200 })
      } else {
        return NextResponse.json("Id must be number", { status: 400 });
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



