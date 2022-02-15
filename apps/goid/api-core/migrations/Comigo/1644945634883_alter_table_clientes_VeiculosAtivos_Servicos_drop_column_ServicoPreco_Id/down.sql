alter table "clientes"."VeiculosAtivos_Servicos" alter column "ServicoPreco_Id" drop not null;
alter table "clientes"."VeiculosAtivos_Servicos" add column "ServicoPreco_Id" uuid;
