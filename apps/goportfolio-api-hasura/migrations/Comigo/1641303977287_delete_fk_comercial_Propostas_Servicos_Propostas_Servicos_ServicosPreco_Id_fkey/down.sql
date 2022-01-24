alter table "comercial"."Propostas_Servicos"
  add constraint "Propostas_Servicos_ServicosPreco_Id_fkey"
  foreign key ("ServicosPreco_Id")
  references "comercial"."PrestadoresDeServicos_Servicos_Precos"
  ("Id") on update restrict on delete restrict;
