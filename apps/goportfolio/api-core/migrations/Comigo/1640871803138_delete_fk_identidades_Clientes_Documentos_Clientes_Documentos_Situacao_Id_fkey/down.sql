alter table "identidades"."Clientes_Documentos"
  add constraint "Clientes_Documentos_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "identidades"."Clientes_Documentos_Situacoes"
  ("Valor") on update restrict on delete restrict;
