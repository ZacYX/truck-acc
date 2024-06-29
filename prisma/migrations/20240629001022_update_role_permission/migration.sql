/*
  Warnings:

  - You are about to drop the column `item` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Role` table. All the data in the column will be lost.
  - Added the required column `details` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `details` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "item",
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "role",
ADD COLUMN     "details" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
