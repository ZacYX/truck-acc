/*
  Warnings:

  - You are about to drop the column `addressType` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressType",
ADD COLUMN     "addressTypes" "AddressType"[];

-- DropTable
DROP TABLE "Posts";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_authorId_key" ON "Post"("authorId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
