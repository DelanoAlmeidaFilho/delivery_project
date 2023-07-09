-- CreateTable
CREATE TABLE "user_tokens" (
    "token" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
