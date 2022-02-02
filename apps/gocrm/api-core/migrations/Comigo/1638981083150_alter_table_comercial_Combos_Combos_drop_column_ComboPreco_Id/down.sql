alter table "comercial"."Combos_Combos" alter column "ComboPreco_Id" drop not null;
alter table "comercial"."Combos_Combos" add column "ComboPreco_Id" uuid;
