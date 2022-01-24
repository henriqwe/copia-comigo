alter table "comercial"."PrestadorDeServicos_Servicos"
  add constraint "PrestadorDeServicos_Servicos_Prestador_Id_fkey"
  foreign key ("Prestador_Id")
  references "identidades"."Fornecedores"
  ("Id") on update restrict on delete restrict;
