alter table "comercial"."Produtos"
  add constraint "Produtos_ServicoDeDesinstalacao_Id_fkey"
  foreign key ("ServicoDeDesinstalacao_Id")
  references "comercial"."Servicos"
  ("Id") on update restrict on delete restrict;
