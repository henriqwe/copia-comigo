alter table "comercial"."Servicos_Oportunidades"
  add constraint "Servicos_Oportunidades_Combo_Id_fkey"
  foreign key ("Combo_Id")
  references "comercial"."Combos"
  ("Id") on update restrict on delete restrict;
