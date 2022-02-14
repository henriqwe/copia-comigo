alter table "propostas"."Propostas_Oportunidades"
  add constraint "Propostas_Oportunidades_PropostaVeiculo_Id_fkey"
  foreign key ("PropostaVeiculo_Id")
  references "propostas"."Propostas_Veiculos"
  ("Id") on update restrict on delete restrict;
