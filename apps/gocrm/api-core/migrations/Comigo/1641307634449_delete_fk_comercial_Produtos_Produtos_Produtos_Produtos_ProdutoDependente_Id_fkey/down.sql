alter table "comercial"."Produtos_Produtos"
  add constraint "Produtos_Produtos_ProdutoDependente_Id_fkey"
  foreign key ("ProdutoDependente_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
