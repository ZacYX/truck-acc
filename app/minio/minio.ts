import { Client } from "minio";

const minioClient = new Client({
  // endPoint: "minioapi.goxmore.com",
  // port: 443,
  // useSSL: true,
  // accessKey: "7d2W7",
  // secretKey: "0QlDnZr",
  endPoint: process.env.MINIO_ENDPOINT ?? "minioapi.goxmore.com",
  port: parseInt(process.env.MINIO_PORT ?? "443"),
  useSSL: process.env.MINIO_USE_SSL === "true",
  accessKey: process.env.MINIO_ACCESSKEY ?? "",
  secretKey: process.env.MINIO_SECRETKEY ?? "",
});

export default minioClient;