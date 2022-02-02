alter table "clientes"."Veiculos"
  add constraint "Veiculos_Categoria_Id_fkey"
  foreign key ("Categoria_Id")
  references "public"."CategoriasDeVeiculos"
  ("Id") on update restrict on delete restrict;
