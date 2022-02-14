ALTER TABLE "identidades"."Clientes" ALTER COLUMN "DiaDeFaturamento" TYPE text;
alter table "identidades"."Clientes" rename column "DiaDeFaturamento" to "DiaDeFaturamento_Id";
