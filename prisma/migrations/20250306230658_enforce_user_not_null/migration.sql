/*
  Warnings:

  - Made the column `userId` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Deck` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Term` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Deck` DROP FOREIGN KEY `Deck_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Term` DROP FOREIGN KEY `Term_userId_fkey`;

-- DropIndex
DROP INDEX `Category_userId_fkey` ON `Category`;

-- DropIndex
DROP INDEX `Deck_userId_fkey` ON `Deck`;

-- DropIndex
DROP INDEX `Term_userId_fkey` ON `Term`;

-- AlterTable
ALTER TABLE `Category` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Deck` MODIFY `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Term` MODIFY `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Deck` ADD CONSTRAINT `Deck_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Term` ADD CONSTRAINT `Term_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
