/*
  Warnings:

  - Added the required column `product_id` to the `product_entries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_entries" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product_entries" ADD CONSTRAINT "product_entries_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
