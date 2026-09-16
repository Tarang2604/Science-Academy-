-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "GalleryItem" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Topper" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'DRAFT';
