alter table "propostas"."Propostas_Produtos"
  add constraint "Propostas_Produtos_PropostaCombo_Id_fkey"
  foreign key ("PropostaCombo_Id")
  references "propostas"."Propostas_Combos"
  ("Id") on update restrict on delete restrict;
