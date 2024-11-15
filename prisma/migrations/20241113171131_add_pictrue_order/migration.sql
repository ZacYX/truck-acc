/*
  Warnings:

  - You are about to drop the column `isPrimary` on the `Picture` table. All the data in the column will be lost.
  - You are about to drop the column `isPrimary` on the `WebPicture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "isPrimary",
ADD COLUMN     "order" TEXT;

-- AlterTable
ALTER TABLE "WebPicture" DROP COLUMN "isPrimary",
ADD COLUMN     "order" TEXT;
