alter table "clientes"."VeiculosAtivos"
  add constraint "VeiculosAtivos_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "clientes"."VeiculosAtivos_Situacao"
  ("Valor") on update restrict on delete restrict;
