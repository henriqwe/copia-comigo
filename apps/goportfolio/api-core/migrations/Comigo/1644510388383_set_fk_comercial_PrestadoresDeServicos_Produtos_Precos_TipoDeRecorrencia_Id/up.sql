alter table "comercial"."PrestadoresDeServicos_Produtos_Precos"
  add constraint "PrestadoresDeServicos_Produtos_Precos_TipoDeRecorrencia_Id_f"
  foreign key ("TipoDeRecorrencia_Id")
  references "vendas"."TiposDeRecorrencia"
  ("Valor") on update restrict on delete restrict;
