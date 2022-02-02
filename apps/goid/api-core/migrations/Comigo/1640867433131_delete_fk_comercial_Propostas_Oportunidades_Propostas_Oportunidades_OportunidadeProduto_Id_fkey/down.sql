alter table "comercial"."Propostas_Oportunidades"
  add constraint "Propostas_Oportunidades_OportunidadeProduto_Id_fkey"
  foreign key ("OportunidadeProduto_Id")
  references "comercial"."Produtos_Oportunidades"
  ("Id") on update restrict on delete restrict;
