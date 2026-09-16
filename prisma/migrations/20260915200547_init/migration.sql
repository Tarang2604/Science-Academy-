-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('ADMISSION', 'DEMO', 'CONSULTATION', 'CONTACT');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'SCHEDULED', 'CONVERTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "SubjectType" AS ENUM ('PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'COMMERCE', 'INFORMATICS_PRACTICES');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL DEFAULT 'CONTACT',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "targetClass" TEXT,
    "subjects" TEXT,
    "persona" TEXT,
    "preferredTiming" TEXT,
    "message" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" "SubjectType" NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "curriculum" JSONB NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" "SubjectType" NOT NULL,
    "qualification" TEXT NOT NULL,
    "experienceYrs" INTEGER,
    "bio" TEXT NOT NULL,
    "photoUrl" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Batch" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "totalSeats" INTEGER NOT NULL DEFAULT 30,
    "filledSeats" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topper" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "examName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "score" TEXT NOT NULL,
    "subject" TEXT,
    "photoUrl" TEXT,
    "story" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Science Academy Academic Team',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Faculty_slug_key" ON "Faculty"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topper_slug_key" ON "Topper"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- AddForeignKey
ALTER TABLE "Batch" ADD CONSTRAINT "Batch_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
