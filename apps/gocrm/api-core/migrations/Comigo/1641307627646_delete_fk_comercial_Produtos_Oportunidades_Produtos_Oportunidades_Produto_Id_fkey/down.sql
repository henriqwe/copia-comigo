alter table "comercial"."Produtos_Oportunidades"
  add constraint "Produtos_Oportunidades_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
