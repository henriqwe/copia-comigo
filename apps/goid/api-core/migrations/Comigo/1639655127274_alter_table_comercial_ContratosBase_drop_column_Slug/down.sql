alter table "comercial"."ContratosBase" alter column "Slug" drop not null;
alter table "comercial"."ContratosBase" add column "Slug" text;
