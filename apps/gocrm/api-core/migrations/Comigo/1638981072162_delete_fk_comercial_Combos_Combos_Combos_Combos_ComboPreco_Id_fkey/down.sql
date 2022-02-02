alter table "comercial"."Combos_Combos"
  add constraint "Combos_Combos_ComboPreco_Id_fkey"
  foreign key ("ComboPreco_Id")
  references "comercial"."Combos_Precos"
  ("Id") on update restrict on delete restrict;
