alter table "comercial"."ContratosBase" alter column "Versao" drop not null;
alter table "comercial"."ContratosBase" add column "Versao" int4;
