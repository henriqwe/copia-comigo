alter table "comercial"."PrestadoresDeServicos_Servicos_Precos"
  add constraint "Fornecedores_Servicos_Precos_TipoDeRecorrencia_Id_fkey"
  foreign key ("TipoDeRecorrencia_Id")
  references "vendas"."TiposDeRecorrencia"
  ("Valor") on update restrict on delete restrict;
