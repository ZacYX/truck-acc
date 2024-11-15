/*
  Warnings:

  - You are about to drop the column `inforName` on the `WebInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `WebInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `WebInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "WebInfo_inforName_key";

-- AlterTable
ALTER TABLE "WebInfo" DROP COLUMN "inforName",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WebInfo_name_key" ON "WebInfo"("name");
