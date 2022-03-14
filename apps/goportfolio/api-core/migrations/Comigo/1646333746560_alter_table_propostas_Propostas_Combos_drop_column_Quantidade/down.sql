alter table "propostas"."Propostas_Combos" alter column "Quantidade" set default 1;
alter table "propostas"."Propostas_Combos" alter column "Quantidade" drop not null;
alter table "propostas"."Propostas_Combos" add column "Quantidade" int4;
