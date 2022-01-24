alter table "comercial"."Fornecedores_Produtos_Precos"
  add constraint "Fornecedores_Produtos_Precos_TipoDeRecorrencia_Id_fkey"
  foreign key ("TipoDeRecorrencia_Id")
  references "vendas"."TiposDeRecorrencia"
  ("Valor") on update restrict on delete restrict;
