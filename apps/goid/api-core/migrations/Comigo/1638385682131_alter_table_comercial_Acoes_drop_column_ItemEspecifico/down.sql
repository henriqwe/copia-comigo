alter table "comercial"."Acoes" alter column "ItemEspecifico" set default false;
alter table "comercial"."Acoes" alter column "ItemEspecifico" drop not null;
alter table "comercial"."Acoes" add column "ItemEspecifico" bool;
