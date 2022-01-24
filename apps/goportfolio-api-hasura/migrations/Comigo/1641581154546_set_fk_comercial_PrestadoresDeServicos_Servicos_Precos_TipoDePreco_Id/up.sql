alter table "comercial"."PrestadoresDeServicos_Servicos_Precos"
  add constraint "PrestadoresDeServicos_Servicos_Precos_TipoDePreco_Id_fkey"
  foreign key ("TipoDePreco_Id")
  references "vendas"."TiposDePrecos"
  ("Valor") on update restrict on delete restrict;
