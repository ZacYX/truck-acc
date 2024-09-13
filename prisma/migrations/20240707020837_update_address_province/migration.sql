/*
  Warnings:

  - You are about to drop the column `provice` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "provice",
ADD COLUMN     "province" TEXT;
