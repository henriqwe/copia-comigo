alter table "clientes"."VeiculosAtivos_Beneficios" alter column "TipoPortfolio" drop not null;
alter table "clientes"."VeiculosAtivos_Beneficios" add column "TipoPortfolio" text;
