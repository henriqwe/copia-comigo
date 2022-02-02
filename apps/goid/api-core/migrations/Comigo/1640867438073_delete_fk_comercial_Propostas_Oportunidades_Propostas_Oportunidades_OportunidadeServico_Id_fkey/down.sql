alter table "comercial"."Propostas_Oportunidades"
  add constraint "Propostas_Oportunidades_OportunidadeServico_Id_fkey"
  foreign key ("OportunidadeServico_Id")
  references "comercial"."Servicos_Oportunidades"
  ("Id") on update restrict on delete restrict;
