/*
  Warnings:

  - You are about to drop the column `expiresIn` on the `user_tokens` table. All the data in the column will be lost.
  - Added the required column `expires_in` to the `user_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_tokens" DROP COLUMN "expiresIn",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL;
