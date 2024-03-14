/*
  Warnings:

  - You are about to drop the `_PictureToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PictureToProduct" DROP CONSTRAINT "_PictureToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_PictureToProduct" DROP CONSTRAINT "_PictureToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "productId" INTEGER;

-- DropTable
DROP TABLE "_PictureToProduct";

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
