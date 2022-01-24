alter table "comercial"."Fornecedores_Produtos"
  add constraint "Fornecedores_Produtos_Fornecedor_Id_fkey"
  foreign key ("Fornecedor_Id")
  references "comercial"."Fornecedores"
  ("Id") on update restrict on delete restrict;
