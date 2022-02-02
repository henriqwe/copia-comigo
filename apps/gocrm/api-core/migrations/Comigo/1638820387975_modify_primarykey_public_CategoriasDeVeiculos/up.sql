BEGIN TRANSACTION;
ALTER TABLE "public"."CategoriasDeVeiculos" DROP CONSTRAINT "CategoriasDeVeiculos_pkey";

ALTER TABLE "public"."CategoriasDeVeiculos"
    ADD CONSTRAINT "CategoriasDeVeiculos_pkey" PRIMARY KEY ("Id");
COMMIT TRANSACTION;
