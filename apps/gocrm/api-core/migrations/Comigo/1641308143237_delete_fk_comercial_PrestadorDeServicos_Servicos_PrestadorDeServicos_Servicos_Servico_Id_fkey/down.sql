alter table "comercial"."PrestadorDeServicos_Servicos"
  add constraint "PrestadorDeServicos_Servicos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
