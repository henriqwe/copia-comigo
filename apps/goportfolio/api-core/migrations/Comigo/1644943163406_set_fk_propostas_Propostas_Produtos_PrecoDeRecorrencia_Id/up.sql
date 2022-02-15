alter table "propostas"."Propostas_Produtos"
  add constraint "Propostas_Produtos_PrecoDeRecorrencia_Id_fkey"
  foreign key ("PrecoDeRecorrencia_Id")
  references "comercial"."PrestadoresDeServicos_Produtos_Precos"
  ("Id") on update restrict on delete restrict;
