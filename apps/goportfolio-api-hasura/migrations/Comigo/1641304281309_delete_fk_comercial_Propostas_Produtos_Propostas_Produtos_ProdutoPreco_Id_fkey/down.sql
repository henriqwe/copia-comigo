alter table "comercial"."Propostas_Produtos"
  add constraint "Propostas_Produtos_ProdutoPreco_Id_fkey"
  foreign key ("ProdutoPreco_Id")
  references "comercial"."PrestadoresDeServicos_Produtos_Precos"
  ("Id") on update restrict on delete restrict;
