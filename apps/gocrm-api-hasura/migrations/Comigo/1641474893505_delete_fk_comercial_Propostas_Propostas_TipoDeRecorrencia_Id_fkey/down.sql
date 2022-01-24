alter table "comercial"."Propostas"
  add constraint "Propostas_TipoDeRecorrencia_Id_fkey"
  foreign key ("TipoDeRecorrencia_Id")
  references "vendas"."TiposDeRecorrencia"
  ("Valor") on update restrict on delete restrict;
