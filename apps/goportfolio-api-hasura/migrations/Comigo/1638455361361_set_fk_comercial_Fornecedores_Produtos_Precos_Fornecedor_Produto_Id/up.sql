alter table "comercial"."Fornecedores_Produtos_Precos"
  add constraint "Fornecedores_Produtos_Precos_Fornecedor_Produto_Id_fkey"
  foreign key ("Fornecedor_Produto_Id")
  references "comercial"."Fornecedores_Produtos"
  ("Id") on update restrict on delete restrict;
