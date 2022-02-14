alter table "propostas"."Propostas_Produtos" alter column "Veiculo" drop not null;
alter table "propostas"."Propostas_Produtos" add column "Veiculo" int4;
