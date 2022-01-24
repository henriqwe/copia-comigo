alter table "comercial"."Combos_Planos"
  add constraint "Combos_Planos_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
