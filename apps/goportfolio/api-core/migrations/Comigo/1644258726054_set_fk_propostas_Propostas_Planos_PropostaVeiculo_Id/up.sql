alter table "propostas"."Propostas_Planos"
  add constraint "Propostas_Planos_PropostaVeiculo_Id_fkey"
  foreign key ("PropostaVeiculo_Id")
  references "propostas"."Propostas_Veiculos"
  ("Id") on update restrict on delete restrict;
