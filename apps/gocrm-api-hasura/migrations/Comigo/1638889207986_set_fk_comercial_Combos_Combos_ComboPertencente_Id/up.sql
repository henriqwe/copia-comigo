alter table "comercial"."Combos_Combos"
  add constraint "Combos_Combos_ComboPertencente_Id_fkey"
  foreign key ("ComboPertencente_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
