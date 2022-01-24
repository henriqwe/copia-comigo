alter table "comercial"."Propostas_Produtos"
  add constraint "Propostas_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
