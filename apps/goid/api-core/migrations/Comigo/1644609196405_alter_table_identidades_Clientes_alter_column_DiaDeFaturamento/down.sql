alter table "identidades"."Clientes" rename column "DiaDeFaturamento_Id" to "DiaDeFaturamento";
ALTER TABLE "identidades"."Clientes" ALTER COLUMN "DiaDeFaturamento" TYPE timestamp with time zone;
