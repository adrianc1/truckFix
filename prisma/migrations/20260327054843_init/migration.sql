-- CreateTable
CREATE TABLE "Shop" (
    "id" TEXT NOT NULL,
    "googlePlaceId" TEXT,
    "source" TEXT NOT NULL DEFAULT 'manual',
    "name" TEXT NOT NULL,
    "formattedAddress" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "businessStatus" TEXT,
    "priceLevel" INTEGER,
    "rating" DOUBLE PRECISION,
    "userRatingsTotal" INTEGER,
    "specializesInTrucks" BOOLEAN NOT NULL DEFAULT false,
    "acceptsLargeVehicles" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "lastSyncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopHours" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TEXT,
    "closeTime" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ShopHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopService" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "service" TEXT NOT NULL,

    CONSTRAINT "ShopService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopPhoto" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "photoReference" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "source" TEXT NOT NULL DEFAULT 'google',

    CONSTRAINT "ShopPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_googlePlaceId_key" ON "Shop"("googlePlaceId");

-- AddForeignKey
ALTER TABLE "ShopHours" ADD CONSTRAINT "ShopHours_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopService" ADD CONSTRAINT "ShopService_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopPhoto" ADD CONSTRAINT "ShopPhoto_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
