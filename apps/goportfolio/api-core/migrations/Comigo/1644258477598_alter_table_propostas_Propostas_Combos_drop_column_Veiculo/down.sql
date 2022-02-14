alter table "propostas"."Propostas_Combos" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Combos" add column "Veiculo" int4;
