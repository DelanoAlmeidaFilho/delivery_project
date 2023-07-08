-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "change" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "observation" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);
