alter table "propostas"."Propostas_Servicos"
  add constraint "Propostas_Servicos_PropostaCombo_Id_fkey"
  foreign key ("PropostaCombo_Id")
  references "propostas"."Propostas_Combos"
  ("Id") on update restrict on delete restrict;
