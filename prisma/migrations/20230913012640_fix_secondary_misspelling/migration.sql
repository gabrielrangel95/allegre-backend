/*
  Warnings:

  - You are about to drop the column `secodary_phone` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "secodary_phone",
ADD COLUMN     "secondary_phone" TEXT;
