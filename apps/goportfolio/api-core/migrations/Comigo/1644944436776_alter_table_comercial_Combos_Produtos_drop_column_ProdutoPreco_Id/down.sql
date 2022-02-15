alter table "comercial"."Combos_Produtos" alter column "ProdutoPreco_Id" drop not null;
alter table "comercial"."Combos_Produtos" add column "ProdutoPreco_Id" uuid;
