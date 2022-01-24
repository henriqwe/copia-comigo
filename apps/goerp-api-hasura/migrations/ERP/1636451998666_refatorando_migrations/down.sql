
alter table "public"."Produtos" alter column "Descricao" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."TiposDeEnderecamentos" add column "CodigoReferencia" serial
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."TiposDeEnderecamentos" add column "Slug" text
--  null;

alter table "producao"."Equipamentos" alter column "Firmware" drop not null;
alter table "producao"."Equipamentos" add column "Firmware" text;

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'FamiliaKitsDeInstalacao';

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'FamiliaKitsDeInsumo';

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'FamiliaRastreadores';

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'familiaIdentificadores';

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'familiaEquipamentos';

DELETE FROM "public"."Configuracoes" WHERE "Slug" = 'familiaChips';

alter table "pedidosDeCompra"."Orcamentos_Produtos" alter column "Fabricante_Id" set not null;

alter table "pedidosDeCompra"."Produtos" alter column "Fabricante_Id" set not null;

alter table "pedidosDeSaida"."Produtos" alter column "Fabricante_Id" set not null;

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'exclusaoDeIdentificador';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'criacaoDeIdentificador';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'exclusãoDeEquipamento';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'criacaoDeEquipamento';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'exclusaoDeChip';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'criacaoDeChip';

DELETE FROM "public"."UnidadesDeMedidas" WHERE "Valor" = 'litro';

DELETE FROM "public"."UnidadesDeMedidas" WHERE "Valor" = 'grama';

DELETE FROM "public"."UnidadesDeMedidas" WHERE "Valor" = 'kilo';

DELETE FROM "public"."UnidadesDeMedidas" WHERE "Valor" = 'unidade';

DROP TABLE "pedidosDeSaida"."Produtos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "pedidosDeSaida"."Produtos";

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'exclusaoDeKitDeInstalacao';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'criacaoDeKitDeInstalacao';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'devolucaoDeKitDeInsumo';

alter table "producao"."KitsDeInstalacao" rename to "KitDeInstalacao";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "producao"."KitDeInstalacao" add column "CodigoReferencia" serial
--  not null;

DROP TABLE "producao"."KitDeInstalacao";

alter table "pedidosDeSaida"."Produtos"
    add constraint "Produtos_Produto_Id_key"
    primary key ("Produto_Id");

alter table "pedidosDeSaida"."Produtos" add constraint "Produtos_Fabricante_Id_key" unique ("Fabricante_Id");

alter table "producao"."KitsDeInsumo" rename column "Item_Id" to "Item_id";

alter table "producao"."KitsDeInsumo" drop constraint "KitsDeInsumo_Item_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "producao"."KitsDeInsumo" add column "Item_id" uuid
--  not null;

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'exclusãoDeKitDeInsumo';

DELETE FROM "movimentacoes"."Motivos" WHERE "Valor" = 'criacaoDeKitDeInsumo';

alter table "producao"."KitDeInsumo_Itens" drop constraint "KitDeInsumo_Itens_KitDeInsumo_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "producao"."KitDeInsumo_Itens" add column "KitDeInsumo_Id" uuid
--  not null;

DROP TABLE "producao"."KitsDeInsumo";

DROP TABLE "producao"."KitDeInsumo_Itens";

alter table "producao"."TiposDeKitDeInsumo_estoque_Itens" drop constraint "TiposDeKitDeInsumo_estoque_Itens_TiposDeKitDeInsumo_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "producao"."TiposDeKitDeInsumo_estoque_Itens" add column "TiposDeKitDeInsumo_Id" uuid
--  not null;

DROP TABLE "producao"."TiposDeKitDeInsumo";

DROP TABLE "producao"."TiposDeKitDeInsumo_estoque_Itens";

alter table "public"."Configuracoes" drop constraint "Configuracoes_pkey";
alter table "public"."Configuracoes"
    add constraint "Configuracoes_pkey"
    primary key ("Id");

alter table "movimentacoes"."Motivos" rename to "MovimentacoesMotivos";

ALTER TABLE "producao"."Identificadores" ALTER COLUMN "Id" drop default;

ALTER TABLE "movimentacoes"."Movimentacoes" ALTER COLUMN "Id" drop default;

alter table "public"."Configuracoes" rename column "Valor" to "Configuracao";

