alter table "propostas"."Propostas_Instalacoes" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Instalacoes" add column "Veiculo" int4;
