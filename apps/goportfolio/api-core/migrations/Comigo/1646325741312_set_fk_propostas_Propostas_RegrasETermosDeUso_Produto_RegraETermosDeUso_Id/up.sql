alter table "propostas"."Propostas_RegrasETermosDeUso"
  add constraint "Propostas_RegrasETermosDeUso_Produto_RegraETermosDeUso_Id_fk"
  foreign key ("Produto_RegraETermosDeUso_Id")
  references "comercial"."Produtos_RegrasETermosDeUso"
  ("Id") on update restrict on delete restrict;
