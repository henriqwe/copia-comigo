alter table "propostas"."Propostas_Servicos"
  add constraint "Propostas_Servicos_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "propostas"."Propostas"
  ("Id") on update restrict on delete restrict;
