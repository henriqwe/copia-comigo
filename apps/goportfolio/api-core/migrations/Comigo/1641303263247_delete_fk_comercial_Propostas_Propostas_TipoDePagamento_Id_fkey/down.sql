alter table "comercial"."Propostas"
  add constraint "Propostas_TipoDePagamento_Id_fkey"
  foreign key ("TipoDePagamento_Id")
  references "vendas"."TiposDePagamento"
  ("Valor") on update restrict on delete restrict;
