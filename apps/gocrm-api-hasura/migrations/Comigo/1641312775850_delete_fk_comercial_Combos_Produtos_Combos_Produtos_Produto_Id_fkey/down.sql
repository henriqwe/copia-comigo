alter table "comercial"."Combos_Produtos"
  add constraint "Combos_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
