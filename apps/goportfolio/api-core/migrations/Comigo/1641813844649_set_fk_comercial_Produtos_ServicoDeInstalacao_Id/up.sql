alter table "comercial"."Produtos"
  add constraint "Produtos_ServicoDeInstalacao_Id_fkey"
  foreign key ("ServicoDeInstalacao_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
