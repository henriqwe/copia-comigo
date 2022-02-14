alter table "propostas"."Propostas_Veiculos" alter column "PosicaoDoVeiculo" drop not null;
alter table "propostas"."Propostas_Veiculos" add column "PosicaoDoVeiculo" int4;
