-- AlterTable
ALTER TABLE "Homily" ALTER COLUMN "datePublished" DROP NOT NULL,
ADD COLUMN     "videoLink" TEXT;
