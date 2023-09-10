/*
  Warnings:

  - You are about to drop the column `logo_url` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "logo_url",
ADD COLUMN     "logoUrl" TEXT;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
