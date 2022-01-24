alter table "comercial"."Fornecedores_Servicos_Precos"
  add constraint "Fornecedores_Servicos_Precos_Fornecedor_Servico_Id_fkey"
  foreign key ("Fornecedor_Servico_Id")
  references "comercial"."Fornecedores_Servicos"
  ("Id") on update restrict on delete restrict;