alter table "public"."Configuracoes"
  add constraint "Configuracoes_Familia_Id_fkey"
  foreign key (Familia_Id)
  references "estoque"."Familias"
  (Id) on update restrict on delete restrict;
alter table "public"."Configuracoes" alter column "Familia_Id" drop not null;
alter table "public"."Configuracoes" add column "Familia_Id" uuid;

alter table "producao"."Rastreadores"
    add constraint "Rastreadores_Chip_Id_key"
    primary key ("Chip_Id");

alter table "estoque"."Itens" drop constraint "Itens_Produto_Id_fkey";

alter table "estoque"."Modelos" drop constraint "Modelos_Produto_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- drop schema "compras" cascade;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."Produtos";

alter table "estoque"."Modelos" add constraint "Modelos_Produto_Id_key" unique ("Produto_Id");

alter table "estoque"."Itens"
  add constraint "Itens_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Configuracoes";

DROP TABLE "public"."Configuracoes";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Movimentacoes";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."MovimentacoesMotivos";

DELETE FROM "movimentacoes"."MovimentacoesMotivos" WHERE "Valor" = 'exclusaoDeRastreador';

DELETE FROM "movimentacoes"."MovimentacoesMotivos" WHERE "Valor" = 'pedidoDeSaida';

DELETE FROM "movimentacoes"."MovimentacoesMotivos" WHERE "Valor" = 'criacaoDeRastreador';

DELETE FROM "movimentacoes"."MovimentacoesMotivos" WHERE "Valor" = 'pedidoDeCompra';

alter table "movimentacoes"."Movimentacoes" drop constraint "Movimentacoes_Motivo_Id_fkey";

alter table "pedidosDeCompra"."Orcamentos_Produtos" alter column "Descricao" set not null;

DROP TABLE "movimentacoes"."MovimentacoesMotivos";

DROP TABLE "movimentacoes"."Movimentacoes";

drop schema "movimentacoes" cascade;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Rastreadores";

DROP TABLE "producao"."Logs";

DROP TABLE "producao"."Rastreadores";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Chips";

alter table "estoque"."Rastreadores"
  add constraint "Rastreadores_Chip_Id_fkey"
  foreign key ("Chip_Id")
  references "estoque"."Chips"
  ("Id") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."ChipsSituacoes";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Operadoras";

alter table "estoque"."Chips"
  add constraint "Chips_Operadora_Id_fkey"
  foreign key ("Operadora_Id")
  references "estoque"."Operadoras"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Chips"
  add constraint "Chips_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Chips"
  add constraint "Chips_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "estoque"."ChipsSituacoes"
  ("Valor") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Equipamentos";

alter table "estoque"."Rastreadores"
  add constraint "Rastreadores_Equipamento_Id_fkey"
  foreign key ("Equipamento_Id")
  references "estoque"."Equipamentos"
  ("Id") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."Identificadores";

DROP TABLE "producao"."Identificadores";

DROP TABLE "producao"."Equipamentos";

alter table "producao"."Chips" drop constraint "Chips_Situacao_Id_fkey";

DELETE FROM "producao"."ChipsSituacoes" WHERE "Valor" = 'cancelado';

DELETE FROM "producao"."ChipsSituacoes" WHERE "Valor" = 'suspenso';

DELETE FROM "producao"."ChipsSituacoes" WHERE "Valor" = 'ativo';

DELETE FROM "producao"."ChipsSituacoes" WHERE "Valor" = 'inativo';

DROP TABLE "producao"."ChipsSituacoes";

DROP TABLE "producao"."Chips";

drop schema "producao" cascade;

DROP TABLE "public"."Operadoras";

alter table "pedidosDeSaida"."Logs" rename to "Logs_pedidosDeSaida_Pedidos";

DROP TABLE "pedidosDeSaida"."Logs_pedidosDeSaida_Pedidos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."PedidosDeSaida";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."PedidosDeSaidaSituacoes";

alter table "estoque"."PedidosDeSaida"
  add constraint "PedidosDeSaida_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "estoque"."PedidosDeSaidaSituacoes"
  ("Valor") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."PedidosDeSaida_Produtos";

alter table "pedidosDeSaida"."Produtos" add constraint "Produtos_Pedido_Id_key" unique ("Pedido_Id");

alter table "pedidosDeSaida"."Pedidos" rename to "PedidosSaida";

alter table "pedidosDeSaida"."PedidosSaida" rename to "Pedidos";

