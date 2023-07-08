/*
  Warnings:

  - Added the required column `product_id` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
