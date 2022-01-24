alter table "comercial"."Propostas_Servicos"
  add constraint "Propostas_Servicos_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "comercial"."Propostas"
  ("Id") on update restrict on delete restrict;
