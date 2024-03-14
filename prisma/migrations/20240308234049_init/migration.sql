-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Small', 'Medium', 'Large', 'XLarge');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('Red', 'Green', 'Blue');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TOPPER', 'RACK', 'TENT', 'EQUIPMENT');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUBSCRIBER', 'POSTER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('DEFAULT', 'SHIPPING', 'BILLING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "phone" TEXT[],
    "registerAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "role" "Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'EQUIPMENT',
    "size" "Size",
    "color" "Color",

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "unit" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "provice" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Canada',
    "zip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressType" "AddressType"[],

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "height" INTEGER NOT NULL DEFAULT 200,
    "width" INTEGER NOT NULL DEFAULT 100,
    "url" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PictureToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_authorId_key" ON "Posts"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Email_userId_key" ON "Email"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_PictureToProduct_AB_unique" ON "_PictureToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PictureToProduct_B_index" ON "_PictureToProduct"("B");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PictureToProduct" ADD CONSTRAINT "_PictureToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Picture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PictureToProduct" ADD CONSTRAINT "_PictureToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