alter table "pedidosDeSaida"."Produtos" drop constraint "Produtos_Pedido_Id_fkey";

alter table "pedidosDeSaida"."Produtos"
  add constraint "Produtos_Pedido_Id_fkey"
  foreign key ("Pedido_Id")
  references "pedidosDeSaida"."Pedidos"
  ("Id") on update restrict on delete restrict;

DROP TABLE "pedidosDeSaida"."Produtos";

alter table "pedidosDeSaida"."Pedidos" drop constraint "Pedidos_Situacao_Id_fkey";

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'entradaParcial';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'recebido';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'recusado';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'finalizado';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'entregue';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'autorizado';

DELETE FROM "pedidosDeSaida"."Situacoes" WHERE "Valor" = 'aberto';

DROP TABLE "pedidosDeSaida"."Situacoes";

DROP TABLE "pedidosDeSaida"."Pedidos";

drop schema "pedidosDeSaida" cascade;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."Logs";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."PedidosDeCompraSituacoes";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."PedidosDeCompra";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."PedidosDeCompra_Produtos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."Orcamentos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "compras"."Orcamentos_Produtos";

DROP TABLE "pedidosDeCompra"."Orcamentos_Produtos";

DROP TABLE "pedidosDeCompra"."Orcamentos";

DROP TABLE "pedidosDeCompra"."Logs";

alter table "pedidosDeCompra"."Produtos" drop constraint "Produtos_Produto_Id_fkey";

DROP TABLE "public"."Produtos";

DROP TABLE "pedidosDeCompra"."Produtos";

alter table "pedidosDeCompra"."Pedidos" drop constraint "Pedidos_Situacao_Id_fkey";

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'recusado';

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'finalizado';

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'entregue';

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'comprado';

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'autorizado';

DELETE FROM "pedidosDeCompra"."Situacoes" WHERE "Valor" = 'aberto';

DROP TABLE "pedidosDeCompra"."Situacoes";

DROP TABLE "pedidosDeCompra"."Pedidos";

drop schema "pedidosDeCompra" cascade;


alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Item_Id_fkey";

alter table "estoque"."Rastreadores" alter column "Item_Id" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Rastreadores" add column "Item_Id" uuid
--  null;


alter table "estoque"."Configuracoes" drop constraint "Configuracoes_ItemRastreadores_Id_fkey";

alter table "estoque"."Chips" drop constraint "Chips_Item_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Chips" add column "Item_Id" uuid
--  null;


DELETE FROM "estoque"."Configuracoes" WHERE "Id" = '75bcb360-9d89-4d86-b239-886981a0b986';

DELETE FROM "estoque"."MovimentacoesMotivos" WHERE "Valor" = 'exclusaoDeRastreador';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Configuracoes" add column "ItemRastreadores_Id" uuid
--  not null;


DELETE FROM "estoque"."MovimentacoesMotivos" WHERE "Valor" = 'pedidoDeSaida';

DELETE FROM "estoque"."MovimentacoesMotivos" WHERE "Valor" = 'criacaoDeRastreador';

DELETE FROM "estoque"."MovimentacoesMotivos" WHERE "Valor" = 'pedidoDeCompra';

DROP TABLE "estoque"."MovimentacoesMotivos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Movimentacoes" add column "Motivo_Id" text
--  null;


alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Equipamento_Id_key";

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Chip_Id_key";

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Chip_Id_Equipamento_Id_key";
alter table "estoque"."Rastreadores" add constraint "Rastreadores_Chip_Id_key" unique ("Chip_Id");

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Chip_Id_key";

DROP TABLE "estoque"."Rastreadores";


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Chips" add column "DataSuspensao" timestamptz
--  null;

alter table "estoque"."Chips" rename column "TempoDaSuspensao" to "TempoDeSuspensao";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Chips" add column "TempoDeSuspensao" text
--  null;

ALTER TABLE "estoque"."Equipamentos" ALTER COLUMN "Imei" TYPE integer;

alter table "estoque"."Equipamentos" rename column "Identificador" to "CodigoIdentificador";

ALTER TABLE "estoque"."Chips" ALTER COLUMN "Situacao_Id" drop default;


alter table "estoque"."Chips" drop constraint "Chips_Situacao_Id_fkey";

ALTER TABLE "estoque"."Chips" ALTER COLUMN "Situacao_Id" TYPE uuid;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Chips" add column "Situacao_Id" uuid
--  null;

