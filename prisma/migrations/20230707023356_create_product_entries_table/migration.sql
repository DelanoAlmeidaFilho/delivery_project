-- CreateTable
CREATE TABLE "product_entries" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "cost_price" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_entries_pkey" PRIMARY KEY ("id")
);
