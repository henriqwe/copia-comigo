alter table "comercial"."PrestadoresDeServicos_Produtos_ItensDeEstoque"
  add constraint "PrestadoresDeServicos_Produtos_ItensDeEstoque_PrestadoresDeS"
  foreign key ("PrestadoresDeServicos_Produtos_Id")
  references "comercial"."PrestadoresDeServicos_Produtos"
  ("Id") on update restrict on delete restrict;
