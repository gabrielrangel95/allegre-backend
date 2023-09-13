-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('BRANCO', 'NEGRO', 'AMARELO', 'PARDO', 'INDIGENA');

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT,
    "cpf" TEXT,
    "nis" TEXT,
    "gender" "Gender" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "primary_phone" TEXT,
    "secodary_phone" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
