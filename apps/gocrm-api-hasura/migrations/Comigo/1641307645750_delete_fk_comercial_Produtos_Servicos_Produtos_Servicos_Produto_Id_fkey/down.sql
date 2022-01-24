alter table "comercial"."Produtos_Servicos"
  add constraint "Produtos_Servicos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
