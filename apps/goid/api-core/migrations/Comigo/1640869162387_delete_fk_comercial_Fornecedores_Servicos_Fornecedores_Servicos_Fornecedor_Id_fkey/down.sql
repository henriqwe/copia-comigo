alter table "comercial"."Fornecedores_Servicos"
  add constraint "Fornecedores_Servicos_Fornecedor_Id_fkey"
  foreign key ("Fornecedor_Id")
  references "comercial"."Fornecedores"
  ("Id") on update restrict on delete restrict;
