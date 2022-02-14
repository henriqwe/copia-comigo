alter table "comercial"."PrestadoresDeServicos_Produtos_Itens"
  add constraint "PrestadoresDeServicos_Produtos_Itens_TipoDeItem_Id_fkey"
  foreign key ("TipoDeItem_Id")
  references "comercial"."TipoDeItens"
  ("Valor") on update restrict on delete restrict;
