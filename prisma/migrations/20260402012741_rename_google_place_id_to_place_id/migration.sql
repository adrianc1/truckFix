-- DropIndex
DROP INDEX "Shop_googlePlaceId_key";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "googlePlaceId",
ADD COLUMN     "place_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Shop_place_id_key" ON "Shop"("place_id");
