-- CreateTable
CREATE TABLE "Tache" (
    "id" TEXT NOT NULL,
    "Nom" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Priorite" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tache_pkey" PRIMARY KEY ("id")
);
