-- CreateTable
CREATE TABLE "Homily" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "datePublished" TIMESTAMP(3) NOT NULL,
    "liturgicalYear" TEXT,
    "liturgicalSeason" TEXT,
    "biblePassage" TEXT,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "originalFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Homily_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Homily_slug_key" ON "Homily"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Homily_originalFile_key" ON "Homily"("originalFile");

-- CreateIndex
CREATE INDEX "Homily_title_idx" ON "Homily"("title");

-- CreateIndex
CREATE INDEX "Homily_datePublished_idx" ON "Homily"("datePublished");
