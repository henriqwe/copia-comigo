alter table "comercial"."Combos_Planos"
  add constraint "Combos_Planos_Plano_Id_fkey"
  foreign key ("Plano_Id")
  references "comercial"."Planos"
  ("Id") on update restrict on delete restrict;
