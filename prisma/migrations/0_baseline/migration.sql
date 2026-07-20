-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Shop" (
    "id" TEXT NOT NULL,
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
    "place_id" TEXT,
    "acceptsFleet" BOOLEAN NOT NULL DEFAULT false,
    "hasDriverLounge" BOOLEAN NOT NULL DEFAULT false,
    "hasTruckParking" BOOLEAN NOT NULL DEFAULT false,
    "is24Hours" BOOLEAN NOT NULL DEFAULT false,
    "isMobileService" BOOLEAN NOT NULL DEFAULT false,
    "vicinity" TEXT,
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShopHours" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "openTime" TEXT,
    "closeTime" TEXT,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ShopHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShopPhoto" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "photoReference" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "source" TEXT NOT NULL DEFAULT 'google',

    CONSTRAINT "ShopPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShopReview" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "authorName" TEXT,
    "authorPhoto" TEXT,
    "rating" INTEGER NOT NULL,
    "text" TEXT,
    "publishedAt" TIMESTAMP(3),
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShopReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShopService" (
    "id" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,
    "service" TEXT NOT NULL,

    CONSTRAINT "ShopService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Shop_lat_lng_idx" ON "public"."Shop"("lat" ASC, "lng" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Shop_place_id_key" ON "public"."Shop"("place_id" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ShopHours_shopId_dayOfWeek_key" ON "public"."ShopHours"("shopId" ASC, "dayOfWeek" ASC);

-- AddForeignKey
ALTER TABLE "public"."ShopHours" ADD CONSTRAINT "ShopHours_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShopPhoto" ADD CONSTRAINT "ShopPhoto_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShopReview" ADD CONSTRAINT "ShopReview_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShopService" ADD CONSTRAINT "ShopService_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "public"."Shop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

