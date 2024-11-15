/*
  Warnings:

  - You are about to drop the column `context` on the `WebInfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `WebInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inforName]` on the table `WebInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inforName` to the `WebInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WebInfo_name_key";

-- AlterTable
ALTER TABLE "WebInfo" DROP COLUMN "context",
DROP COLUMN "name",
ADD COLUMN     "content" TEXT[],
ADD COLUMN     "inforName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WebInfo_inforName_key" ON "WebInfo"("inforName");
