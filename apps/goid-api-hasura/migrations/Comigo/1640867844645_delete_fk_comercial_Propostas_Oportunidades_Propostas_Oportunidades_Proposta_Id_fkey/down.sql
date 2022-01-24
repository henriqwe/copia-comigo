alter table "comercial"."Propostas_Oportunidades"
  add constraint "Propostas_Oportunidades_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "comercial"."Propostas"
  ("Id") on update restrict on delete restrict;