DELETE FROM "estoque"."ChipsSituacoes" WHERE "Valor" = 'cancelado';

DELETE FROM "estoque"."ChipsSituacoes" WHERE "Valor" = 'suspenso';

DELETE FROM "estoque"."ChipsSituacoes" WHERE "Valor" = 'ativo';

DELETE FROM "estoque"."ChipsSituacoes" WHERE "Valor" = 'inativo';

DROP TABLE "estoque"."ChipsSituacoes";


alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaIdentificadores_Id_fkey",
  add constraint "Configuracoes_FamiliaIdentificadores_Id_fkey"
  foreign key ("FamiliaIdentificadores_Id")
  references "estoque"."Identificadores"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaEquipamentos_Id_fkey",
  add constraint "Configuracoes_FamiliaEquipamentos_Id_fkey"
  foreign key ("FamiliaEquipamentos_Id")
  references "estoque"."Equipamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaChips_Id_fkey",
  add constraint "Configuracoes_FamiliaChips_Id_fkey"
  foreign key ("FamiliaChips_Id")
  references "estoque"."Chips"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaIdentificadores_Id_fkey";

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaEquipamentos_Id_fkey";

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaChips_Id_fkey";

alter table "estoque"."Configuracoes" rename column "FamiliaIdentificadores_Id" to "FamiliaIdentificadoresId";

alter table "estoque"."Configuracoes" rename column "FamiliaEquipamentos_Id" to "FamiliaEquipamentosId";

alter table "estoque"."Configuracoes" rename column "FamiliaChips_Id" to "FamiliaChipsId";


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Produtos" add column "Descricao" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "Descricao" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "Descricao" text
--  null;


alter table "estoque"."Itens" drop constraint "Itens_Modelo_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Itens" add column "Modelo_Id" uuid
--  null;


alter table "estoque"."Modelos" drop constraint "Modelos_Fabricante_Id_fkey";

alter table "estoque"."Modelos" drop constraint "Modelos_Produto_Id_fkey";

DROP TABLE "estoque"."Modelos";

DROP TABLE "estoque"."Configuracoes";


alter table "estoque"."Equipamentos" rename column "CodigoIdentificador" to "Codigo";

alter table "estoque"."Identificadores" rename column "CodigoIdentificador" to "Codigo";

alter table "estoque"."Identificadores" rename column "Codigo" to "CodigoDoIdentificador";

alter table "estoque"."Equipamentos" rename column "Codigo" to "NumeroDoDispositivo";

alter table "estoque"."Identificadores" rename column "CodigoDoIdentificador" to "NumeroDoCodigo";

alter table "estoque"."Identificadores" drop constraint "Identificadores_Item_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Identificadores" add column "Item_Id" uuid
--  not null;

DROP TABLE "estoque"."Identificadores";



alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Imei_key";

alter table "estoque"."Equipamentos" alter column "Fabricante_Id" drop not null;
alter table "estoque"."Equipamentos" add column "Fabricante_Id" uuid;

alter table "estoque"."Equipamentos" drop constraint "Equipamentos_NumeroDoDispositivo_key";

alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Item_Id_fkey";

alter table "estoque"."Equipamentos" rename column "Item_Id" to "Modelo_Id";

alter table "estoque"."Equipamentos"
  add constraint "Equipamentos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "estoque"."ModelosDeEquipamentos";

alter table "estoque"."Equipamentos"
  add constraint "Equipamentos_Modelo_Id_fkey"
  foreign key ("Modelo_Id")
  references "estoque"."ModelosDeEquipamentos"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."ModelosDeEquipamentos" rename to "ModelosDeEquipamento";

alter table "estoque"."ModelosDeEquipamento" rename to "ModelosDeEquipamentos";

alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Id_key";

alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Modelo_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Equipamentos" add column "deleted_at" timestamptz
--  null;

DROP TABLE "estoque"."ModelosDeEquipamentos";

DROP TABLE "estoque"."Equipamentos";

alter table "estoque"."Operadoras" drop constraint "Operadoras_Nome_key";

alter table "estoque"."Operadoras" drop constraint "Operadoras_Apn_key";

alter table "estoque"."Chips" drop constraint "Chips_Iccid_key";

alter table "estoque"."Chips" drop constraint "Chips_NumeroDaLinha_key";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Chips" add column "deleted_at" timestamptz
--  null;

