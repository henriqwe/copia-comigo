alter table "propostas"."Propostas_Produtos"
  add constraint "Propostas_Produtos_PropostaPlano_Id_fkey"
  foreign key ("PropostaPlano_Id")
  references "propostas"."Propostas_Planos"
  ("Id") on update restrict on delete restrict;
