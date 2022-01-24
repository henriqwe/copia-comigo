alter table "comercial"."Combos_Servicos"
  add constraint "Combos_Servicos_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
