-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "cnpj" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);
