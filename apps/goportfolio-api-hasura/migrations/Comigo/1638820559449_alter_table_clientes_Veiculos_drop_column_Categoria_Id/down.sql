alter table "clientes"."Veiculos" alter column "Categoria_Id" drop not null;
alter table "clientes"."Veiculos" add column "Categoria_Id" text;
