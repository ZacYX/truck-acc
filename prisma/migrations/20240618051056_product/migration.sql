/*
  Warnings:

  - A unique constraint covering the columns `[emailAddress]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Email_emailAddress_key" ON "Email"("emailAddress");
