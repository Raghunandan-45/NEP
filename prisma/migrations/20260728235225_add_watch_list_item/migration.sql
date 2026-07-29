/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `WatchListItems` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WatchListItems_userId_movieId_key" ON "WatchListItems"("userId", "movieId");
