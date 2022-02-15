alter table "clientes"."VeiculosAtivos_Produtos" alter column "ProdutoPreco_Id" drop not null;
alter table "clientes"."VeiculosAtivos_Produtos" add column "ProdutoPreco_Id" uuid;
