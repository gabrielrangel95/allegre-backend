-- AlterTable
ALTER TABLE "user" ADD COLUMN     "forgotPasswordSentAt" TIMESTAMP(3),
ADD COLUMN     "forgotPasswordToken" TEXT;
