-- CreateTable
CREATE TABLE "WebInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT[],
    "context" TEXT[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebPicture" (
    "id" SERIAL NOT NULL,
    "alt" TEXT,
    "height" INTEGER,
    "width" INTEGER,
    "url" TEXT NOT NULL,
    "isPrimary" BOOLEAN DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "webInfoId" INTEGER,

    CONSTRAINT "WebPicture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebInfo_name_key" ON "WebInfo"("name");

-- AddForeignKey
ALTER TABLE "WebPicture" ADD CONSTRAINT "WebPicture_webInfoId_fkey" FOREIGN KEY ("webInfoId") REFERENCES "WebInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
