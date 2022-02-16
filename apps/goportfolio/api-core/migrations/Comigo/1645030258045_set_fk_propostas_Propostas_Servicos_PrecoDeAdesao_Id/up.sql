alter table "propostas"."Propostas_Servicos"
  add constraint "Propostas_Servicos_PrecoDeAdesao_Id_fkey"
  foreign key ("PrecoDeAdesao_Id")
  references "comercial"."PrestadoresDeServicos_Servicos_Precos"
  ("Id") on update restrict on delete restrict;
