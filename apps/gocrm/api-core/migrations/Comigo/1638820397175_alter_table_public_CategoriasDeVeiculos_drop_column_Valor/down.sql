alter table "public"."CategoriasDeVeiculos" alter column "Valor" drop not null;
alter table "public"."CategoriasDeVeiculos" add column "Valor" text;
