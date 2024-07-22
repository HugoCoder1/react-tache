-- CreateTable
CREATE TABLE "Tache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Nom" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Priorite" TEXT NOT NULL,
    "Status" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
