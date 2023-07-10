/*
  Warnings:

  - The primary key for the `user_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `refresh_token` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `user_tokens` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `expires_in` on the `user_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "refresh_token" DROP CONSTRAINT "refresh_token_user_id_fkey";

-- AlterTable
ALTER TABLE "user_tokens" DROP CONSTRAINT "user_tokens_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
DROP COLUMN "expires_in",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "refresh_token";
