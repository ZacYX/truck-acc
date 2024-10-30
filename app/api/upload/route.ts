import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

const UPLOAD_DIR = "/uploads";
const FS_UPLOAD_DIR = path.join(process.cwd(), "public", UPLOAD_DIR);

const changeFileName = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex === -1) {
    // If there's no extension, simply append the date
    return `${fileName}_${Date.now()}`;
  }
  // Separate the name and extension
  const name = fileName.slice(0, dotIndex);
  const extension = fileName.slice(dotIndex);
  // Return the new file name with the date and time
  return `${name}_${Date.now()}${extension}`;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = Array.from(formData.values());

    if (!files) {
      return NextResponse.json("No file found", { status: 400 });
    }
    if (!fs.existsSync(FS_UPLOAD_DIR)) {
      fs.mkdirSync(FS_UPLOAD_DIR);
    }
    const promiseUrls = files.map(async (file) => {
      const buffer = Buffer.from(await (file as Blob).arrayBuffer());
      const newFileName = changeFileName((file as File).name);
      const dest = path.resolve(FS_UPLOAD_DIR, newFileName);
      await fsPromises.writeFile(dest, buffer as unknown as Uint8Array);
      return `${UPLOAD_DIR}/${newFileName}`;
    });
    const urls = await Promise.all(promiseUrls);
    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const file = req.nextUrl.searchParams.get("file");
    if (!file) {
      console.log(`No file name to delete`);
      return;
    }
    const filePath = path.join(process.cwd(), "public", file);
    await fsPromises.unlink(filePath);
    return NextResponse.json({ status: 202 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}