alter table "propostas"."Propostas_Combos"
  add constraint "Propostas_Combos_PropostaVeiculo_Id_fkey"
  foreign key ("PropostaVeiculo_Id")
  references "propostas"."Propostas_Veiculos"
  ("Id") on update restrict on delete restrict;
