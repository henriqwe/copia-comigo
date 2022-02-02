alter table "comercial"."Planos_Precos"
  add constraint "Planos_Precos_Plano_Id_fkey"
  foreign key ("Plano_Id")
  references "comercial"."Planos"
  ("Id") on update restrict on delete restrict;
