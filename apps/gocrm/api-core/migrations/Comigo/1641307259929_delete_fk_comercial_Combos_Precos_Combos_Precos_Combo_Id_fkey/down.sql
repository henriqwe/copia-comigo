alter table "comercial"."Combos_Precos"
  add constraint "Combos_Precos_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
