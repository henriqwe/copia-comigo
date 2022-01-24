alter table "comercial"."Propostas"
  add constraint "Propostas_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "comercial"."Propostas_Situacoes"
  ("Valor") on update restrict on delete restrict;
