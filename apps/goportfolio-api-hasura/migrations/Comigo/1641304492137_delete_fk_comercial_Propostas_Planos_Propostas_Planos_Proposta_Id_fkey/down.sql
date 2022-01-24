alter table "comercial"."Propostas_Planos"
  add constraint "Propostas_Planos_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "comercial"."Propostas"
  ("Id") on update restrict on delete restrict;
