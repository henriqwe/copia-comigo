alter table "comercial"."Propostas_Servicos"
  add constraint "Propostas_Servicos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
