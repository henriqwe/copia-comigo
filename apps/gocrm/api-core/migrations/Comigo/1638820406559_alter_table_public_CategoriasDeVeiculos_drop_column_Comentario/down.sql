alter table "public"."CategoriasDeVeiculos" alter column "Comentario" drop not null;
alter table "public"."CategoriasDeVeiculos" add column "Comentario" text;
