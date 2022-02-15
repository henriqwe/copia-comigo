alter table "comercial"."Planos_Produtos" alter column "ProdutoPreco_Id" drop not null;
alter table "comercial"."Planos_Produtos" add column "ProdutoPreco_Id" uuid;
