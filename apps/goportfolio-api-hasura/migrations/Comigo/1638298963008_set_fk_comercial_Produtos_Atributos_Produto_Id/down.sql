alter table "comercial"."Produtos_Atributos" drop constraint "Produtos_Atributos_Produto_Id_fkey",
  add constraint "Produtos_Atributos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
