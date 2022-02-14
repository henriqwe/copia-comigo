alter table "comercial"."Combos_Precos" rename column "ValorDeAdesao" to "Valor";
ALTER TABLE "comercial"."Combos_Precos" ALTER COLUMN "Valor" drop default;
