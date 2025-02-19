/*
  Warnings:

  - You are about to drop the column `setId` on the `Term` table. All the data in the column will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deckId` to the `Term` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Set` DROP FOREIGN KEY `Set_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Term` DROP FOREIGN KEY `Term_setId_fkey`;

-- DropIndex
DROP INDEX `Term_setId_fkey` ON `Term`;

-- AlterTable
ALTER TABLE `Term` DROP COLUMN `setId`,
    ADD COLUMN `deckId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Set`;

-- CreateTable
CREATE TABLE `Deck` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Deck` ADD CONSTRAINT `Deck_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_deckId_fkey` FOREIGN KEY (`deckId`) REFERENCES `Deck`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
