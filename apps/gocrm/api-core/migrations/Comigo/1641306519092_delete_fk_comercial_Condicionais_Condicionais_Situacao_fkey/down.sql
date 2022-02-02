alter table "comercial"."Condicionais"
  add constraint "Condicionais_Situacao_fkey"
  foreign key ("Situacao_Id")
  references "comercial"."CondicionaisSituacoes"
  ("Valor") on update restrict on delete restrict;
