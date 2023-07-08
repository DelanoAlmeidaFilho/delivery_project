/*
  Warnings:

  - Added the required column `order_id` to the `order_product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_product" ADD COLUMN     "order_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
