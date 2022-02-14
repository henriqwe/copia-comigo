alter table "propostas"."Propostas_Oportunidades" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Oportunidades" add column "Veiculo" int4;
