alter table "comercial"."Servicos_Produtos"
  add constraint "Servicos_Produtos_Servico_Id_fkey"
  foreign key ("Servico_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
