/*
  Warnings:

  - You are about to drop the column `inventroy` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "inventroy",
ADD COLUMN     "inventory" INTEGER;
