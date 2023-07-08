-- CreateTable
CREATE TABLE "user_tokens" (
    "token" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("token")
);
