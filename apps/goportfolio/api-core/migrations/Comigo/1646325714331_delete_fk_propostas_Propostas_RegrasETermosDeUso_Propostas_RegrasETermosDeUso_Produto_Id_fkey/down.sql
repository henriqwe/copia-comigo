alter table "propostas"."Propostas_RegrasETermosDeUso"
  add constraint "Propostas_RegrasETermosDeUso_Produto_Id_fkey"
  foreign key ("Produto_RegraETermosDeUso_Id")
  references "comercial"."Produtos"
  ("Id") on update restrict on delete restrict;
