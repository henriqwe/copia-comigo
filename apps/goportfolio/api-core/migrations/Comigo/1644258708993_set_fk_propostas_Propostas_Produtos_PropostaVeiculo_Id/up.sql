alter table "propostas"."Propostas_Produtos"
  add constraint "Propostas_Produtos_PropostaVeiculo_Id_fkey"
  foreign key ("PropostaVeiculo_Id")
  references "propostas"."Propostas_Veiculos"
  ("Id") on update restrict on delete restrict;
