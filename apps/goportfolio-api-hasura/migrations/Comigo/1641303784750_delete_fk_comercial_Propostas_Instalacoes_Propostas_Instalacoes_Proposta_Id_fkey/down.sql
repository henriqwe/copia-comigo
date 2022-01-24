alter table "comercial"."Propostas_Instalacoes"
  add constraint "Propostas_Instalacoes_Proposta_Id_fkey"
  foreign key ("Proposta_Id")
  references "comercial"."Propostas"
  ("Id") on update restrict on delete restrict;
