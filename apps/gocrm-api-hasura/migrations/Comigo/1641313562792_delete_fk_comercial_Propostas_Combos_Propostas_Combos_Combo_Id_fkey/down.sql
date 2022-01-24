alter table "comercial"."Propostas_Combos"
  add constraint "Propostas_Combos_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
