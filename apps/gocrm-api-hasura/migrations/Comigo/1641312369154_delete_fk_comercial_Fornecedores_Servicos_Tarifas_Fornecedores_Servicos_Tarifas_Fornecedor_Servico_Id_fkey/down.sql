alter table "comercial"."Fornecedores_Servicos_Tarifas"
  add constraint "Fornecedores_Servicos_Tarifas_Fornecedor_Servico_Id_fkey"
  foreign key ("Fornecedor_Servico_Id")
  references "comercial"."Fornecedores_Servicos"
  ("Id") on update restrict on delete restrict;
