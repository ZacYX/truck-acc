/*
  Warnings:

  - A unique constraint covering the columns `[loginName]` on the table `PasswordLogin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[loginEmail]` on the table `PasswordLogin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginEmail` to the `PasswordLogin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordLogin" ADD COLUMN     "loginEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordLogin_loginName_key" ON "PasswordLogin"("loginName");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordLogin_loginEmail_key" ON "PasswordLogin"("loginEmail");
