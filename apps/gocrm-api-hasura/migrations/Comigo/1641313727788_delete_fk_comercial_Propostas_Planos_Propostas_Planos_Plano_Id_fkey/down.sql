alter table "comercial"."Propostas_Planos"
  add constraint "Propostas_Planos_Plano_Id_fkey"
  foreign key ("Plano_Id")
  references "comercial"."Planos"
  ("Id") on update restrict on delete restrict;
