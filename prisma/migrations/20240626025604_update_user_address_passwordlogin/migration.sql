/*
  Warnings:

  - You are about to drop the column `isDefault` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `loginEmail` on the `PasswordLogin` table. All the data in the column will be lost.
  - You are about to drop the column `phones` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PasswordLogin_loginEmail_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "isDefault";

-- AlterTable
ALTER TABLE "PasswordLogin" DROP COLUMN "loginEmail";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phones",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "secondPhone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");
