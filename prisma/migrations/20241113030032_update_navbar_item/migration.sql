/*
  Warnings:

  - Added the required column `order` to the `NavbarItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NavbarItem" ADD COLUMN     "order" INTEGER NOT NULL;
