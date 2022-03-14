alter table "propostas"."Propostas_Servicos"
  add constraint "Propostas_Servicos_PropostaPlano_Id_fkey"
  foreign key ("PropostaPlano_Id")
  references "propostas"."Propostas_Planos"
  ("Id") on update restrict on delete restrict;
