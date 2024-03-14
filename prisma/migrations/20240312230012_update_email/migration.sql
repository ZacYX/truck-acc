-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_userId_fkey";

-- AlterTable
ALTER TABLE "Email" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
