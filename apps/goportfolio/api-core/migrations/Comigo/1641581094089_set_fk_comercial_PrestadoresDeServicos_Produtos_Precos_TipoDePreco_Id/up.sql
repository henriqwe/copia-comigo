alter table "comercial"."PrestadoresDeServicos_Produtos_Precos"
  add constraint "PrestadoresDeServicos_Produtos_Precos_TipoDePreco_Id_fkey"
  foreign key ("TipoDePreco_Id")
  references "vendas"."TiposDePrecos"
  ("Valor") on update restrict on delete restrict;
