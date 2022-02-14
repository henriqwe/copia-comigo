alter table "propostas"."Propostas_Planos" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Planos" add column "Veiculo" int4;
