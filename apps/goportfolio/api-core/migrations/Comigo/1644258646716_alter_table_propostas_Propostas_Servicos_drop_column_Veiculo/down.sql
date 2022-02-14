alter table "propostas"."Propostas_Servicos" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Servicos" add column "Veiculo" int4;
