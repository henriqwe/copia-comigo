alter table "comercial"."Produtos_Servicos"
  add constraint "Produtos_Servicos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
