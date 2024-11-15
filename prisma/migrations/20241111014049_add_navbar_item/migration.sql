-- CreateTable
CREATE TABLE "NavbarItem" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "link" TEXT NOT NULL,

    CONSTRAINT "NavbarItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NavbarItem_title_key" ON "NavbarItem"("title");
