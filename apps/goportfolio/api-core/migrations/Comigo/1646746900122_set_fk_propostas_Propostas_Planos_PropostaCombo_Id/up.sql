alter table "propostas"."Propostas_Planos"
  add constraint "Propostas_Planos_PropostaCombo_Id_fkey"
  foreign key ("PropostaCombo_Id")
  references "propostas"."Propostas_Combos"
  ("Id") on update restrict on delete restrict;
