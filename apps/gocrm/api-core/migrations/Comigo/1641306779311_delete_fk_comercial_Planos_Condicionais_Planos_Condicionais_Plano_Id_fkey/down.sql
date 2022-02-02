alter table "comercial"."Planos_Condicionais"
  add constraint "Planos_Condicionais_Plano_Id_fkey"
  foreign key ("Plano_Id")
  references "comercial"."Planos"
  ("Id") on update restrict on delete restrict;
