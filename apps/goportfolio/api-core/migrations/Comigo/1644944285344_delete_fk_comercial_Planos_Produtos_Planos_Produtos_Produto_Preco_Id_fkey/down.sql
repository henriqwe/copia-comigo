alter table "comercial"."Planos_Produtos"
  add constraint "Planos_Produtos_Produto_Preco_Id_fkey"
  foreign key ("ProdutoPreco_Id")
  references "comercial"."PrestadoresDeServicos_Produtos_Precos"
  ("Id") on update restrict on delete restrict;
