import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import minioClient from "@/app/minio/minio";

// const DEFAULT_UPLOAD_DIR = "uploads";
// const FS_UPLOAD_DIR = path.join(process.cwd(), "public", UPLOAD_DIR);
const DEFAULT_UPLOAD_DIR = "product";
const isDevMode = process.env.DEV_MODE ?? false;

const getUploadFsDir = (uploadDir: string) => (
  path.join(process.cwd(), "public", uploadDir)
)

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

    if (isDevMode) {
      //develop mode, wirte to publlic upload folder
      const dir = req.nextUrl.searchParams.get("path") ?? DEFAULT_UPLOAD_DIR;
      const uploadDir = `upload/${dir}`;
      const fsUploadDir = getUploadFsDir(uploadDir);
      console.debug(`fsUploadDir: ${fsUploadDir}`);
      if (!fs.existsSync(fsUploadDir)) {
        fs.mkdirSync(fsUploadDir);
      }
      const promiseUrls = files.map(async (file) => {
        const buffer = Buffer.from(await (file as Blob).arrayBuffer());
        const newFileName = changeFileName((file as File).name);
        const dest = path.resolve(fsUploadDir, newFileName);
        await fsPromises.writeFile(dest, buffer as unknown as Uint8Array);
        console.debug(`/${uploadDir}/${newFileName}`);
        return `/${uploadDir}/${newFileName}`;
      });
      const urls = await Promise.all(promiseUrls);
      return NextResponse.json(urls, { status: 200 });
    } else {
      //production mode, write to minio
      console.debug(`store images to minio bucket`);

      const bucketName = process.env.MINIO_BUCKET ?? "";
      console.debug(`bucketName: ${bucketName}`);
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        console.info(`No bucket found, create a new one`);
        await minioClient.makeBucket(bucketName, "us-ease-1");
      }
      const promisesUrls = files.map(async (file) => {
        const buffer = Buffer.from(await (file as Blob).arrayBuffer());
        const newFileName = changeFileName((file as File).name);
        const result = await minioClient.putObject(bucketName, newFileName, buffer);
        console.debug(`putObject result: ${result.etag}`);

        return newFileName;
      })

      const urls = await Promise.all(promisesUrls);
      return NextResponse.json(urls, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function GET(req: NextRequest) {
  const bucketName = process.env.MINIO_BUCKET ?? "";
  try {
    if (req.nextUrl.searchParams?.has("name")) {
      const objName = req.nextUrl.searchParams.get("name") ?? "";
      const presignedUrl = await minioClient.presignedGetObject(bucketName, objName);
      return NextResponse.json(presignedUrl, { status: 201 });
    }
    return NextResponse.json(`No object name`, { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, cause:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}

export async function DELETE(req: NextRequest) {
  const bucketName = process.env.MINIO_BUCKET ?? "";
  try {
    const file = req.nextUrl.searchParams.get("file");
    if (!file) {
      console.log(`No file name to delete`);
      return;
    }
    // const filePath = path.join(process.cwd(), "public", file);
    // await fsPromises.unlink(filePath);
    await minioClient.removeObject(bucketName, file)
    return NextResponse.json({ status: 202 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(`${error.message}, case:${error.cause}`, { status: 500 });
    } else {
      return NextResponse.json(`Server error.`, { status: 500 })
    }
  }
}