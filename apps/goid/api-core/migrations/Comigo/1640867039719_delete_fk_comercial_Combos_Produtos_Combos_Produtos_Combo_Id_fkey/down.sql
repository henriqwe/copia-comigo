alter table "comercial"."Combos_Produtos"
  add constraint "Combos_Produtos_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
