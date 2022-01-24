alter table "public"."CategoriasDeVeiculos" drop constraint "CategoriasDeVeiculos_pkey";
alter table "public"."CategoriasDeVeiculos"
    add constraint "CategoriasDeVeiculos_pkey"
    primary key ("Valor");
