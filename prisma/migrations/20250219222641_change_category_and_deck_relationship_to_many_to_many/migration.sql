/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Deck` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Deck` DROP FOREIGN KEY `Deck_categoryId_fkey`;

-- DropIndex
DROP INDEX `Deck_categoryId_fkey` ON `Deck`;

-- AlterTable
ALTER TABLE `Deck` DROP COLUMN `categoryId`;

-- CreateTable
CREATE TABLE `_CategoryToDeck` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoryToDeck_AB_unique`(`A`, `B`),
    INDEX `_CategoryToDeck_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToDeck` ADD CONSTRAINT `_CategoryToDeck_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToDeck` ADD CONSTRAINT `_CategoryToDeck_B_fkey` FOREIGN KEY (`B`) REFERENCES `Deck`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