alter table "estoque"."Chips" alter column "deleted_at" drop not null;
alter table "estoque"."Chips" add column "deleted_at" uuid;

DROP TABLE "estoque"."Chips";


alter table "estoque"."Operadoras" rename column "Id" to "id";

DROP TABLE "estoque"."Operadoras";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "Autorizado" boolean
--  null default 'false';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Produtos" add column "Autorizado" boolean
--  null default 'false';

DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'entradaParcial';


DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'parcial';

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Produtos_Produto_Id_fkey";

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Produtos_Id_key";

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Produtos_Fabricante_Id_fkey";

alter table "estoque"."PedidosDeSaida_Produtos"
  add constraint "PedidosDeSaida_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Produtos_Produto_Id_fkey",
  add constraint "PedidosDeSaida_Itens_Item_Id_fkey"
  foreign key ("Produto_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Produtos" rename to "PedidosDeSaida_Itens";

alter table "estoque"."PedidosDeSaida_Itens" rename column "Produto_Id" to "Item_Id";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Itens" add column "Fabricante_Id" uuid
--  not null;

alter table "estoque"."PedidosDeSaida" alter column "Fabricante_Id" drop not null;
alter table "estoque"."PedidosDeSaida" add column "Fabricante_Id" uuid;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "Fabricante_Id" uuid
--  not null;

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_Fabricante_Id_fkey";

DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'recusado';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeComprada" integer
--  null;


DROP TABLE "estoque"."Movimentacoes";

DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'recebido';

alter table "estoque"."PedidosDeSaida" rename column "DataRecebido" to "DataSaida";

alter table "estoque"."PedidosDeSaida" alter column "DataRecebido" drop not null;
alter table "estoque"."PedidosDeSaida" add column "DataRecebido" timestamptz;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeRecebida" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "DataRecebido" timestamptz
--  null;


DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'recusado';

alter table "estoque"."PedidosDeSaida" rename column "DataAutorizacao" to "DataAutorizado";

alter table "estoque"."PedidosDeSaida" rename column "DataAbertura" to "DataAberto";

alter table "estoque"."PedidosDeSaida_Itens" alter column "deleted_at" set default now();


alter table "estoque"."PedidosDeSaida" drop constraint "PedidosDeSaida_Id_key";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "MotivoRecusado" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "Solicitante_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "DataSaida" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "DataEntregue" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "DataAutorizado" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida" add column "DataAberto" timestamptz
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeEntregue" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeAutorizada" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadePedida" integer
--  not null;

alter table "estoque"."PedidosDeSaida_Itens" alter column "QuantidadesHistorico" drop not null;
alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadesHistorico" jsonb;

alter table "estoque"."PedidosDeSaida" alter column "SituacoesHistorico" drop not null;
alter table "estoque"."PedidosDeSaida" add column "SituacoesHistorico" jsonb;

DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'finalizado';

DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'entregue';

DELETE FROM "estoque"."PedidosDeSaidaSituacoes" WHERE "Valor" = 'autorizado';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos" add column "Aprovado" boolean
--  null default 'false';


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "Fabricante_Id" uuid
--  not null;

alter table "compras"."Orcamentos_Produtos" alter column "Fabricante_Id" drop not null;
alter table "compras"."Orcamentos_Produtos" add column "Fabricante_Id" uuid;

alter table "compras"."Orcamentos_Produtos"
  add constraint "Orcamentos_Produtos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_Id_key";

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_Fabricante_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "Fabricante_Id" uuid
--  not null;

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_PedidosDeCompra_Produto_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "PedidosDeCompra_Produto_Id" uuid
--  not null;

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_Orcamento_Id_fkey",
  add constraint "PedidosDeCompra_Orcamento_Pedido_Id_fkey"
  foreign key ("Orcamento_Id")
  references "compras"."PedidosDeCompra"
  ("Id") on update restrict on delete restrict;


alter table "compras"."Orcamentos" drop constraint "Orcamentos_Id_key";

alter table "compras"."Orcamentos" drop constraint "Orcamentos_Pedido_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "ValorUnitario" float8
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos_Produtos" add column "Quantidade" integer
--  not null;


alter table "compras"."PedidosDeCompra_Produtos" drop constraint "PedidosDeCompra_Produtos_Id_key";

alter table "compras"."PedidosDeCompra_Produtos" drop constraint "PedidosDeCompra_Produtos_Fabricante_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "Fabricante_Id" uuid
--  not null;

alter table "compras"."PedidosDeCompra_Produtos" alter column "Valor" drop not null;
alter table "compras"."PedidosDeCompra_Produtos" add column "Valor" float8;



-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "Solicitante_Id" uuid
--  not null;

alter table "compras"."PedidosDeCompra" alter column "Solicitante" drop not null;
alter table "compras"."PedidosDeCompra" add column "Solicitante" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "Solicitante_Id" uuid
--  not null;

alter table "compras"."PedidosDeCompra" alter column "Solicitante" drop not null;
alter table "compras"."PedidosDeCompra" add column "Solicitante" text;


DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'finalizado';

DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'entregue';

DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'comprado';

DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'autorizado';

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "Valor" float8
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeEntregue" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeAutorizada" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadePedida" integer
--  not null;

alter table "compras"."PedidosDeCompra_Produtos" drop constraint "PedidosDeCompra_Produtos_PedidoDeCompra_Id_fkey";

alter table "compras"."PedidosDeCompra_Produtos" drop constraint "PedidosDeCompra_Produtos_Produto_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra_Produtos" add column "PedidoDeCompra_Id" uuid
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "MotivoRecusado" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "TipoPagamento" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "Solicitante" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataEntrada" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataEntregue" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataCompra" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataAutorizacao" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataOrcamento" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "DataAbertura" timestamptz
--  not null;


-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."Orcamentos" add column "Fornecedor_Id" uuid
--  not null;

alter table "compras"."Orcamentos_Produtos" rename column "Orcamento_Id" to "Pedido_Id";

alter table "compras"."Orcamentos_Produtos" rename to "PedidosDeCompra_Orcamentos";

DROP TABLE "compras"."Orcamentos";

alter table "compras"."PedidosDeCompra_Orcamentos" rename to "PedidosDeCompra_Orcamento";


CREATE TRIGGER "set_compras_Logs_deleted_at"
BEFORE UPDATE ON "compras"."Logs"
FOR EACH ROW EXECUTE FUNCTION compras.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_compras_Logs_deleted_at" ON "compras"."Logs"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_compras_PedidosDeCompra_Orcamento_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Orcamento"
FOR EACH ROW EXECUTE FUNCTION compras.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Orcamento_deleted_at" ON "compras"."PedidosDeCompra_Orcamento"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

DROP TABLE "compras"."PedidosDeCompra_Orcamento";


alter table "compras"."PedidosDeCompra" drop constraint "PedidosDeCompra_Situacao_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "compras"."PedidosDeCompra" add column "Situacao_Id" text
--  not null;

CREATE TRIGGER "set_estoque_Logs_deleted_at"
BEFORE UPDATE ON "estoque"."Logs"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Logs_deleted_at" ON "estoque"."Logs"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_compras_PedidosDeCompra_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra"
FOR EACH ROW EXECUTE FUNCTION compras.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_compras_PedidosDeCompra_deleted_at" ON "compras"."PedidosDeCompra"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_compras_PedidosDeCompra_Produtos_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Produtos"
FOR EACH ROW EXECUTE FUNCTION compras.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Produtos_deleted_at" ON "compras"."PedidosDeCompra_Produtos"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

DROP TABLE "compras"."PedidosDeCompra_Produtos";

DROP TABLE "compras"."PedidosDeCompra";

DELETE FROM "compras"."PedidosDeCompraSituacoes" WHERE "Valor" = 'aberto';

DROP TABLE "compras"."PedidosDeCompraSituacoes";

DROP TABLE "compras"."Logs";

DROP TABLE "estoque"."Logs";


alter table "compras"."Produtos" rename column "UnidadeDeMedida_Id" to "UnidadeDeMedida";

alter table "compras"."Produtos" rename column "UnidadeDeMedida" to "UnidadeDeMedida_Id";

ALTER TABLE "compras"."Produtos" ALTER COLUMN "UnidadeDeMedida_Id" TYPE uuid;

alter table "estoque"."Itens" drop constraint "Itens_Produto_Id_fkey";

alter table "estoque"."Itens"
  add constraint "Itens_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens" drop constraint "Itens_Produto_Id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Itens" add column "Produto_Id" uuid
--  not null;

alter table "estoque"."Itens" alter column "deleted_at" set default now();


CREATE TRIGGER "set_compras_Produtos_deleted_at"
BEFORE UPDATE ON "compras"."Produtos"
FOR EACH ROW EXECUTE FUNCTION compras.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_compras_Produtos_deleted_at" ON "compras"."Produtos"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

DROP TABLE "compras"."Produtos";

drop schema "compras" cascade;

CREATE TRIGGER "set_estoque_TiposDeEnderecamentos_deleted_at"
BEFORE UPDATE ON "estoque"."TiposDeEnderecamentos"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_TiposDeEnderecamentos_deleted_at" ON "estoque"."TiposDeEnderecamentos"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_Itens_PedidosDeSaida_deleted_at"
BEFORE UPDATE ON "estoque"."PedidosDeSaida_Itens"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Itens_PedidosDeSaida_deleted_at" ON "estoque"."PedidosDeSaida_Itens"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_PedidosDeSaida_deleted_at"
BEFORE UPDATE ON "estoque"."PedidosDeSaida"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_PedidosDeSaida_deleted_at" ON "estoque"."PedidosDeSaida"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_Itens_deleted_at"
BEFORE UPDATE ON "estoque"."Itens"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Itens_deleted_at" ON "estoque"."Itens"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_Fabricantes_deleted_at"
BEFORE UPDATE ON "estoque"."Fabricantes"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Fabricantes_deleted_at" ON "estoque"."Fabricantes"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_Familias_deleted_at"
BEFORE UPDATE ON "estoque"."Familias"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Familias_deleted_at" ON "estoque"."Familias"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';

CREATE TRIGGER "set_estoque_Grupos_deleted_at"
BEFORE UPDATE ON "estoque"."Grupos"
FOR EACH ROW EXECUTE FUNCTION estoque.set_current_timestamp_deleted_at();COMMENT ON TRIGGER "set_estoque_Grupos_deleted_at" ON "estoque"."Grupos"
IS E'trigger to set value of column "deleted_at" to current timestamp on row update';


alter table "estoque"."PedidosDeSaidaSituacoes" rename to "PedidosDeSaida_Situacoes";

alter table "estoque"."PedidosDeSaida" drop constraint "PedidosDeSaida_Situacao_Id_fkey";

DELETE FROM "estoque"."PedidosDeSaida_Situacoes" WHERE "Valor" = 'aberto';

DROP TABLE "estoque"."PedidosDeSaida_Situacoes";

alter table "estoque"."PedidosDeSaida_Itens" drop constraint "PedidosDeSaida_Itens_Item_Id_fkey";

alter table "estoque"."PedidosDeSaida_Itens" drop constraint "PedidosDeSaida_Itens_Pedido_Id_fkey";

alter table "estoque"."Familias" drop constraint "Familias_Pai_Id_fkey";

alter table "estoque"."Itens" drop constraint "Itens_Fabricante_Id_fkey";

alter table "estoque"."Itens" drop constraint "Itens_Familia_Id_fkey";

alter table "estoque"."Itens" drop constraint "Itens_Grupo_Id_fkey";

alter table "estoque"."Enderecamentos" drop constraint "Enderecamentos_Tipo_Id_fkey";

alter table "estoque"."Enderecamentos" drop constraint "Enderecamentos_Pai_Id_fkey";

alter table "estoque"."Enderecamentos" drop constraint "Enderecamentos_Id_key";

alter table "estoque"."Itens" drop constraint "Itens_Enderecamento_Id_fkey";

alter table "estoque"."PedidosDeSaida_Itens" rename to "Itens_PedidosDeSaida";

DROP TABLE "estoque"."Itens_PedidosDeSaida";

DROP TABLE "estoque"."PedidosDeSaida";

DROP TABLE "estoque"."Itens";

DROP TABLE "estoque"."TiposDeEnderecamentos";

DROP TABLE "estoque"."Enderecamentos";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Familias" add column "Pai_Id" uuid
--  null;

DROP TABLE "estoque"."Familias";

DELETE FROM "public"."UnidadesDeMedidas" WHERE "Valor" = 'metro';


alter table "estoque"."Grupos" rename column "Id" to "id";

DROP TABLE "estoque"."Fabricantes";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Grupos" add column "Descricao" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "estoque"."Grupos" add column "Nome" text
--  not null;

DROP TABLE "estoque"."Grupos";

drop schema "estoque" cascade;

DROP TABLE "public"."UnidadesDeMedidas";
