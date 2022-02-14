alter table "propostas"."Propostas_Servicos"
  add constraint "Propostas_Servicos_PropostaVeiculo_Id_fkey"
  foreign key ("PropostaVeiculo_Id")
  references "propostas"."Propostas_Veiculos"
  ("Id") on update restrict on delete restrict;
