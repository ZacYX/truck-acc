/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Email_userId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roles" "Role"[];
