-- CreateEnum
CREATE TYPE "HttpMehthod" AS ENUM ('get', 'post');

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "reqMethod" "HttpMehthod" NOT NULL,
    "reqUrl" TEXT NOT NULL,
    "reqBody" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);
