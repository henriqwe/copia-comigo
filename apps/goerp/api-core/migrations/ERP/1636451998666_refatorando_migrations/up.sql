
SET check_function_bodies = false;



CREATE TABLE "public"."UnidadesDeMedidas" ("Valor" Text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));


create schema "estoque";

CREATE TABLE "estoque"."Grupos" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Grupos_updated_at"
BEFORE UPDATE ON "estoque"."Grupos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Grupos_updated_at" ON "estoque"."Grupos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Grupos_deleted_at"
BEFORE UPDATE ON "estoque"."Grupos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Grupos_deleted_at" ON "estoque"."Grupos" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Grupos" add column "Nome" text
 not null;

alter table "estoque"."Grupos" add column "Descricao" text
 not null;

CREATE TABLE "estoque"."Fabricantes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Fabricantes_updated_at"
BEFORE UPDATE ON "estoque"."Fabricantes"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Fabricantes_updated_at" ON "estoque"."Fabricantes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Fabricantes_deleted_at"
BEFORE UPDATE ON "estoque"."Fabricantes"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Fabricantes_deleted_at" ON "estoque"."Fabricantes" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Grupos" rename column "id" to "Id";

INSERT INTO "public"."UnidadesDeMedidas"("Valor", "Comentario") VALUES (E'metro', E'Metro');


CREATE TABLE "estoque"."Familias" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Familias_updated_at"
BEFORE UPDATE ON "estoque"."Familias"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Familias_updated_at" ON "estoque"."Familias" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Familias_deleted_at"
BEFORE UPDATE ON "estoque"."Familias"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Familias_deleted_at" ON "estoque"."Familias" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Familias" add column "Pai_Id" uuid
 null;

CREATE TABLE "estoque"."Enderecamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, "Pai_Id" uuid, "Tipo_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Enderecamentos_updated_at"
BEFORE UPDATE ON "estoque"."Enderecamentos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Enderecamentos_updated_at" ON "estoque"."Enderecamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "estoque"."TiposDeEnderecamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_TiposDeEnderecamentos_updated_at"
BEFORE UPDATE ON "estoque"."TiposDeEnderecamentos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_TiposDeEnderecamentos_updated_at" ON "estoque"."TiposDeEnderecamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_TiposDeEnderecamentos_deleted_at"
BEFORE UPDATE ON "estoque"."TiposDeEnderecamentos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_TiposDeEnderecamentos_deleted_at" ON "estoque"."TiposDeEnderecamentos" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "estoque"."Itens" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz DEFAULT now(), "Classificacao" text NOT NULL, "Criticidade" text NOT NULL, "Grupo_Id" uuid NOT NULL, "Familia_Id" uuid NOT NULL, "Fabricante_Id" uuid NOT NULL, "Enderecamento_Id" uuid NOT NULL, "EstoqueMinimo" int4 NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Itens_updated_at"
BEFORE UPDATE ON "estoque"."Itens"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Itens_updated_at" ON "estoque"."Itens" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Itens_deleted_at"
BEFORE UPDATE ON "estoque"."Itens"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Itens_deleted_at" ON "estoque"."Itens" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "estoque"."PedidosDeSaida" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Situacao_Id" text NOT NULL, "SituacoesHistorico" jsonb NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_PedidosDeSaida_updated_at"
BEFORE UPDATE ON "estoque"."PedidosDeSaida"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_PedidosDeSaida_updated_at" ON "estoque"."PedidosDeSaida" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_PedidosDeSaida_deleted_at"
BEFORE UPDATE ON "estoque"."PedidosDeSaida"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_PedidosDeSaida_deleted_at" ON "estoque"."PedidosDeSaida" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "estoque"."Itens_PedidosDeSaida" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz DEFAULT now(), "Item_Id" uuid NOT NULL, "Pedido_Id" uuid NOT NULL, "QuantidadesHistorico" jsonb NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Itens_PedidosDeSaida_updated_at"
BEFORE UPDATE ON "estoque"."Itens_PedidosDeSaida"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Itens_PedidosDeSaida_updated_at" ON "estoque"."Itens_PedidosDeSaida" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Itens_PedidosDeSaida_deleted_at"
BEFORE UPDATE ON "estoque"."Itens_PedidosDeSaida"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Itens_PedidosDeSaida_deleted_at" ON "estoque"."Itens_PedidosDeSaida" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Itens_PedidosDeSaida" rename to "PedidosDeSaida_Itens";

alter table "estoque"."Itens"
  add constraint "Itens_Enderecamento_Id_fkey"
  foreign key ("Enderecamento_Id")
  references "estoque"."Enderecamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Enderecamentos" add constraint "Enderecamentos_Id_key" unique ("Id");

alter table "estoque"."Enderecamentos"
  add constraint "Enderecamentos_Pai_Id_fkey"
  foreign key ("Pai_Id")
  references "estoque"."Enderecamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Enderecamentos"
  add constraint "Enderecamentos_Tipo_Id_fkey"
  foreign key ("Tipo_Id")
  references "estoque"."TiposDeEnderecamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens"
  add constraint "Itens_Grupo_Id_fkey"
  foreign key ("Grupo_Id")
  references "estoque"."Grupos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens"
  add constraint "Itens_Familia_Id_fkey"
  foreign key ("Familia_Id")
  references "estoque"."Familias"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens"
  add constraint "Itens_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Familias"
  add constraint "Familias_Pai_Id_fkey"
  foreign key ("Pai_Id")
  references "estoque"."Familias"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Itens"
  add constraint "PedidosDeSaida_Itens_Pedido_Id_fkey"
  foreign key ("Pedido_Id")
  references "estoque"."PedidosDeSaida"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Itens"
  add constraint "PedidosDeSaida_Itens_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

CREATE TABLE "estoque"."PedidosDeSaida_Situacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "estoque"."PedidosDeSaida_Situacoes"("Valor", "Comentario") VALUES (E'aberto', E'Aberto');

alter table "estoque"."PedidosDeSaida"
  add constraint "PedidosDeSaida_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "estoque"."PedidosDeSaida_Situacoes"
  ("Valor") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Situacoes" rename to "PedidosDeSaidaSituacoes";

DROP TRIGGER "set_estoque_Grupos_deleted_at" ON "estoque"."Grupos";

DROP TRIGGER "set_estoque_Familias_deleted_at" ON "estoque"."Familias";

DROP TRIGGER "set_estoque_Fabricantes_deleted_at" ON "estoque"."Fabricantes";

DROP TRIGGER "set_estoque_Itens_deleted_at" ON "estoque"."Itens";

DROP TRIGGER "set_estoque_PedidosDeSaida_deleted_at" ON "estoque"."PedidosDeSaida";

DROP TRIGGER "set_estoque_Itens_PedidosDeSaida_deleted_at" ON "estoque"."PedidosDeSaida_Itens";

DROP TRIGGER "set_estoque_TiposDeEnderecamentos_deleted_at" ON "estoque"."TiposDeEnderecamentos";


create schema "compras";

CREATE TABLE "compras"."Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, "UnidadeDeMedida_Id" uuid NOT NULL, "Utilizacao" text NOT NULL, "NCM" integer NOT NULL, PRIMARY KEY ("Id") );
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_Produtos_updated_at"
BEFORE UPDATE ON "compras"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_Produtos_updated_at" ON "compras"."Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_Produtos_deleted_at"
BEFORE UPDATE ON "compras"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_compras_Produtos_deleted_at" ON "compras"."Produtos" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TRIGGER "set_compras_Produtos_deleted_at" ON "compras"."Produtos";

ALTER TABLE "estoque"."Itens" ALTER COLUMN "deleted_at" drop default;


alter table "estoque"."Itens" add column "Produto_Id" uuid
 not null;

alter table "estoque"."Itens"
  add constraint "Itens_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens" drop constraint "Itens_Produto_Id_fkey";

alter table "estoque"."Itens"
  add constraint "Itens_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

ALTER TABLE "compras"."Produtos" ALTER COLUMN "UnidadeDeMedida_Id" TYPE text;

alter table "compras"."Produtos" rename column "UnidadeDeMedida_Id" to "UnidadeDeMedida";

alter table "compras"."Produtos" rename column "UnidadeDeMedida" to "UnidadeDeMedida_Id";

CREATE TABLE "estoque"."Logs" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo" text NOT NULL, "Tipo_Id" uuid NOT NULL, "DadosAntigos" jsonb NOT NULL, "DadosNovos" jsonb NOT NULL, "Operacao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Logs_updated_at"
BEFORE UPDATE ON "estoque"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Logs_updated_at" ON "estoque"."Logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Logs_deleted_at"
BEFORE UPDATE ON "estoque"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_estoque_Logs_deleted_at" ON "estoque"."Logs" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "compras"."Logs" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo" text NOT NULL, "Tipo_Id" uuid NOT NULL, "DadosAntigos" jsonb NOT NULL, "DadosNovos" jsonb NOT NULL, "Operacao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_Logs_updated_at"
BEFORE UPDATE ON "compras"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_Logs_updated_at" ON "compras"."Logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_Logs_deleted_at"
BEFORE UPDATE ON "compras"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_compras_Logs_deleted_at" ON "compras"."Logs" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE "compras"."PedidosDeCompraSituacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'aberto', E'Aberto');

CREATE TABLE "compras"."PedidosDeCompra" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_updated_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_updated_at" ON "compras"."PedidosDeCompra" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_deleted_at" ON "compras"."PedidosDeCompra" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "compras"."PedidosDeCompra_Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_Produtos_updated_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Produtos_updated_at" ON "compras"."PedidosDeCompra_Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_Produtos_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Produtos_deleted_at" ON "compras"."PedidosDeCompra_Produtos" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TRIGGER "set_compras_PedidosDeCompra_Produtos_deleted_at" ON "compras"."PedidosDeCompra_Produtos";

DROP TRIGGER "set_compras_PedidosDeCompra_deleted_at" ON "compras"."PedidosDeCompra";

DROP TRIGGER "set_estoque_Logs_deleted_at" ON "estoque"."Logs";

alter table "compras"."PedidosDeCompra" add column "Situacao_Id" text
 not null;

alter table "compras"."PedidosDeCompra"
  add constraint "PedidosDeCompra_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "compras"."PedidosDeCompraSituacoes"
  ("Valor") on update restrict on delete restrict;


CREATE TABLE "compras"."PedidosDeCompra_Orcamento" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Pedido_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Pedido_Id") REFERENCES "compras"."PedidosDeCompra"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_Orcamento_updated_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Orcamento"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Orcamento_updated_at" ON "compras"."PedidosDeCompra_Orcamento" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_deleted_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."deleted_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_PedidosDeCompra_Orcamento_deleted_at"
BEFORE UPDATE ON "compras"."PedidosDeCompra_Orcamento"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_deleted_at"();
COMMENT ON TRIGGER "set_compras_PedidosDeCompra_Orcamento_deleted_at" ON "compras"."PedidosDeCompra_Orcamento" 
IS 'trigger to set value of column "deleted_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TRIGGER "set_compras_PedidosDeCompra_Orcamento_deleted_at" ON "compras"."PedidosDeCompra_Orcamento";

DROP TRIGGER "set_compras_Logs_deleted_at" ON "compras"."Logs";


alter table "compras"."PedidosDeCompra_Orcamento" rename to "PedidosDeCompra_Orcamentos";

CREATE TABLE "compras"."Orcamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Pedido_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "compras"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_compras_Orcamentos_updated_at"
BEFORE UPDATE ON "compras"."Orcamentos"
FOR EACH ROW
EXECUTE PROCEDURE "compras"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_compras_Orcamentos_updated_at" ON "compras"."Orcamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "compras"."PedidosDeCompra_Orcamentos" rename to "Orcamentos_Produtos";

alter table "compras"."Orcamentos_Produtos" rename column "Pedido_Id" to "Orcamento_Id";

alter table "compras"."Orcamentos" add column "Fornecedor_Id" uuid
 not null;


alter table "compras"."PedidosDeCompra" add column "DataAbertura" timestamptz
 not null;

alter table "compras"."PedidosDeCompra" add column "DataOrcamento" timestamptz
 null;

alter table "compras"."PedidosDeCompra" add column "DataAutorizacao" timestamptz
 null;

alter table "compras"."PedidosDeCompra" add column "DataCompra" timestamptz
 null;

alter table "compras"."PedidosDeCompra" add column "DataEntregue" timestamptz
 null;

alter table "compras"."PedidosDeCompra" add column "DataEntrada" timestamptz
 null;

alter table "compras"."PedidosDeCompra" add column "Solicitante" text
 not null;

alter table "compras"."PedidosDeCompra" add column "TipoPagamento" text
 null;

alter table "compras"."PedidosDeCompra" add column "MotivoRecusado" text
 null;

alter table "compras"."PedidosDeCompra_Produtos" add column "PedidoDeCompra_Id" uuid
 not null;

alter table "compras"."PedidosDeCompra_Produtos"
  add constraint "PedidosDeCompra_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "compras"."PedidosDeCompra_Produtos"
  add constraint "PedidosDeCompra_Produtos_PedidoDeCompra_Id_fkey"
  foreign key ("PedidoDeCompra_Id")
  references "compras"."PedidosDeCompra"
  ("Id") on update restrict on delete restrict;

alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadePedida" integer
 not null;

alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeAutorizada" integer
 null;

alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeEntregue" integer
 null;

alter table "compras"."PedidosDeCompra_Produtos" add column "Valor" float8
 not null;

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'autorizado', E'Autorizado');

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'comprado', E'Comprado');

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'entregue', E'Entregue');

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'finalizado', E'Finalizado');


alter table "compras"."PedidosDeCompra" drop column "Solicitante" cascade;

alter table "compras"."PedidosDeCompra" add column "Solicitante_Id" uuid
 not null;


alter table "compras"."PedidosDeCompra_Produtos" drop column "Valor" cascade;

alter table "compras"."PedidosDeCompra_Produtos" add column "Fabricante_Id" uuid
 not null;

alter table "compras"."PedidosDeCompra_Produtos"
  add constraint "PedidosDeCompra_Produtos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

alter table "compras"."PedidosDeCompra_Produtos" add constraint "PedidosDeCompra_Produtos_Id_key" unique ("Id");


alter table "compras"."Orcamentos_Produtos" add column "Quantidade" integer
 not null;

alter table "compras"."Orcamentos_Produtos" add column "ValorUnitario" float8
 not null;

alter table "compras"."Orcamentos"
  add constraint "Orcamentos_Pedido_Id_fkey"
  foreign key ("Pedido_Id")
  references "compras"."PedidosDeCompra"
  ("Id") on update restrict on delete restrict;

alter table "compras"."Orcamentos" add constraint "Orcamentos_Id_key" unique ("Id");

alter table "compras"."Orcamentos_Produtos" drop constraint "PedidosDeCompra_Orcamento_Pedido_Id_fkey",
  add constraint "Orcamentos_Produtos_Orcamento_Id_fkey"
  foreign key ("Orcamento_Id")
  references "compras"."Orcamentos"
  ("Id") on update restrict on delete restrict;


alter table "compras"."Orcamentos_Produtos" add column "PedidosDeCompra_Produto_Id" uuid
 not null;

alter table "compras"."Orcamentos_Produtos"
  add constraint "Orcamentos_Produtos_PedidosDeCompra_Produto_Id_fkey"
  foreign key ("PedidosDeCompra_Produto_Id")
  references "compras"."PedidosDeCompra_Produtos"
  ("Id") on update restrict on delete restrict;

alter table "compras"."Orcamentos_Produtos" add column "Fabricante_Id" uuid
 not null;

alter table "compras"."Orcamentos_Produtos"
  add constraint "Orcamentos_Produtos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

alter table "compras"."Orcamentos_Produtos" add constraint "Orcamentos_Produtos_Id_key" unique ("Id");

alter table "compras"."Orcamentos_Produtos" drop constraint "Orcamentos_Produtos_Fabricante_Id_fkey";

alter table "compras"."Orcamentos_Produtos" drop column "Fabricante_Id" cascade;

alter table "compras"."Orcamentos_Produtos" add column "Fabricante_Id" uuid
 not null;

alter table "compras"."Orcamentos" add column "Aprovado" boolean
 null default 'false';


INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'autorizado', E'Autorizado');

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'entregue', E'Entregue');

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'finalizado', E'Finalizado');

alter table "estoque"."PedidosDeSaida" drop column "SituacoesHistorico" cascade;

alter table "estoque"."PedidosDeSaida_Itens" drop column "QuantidadesHistorico" cascade;

alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadePedida" integer
 not null;

alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeAutorizada" integer
 null;

alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeEntregue" integer
 null;

alter table "estoque"."PedidosDeSaida" add column "DataAberto" timestamptz
 not null;

alter table "estoque"."PedidosDeSaida" add column "DataAutorizado" timestamptz
 null;

alter table "estoque"."PedidosDeSaida" add column "DataEntregue" timestamptz
 null;

alter table "estoque"."PedidosDeSaida" add column "DataSaida" timestamptz
 null;

alter table "estoque"."PedidosDeSaida" add column "Solicitante_Id" uuid
 not null;

alter table "estoque"."PedidosDeSaida" add column "MotivoRecusado" text
 null;

alter table "estoque"."PedidosDeSaida" add constraint "PedidosDeSaida_Id_key" unique ("Id");


ALTER TABLE "estoque"."PedidosDeSaida_Itens" ALTER COLUMN "deleted_at" drop default;

alter table "estoque"."PedidosDeSaida" rename column "DataAberto" to "DataAbertura";

alter table "estoque"."PedidosDeSaida" rename column "DataAutorizado" to "DataAutorizacao";

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'recusado', E'Recusado');


alter table "estoque"."PedidosDeSaida" add column "DataRecebido" timestamptz
 null;

alter table "estoque"."PedidosDeSaida_Itens" add column "QuantidadeRecebida" integer
 null;

alter table "estoque"."PedidosDeSaida" drop column "DataRecebido" cascade;

alter table "estoque"."PedidosDeSaida" rename column "DataSaida" to "DataRecebido";

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'recebido', E'Recebido');

CREATE TABLE "estoque"."Movimentacoes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Item_Id" uuid NOT NULL, "Data" timestamptz NOT NULL, "Tipo" text NOT NULL, "Quantidade" integer NOT NULL, "Valor" float8 NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Movimentacoes_updated_at"
BEFORE UPDATE ON "estoque"."Movimentacoes"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Movimentacoes_updated_at" ON "estoque"."Movimentacoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "compras"."PedidosDeCompra_Produtos" add column "QuantidadeComprada" integer
 null;

INSERT INTO "compras"."PedidosDeCompraSituacoes"("Valor", "Comentario") VALUES (E'recusado', E'Recusado');

alter table "compras"."Orcamentos_Produtos"
  add constraint "Orcamentos_Produtos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."PedidosDeSaida" add column "Fabricante_Id" uuid
 not null;

alter table "estoque"."PedidosDeSaida" drop column "Fabricante_Id" cascade;

alter table "estoque"."PedidosDeSaida_Itens" add column "Fabricante_Id" uuid
 not null;

alter table "estoque"."PedidosDeSaida_Itens" rename column "Item_Id" to "Produto_Id";

alter table "estoque"."PedidosDeSaida_Itens" rename to "PedidosDeSaida_Produtos";

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Itens_Item_Id_fkey",
  add constraint "PedidosDeSaida_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Produtos" drop constraint "PedidosDeSaida_Produtos_Produto_Id_fkey";

alter table "estoque"."PedidosDeSaida_Produtos"
  add constraint "PedidosDeSaida_Produtos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."PedidosDeSaida_Produtos" add constraint "PedidosDeSaida_Produtos_Id_key" unique ("Id");

alter table "estoque"."PedidosDeSaida_Produtos"
  add constraint "PedidosDeSaida_Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'parcial', E'Parcial');

INSERT INTO "estoque"."PedidosDeSaidaSituacoes"("Valor", "Comentario") VALUES (E'entradaParcial', E'Entrada parcial');

alter table "estoque"."PedidosDeSaida_Produtos" add column "Autorizado" boolean
 null default 'false';

alter table "compras"."PedidosDeCompra_Produtos" add column "Autorizado" boolean
 null default 'false';


CREATE TABLE "estoque"."Operadoras" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Apn" text NOT NULL, "Nome" text NOT NULL, "Usuario" text NOT NULL, "Senha" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Operadoras_updated_at"
BEFORE UPDATE ON "estoque"."Operadoras"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Operadoras_updated_at" ON "estoque"."Operadoras" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Operadoras" rename column "id" to "Id";

CREATE TABLE "estoque"."Chips" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" uuid, "Iccid" text NOT NULL, "NumeroDaLinha" int8 NOT NULL, "Operadora_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Operadora_Id") REFERENCES "estoque"."Operadoras"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Chips_updated_at"
BEFORE UPDATE ON "estoque"."Chips"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Chips_updated_at" ON "estoque"."Chips" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Chips" drop column "deleted_at" cascade;

alter table "estoque"."Chips" add column "deleted_at" timestamptz
 null;

alter table "estoque"."Chips" add constraint "Chips_NumeroDaLinha_key" unique ("NumeroDaLinha");

alter table "estoque"."Chips" add constraint "Chips_Iccid_key" unique ("Iccid");

alter table "estoque"."Operadoras" add constraint "Operadoras_Apn_key" unique ("Apn");

alter table "estoque"."Operadoras" add constraint "Operadoras_Nome_key" unique ("Nome");


CREATE TABLE "estoque"."Equipamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "NumeroDoDispositivo" int8 NOT NULL, "Firmware" text NOT NULL, "Fabricante_Id" uuid NOT NULL, "Imei" integer NOT NULL, "Modelo_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Equipamentos_updated_at"
BEFORE UPDATE ON "estoque"."Equipamentos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Equipamentos_updated_at" ON "estoque"."Equipamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "estoque"."ModelosDeEquipamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "Nome" text NOT NULL, "Fabricante_Id" uuid NOT NULL, "deleted_at" timestamptz, PRIMARY KEY ("Id") , FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_ModelosDeEquipamentos_updated_at"
BEFORE UPDATE ON "estoque"."ModelosDeEquipamentos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_ModelosDeEquipamentos_updated_at" ON "estoque"."ModelosDeEquipamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Equipamentos" add column "deleted_at" timestamptz
 null;

alter table "estoque"."Equipamentos"
  add constraint "Equipamentos_Modelo_Id_fkey"
  foreign key ("Modelo_Id")
  references "estoque"."ModelosDeEquipamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Equipamentos" add constraint "Equipamentos_Id_key" unique ("Id");

alter table "estoque"."ModelosDeEquipamentos" rename to "ModelosDeEquipamento";

alter table "estoque"."ModelosDeEquipamento" rename to "ModelosDeEquipamentos";


alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Modelo_Id_fkey";

DROP table "estoque"."ModelosDeEquipamentos";

alter table "estoque"."Equipamentos" drop constraint "Equipamentos_Fabricante_Id_fkey";

alter table "estoque"."Equipamentos" rename column "Modelo_Id" to "Item_Id";

alter table "estoque"."Equipamentos"
  add constraint "Equipamentos_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Equipamentos" add constraint "Equipamentos_NumeroDoDispositivo_key" unique ("NumeroDoDispositivo");

alter table "estoque"."Equipamentos" drop column "Fabricante_Id" cascade;

alter table "estoque"."Equipamentos" add constraint "Equipamentos_Imei_key" unique ("Imei");

CREATE TABLE "estoque"."Identificadores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "NumeroDoCodigo" integer NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"), UNIQUE ("NumeroDoCodigo"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Identificadores_updated_at"
BEFORE UPDATE ON "estoque"."Identificadores"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Identificadores_updated_at" ON "estoque"."Identificadores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Identificadores" add column "Item_Id" uuid
 not null;

alter table "estoque"."Identificadores"
  add constraint "Identificadores_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Identificadores" rename column "NumeroDoCodigo" to "CodigoDoIdentificador";

alter table "estoque"."Equipamentos" rename column "NumeroDoDispositivo" to "Codigo";

alter table "estoque"."Identificadores" rename column "CodigoDoIdentificador" to "Codigo";

alter table "estoque"."Identificadores" rename column "Codigo" to "CodigoIdentificador";

alter table "estoque"."Equipamentos" rename column "Codigo" to "CodigoIdentificador";

CREATE TABLE "estoque"."Configuracoes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "FamiliaChipsId" uuid NOT NULL, "FamiliaEquipamentosId" uuid NOT NULL, "FamiliaIdentificadoresId" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Configuracoes_updated_at"
BEFORE UPDATE ON "estoque"."Configuracoes"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Configuracoes_updated_at" ON "estoque"."Configuracoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;


CREATE TABLE "estoque"."Modelos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, "Produto_Id" uuid NOT NULL, "Fabricante_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Modelos_updated_at"
BEFORE UPDATE ON "estoque"."Modelos"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Modelos_updated_at" ON "estoque"."Modelos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Modelos"
  add constraint "Modelos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "compras"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Modelos"
  add constraint "Modelos_Fabricante_Id_fkey"
  foreign key ("Fabricante_Id")
  references "estoque"."Fabricantes"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."Itens" add column "Modelo_Id" uuid
 null;

alter table "estoque"."Itens"
  add constraint "Itens_Modelo_Id_fkey"
  foreign key ("Modelo_Id")
  references "estoque"."Modelos"
  ("Id") on update restrict on delete restrict;


alter table "compras"."PedidosDeCompra_Produtos" add column "Descricao" text
 null;

alter table "compras"."Orcamentos_Produtos" add column "Descricao" text
 null;

alter table "estoque"."PedidosDeSaida_Produtos" add column "Descricao" text
 null;


alter table "estoque"."Configuracoes" rename column "FamiliaChipsId" to "FamiliaChips_Id";

alter table "estoque"."Configuracoes" rename column "FamiliaEquipamentosId" to "FamiliaEquipamentos_Id";

alter table "estoque"."Configuracoes" rename column "FamiliaIdentificadoresId" to "FamiliaIdentificadores_Id";

alter table "estoque"."Configuracoes"
  add constraint "Configuracoes_FamiliaChips_Id_fkey"
  foreign key ("FamiliaChips_Id")
  references "estoque"."Chips"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes"
  add constraint "Configuracoes_FamiliaEquipamentos_Id_fkey"
  foreign key ("FamiliaEquipamentos_Id")
  references "estoque"."Equipamentos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes"
  add constraint "Configuracoes_FamiliaIdentificadores_Id_fkey"
  foreign key ("FamiliaIdentificadores_Id")
  references "estoque"."Identificadores"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaChips_Id_fkey",
  add constraint "Configuracoes_FamiliaChips_Id_fkey"
  foreign key ("FamiliaChips_Id")
  references "estoque"."Familias"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaEquipamentos_Id_fkey",
  add constraint "Configuracoes_FamiliaEquipamentos_Id_fkey"
  foreign key ("FamiliaEquipamentos_Id")
  references "estoque"."Familias"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes" drop constraint "Configuracoes_FamiliaIdentificadores_Id_fkey",
  add constraint "Configuracoes_FamiliaIdentificadores_Id_fkey"
  foreign key ("FamiliaIdentificadores_Id")
  references "estoque"."Familias"
  ("Id") on update restrict on delete restrict;



CREATE TABLE "estoque"."ChipsSituacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "estoque"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'inativo', E'Inativo');

INSERT INTO "estoque"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'ativo', E'Ativo');

INSERT INTO "estoque"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'suspenso', E'Suspenso');

INSERT INTO "estoque"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'cancelado', E'Cancelado');

alter table "estoque"."Chips" add column "Situacao_Id" uuid
 null;

ALTER TABLE "estoque"."Chips" ALTER COLUMN "Situacao_Id" TYPE text;

alter table "estoque"."Chips"
  add constraint "Chips_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "estoque"."ChipsSituacoes"
  ("Valor") on update restrict on delete restrict;

alter table "estoque"."Chips" alter column "Situacao_Id" set default 'inativo';

alter table "estoque"."Equipamentos" rename column "CodigoIdentificador" to "Identificador";

ALTER TABLE "estoque"."Equipamentos" ALTER COLUMN "Imei" TYPE int8;

alter table "estoque"."Chips" add column "TempoDeSuspensao" text
 null;

alter table "estoque"."Chips" rename column "TempoDeSuspensao" to "TempoDaSuspensao";

alter table "estoque"."Chips" add column "DataSuspensao" timestamptz
 null;


CREATE TABLE "estoque"."Rastreadores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "CodigoReferencia" serial NOT NULL, "Chip_Id" uuid NOT NULL, "Equipamento_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Chip_Id") REFERENCES "estoque"."Chips"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Equipamento_Id") REFERENCES "estoque"."Equipamentos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("CodigoReferencia"));
CREATE OR REPLACE FUNCTION "estoque"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_estoque_Rastreadores_updated_at"
BEFORE UPDATE ON "estoque"."Rastreadores"
FOR EACH ROW
EXECUTE PROCEDURE "estoque"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_estoque_Rastreadores_updated_at" ON "estoque"."Rastreadores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "estoque"."Rastreadores" add constraint "Rastreadores_Chip_Id_key" unique ("Chip_Id");

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Chip_Id_key";
alter table "estoque"."Rastreadores" add constraint "Rastreadores_Chip_Id_Equipamento_Id_key" unique ("Chip_Id", "Equipamento_Id");

alter table "estoque"."Rastreadores" add constraint "Rastreadores_Chip_Id_key" unique ("Chip_Id");

alter table "estoque"."Rastreadores" add constraint "Rastreadores_Equipamento_Id_key" unique ("Equipamento_Id");


alter table "estoque"."Movimentacoes" add column "Motivo_Id" text
 null;

CREATE TABLE "estoque"."MovimentacoesMotivos" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "estoque"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'pedidoDeCompra', E'Pedido de Compra');

INSERT INTO "estoque"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'criacaoDeRastreador', E'Criacao de Rastreador');

INSERT INTO "estoque"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'pedidoDeSaida', E'Pedido de Saida');

alter table "estoque"."Configuracoes" add column "ItemRastreadores_Id" uuid
 not null;


INSERT INTO "estoque"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'exclusaoDeRastreador', E'Exclusão de Rastreador');

alter table "estoque"."Chips" add column "Item_Id" uuid
 null;

alter table "estoque"."Chips"
  add constraint "Chips_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Configuracoes"
  add constraint "Configuracoes_ItemRastreadores_Id_fkey"
  foreign key ("ItemRastreadores_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;


alter table "estoque"."Rastreadores" add column "Item_Id" uuid
 null;

alter table "estoque"."Rastreadores" alter column "Item_Id" set not null;

alter table "estoque"."Rastreadores"
  add constraint "Rastreadores_Item_Id_fkey"
  foreign key ("Item_Id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

create schema "pedidosDeCompra";

CREATE TABLE "pedidosDeCompra"."Pedidos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Situacao_Id" text NOT NULL, "DataAbertura" timestamptz NOT NULL, "DataOrcamento" timestamptz, "DataAutorizacao" timestamptz, "DataCompra" timestamptz, "DataEntregue" timestamptz, "DataEntrada" timestamptz, "TipoPagamento" text, "MotivoRecusado" text, "Solicitante_Id" uuid NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeCompra"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeCompra_Pedidos_updated_at"
BEFORE UPDATE ON "pedidosDeCompra"."Pedidos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeCompra"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeCompra_Pedidos_updated_at" ON "pedidosDeCompra"."Pedidos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "pedidosDeCompra"."Situacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'aberto', E'Aberto');

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'autorizado', E'Autorizado');

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'comprado', E'Comprado');

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'recebido', E'Recebido');

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'finalizado', E'Finalizado');

INSERT INTO "pedidosDeCompra"."Situacoes"("Valor", "Comentario") VALUES (E'recusado', E'Recusado');

alter table "pedidosDeCompra"."Pedidos"
  add constraint "Pedidos_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "pedidosDeCompra"."Situacoes"
  ("Valor") on update restrict on delete restrict;

CREATE TABLE "pedidosDeCompra"."Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, "PedidoDeCompra_Id" uuid NOT NULL, "QuantidadePedida" integer NOT NULL, "QuantidadeAutorizada" integer, "QuantidadeEntregue" integer, "QuantidadeComprada" integer, "Fabricante_Id" uuid NOT NULL, "Autorizado" boolean NOT NULL DEFAULT false, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("PedidoDeCompra_Id") REFERENCES "pedidosDeCompra"."Pedidos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeCompra"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeCompra_Produtos_updated_at"
BEFORE UPDATE ON "pedidosDeCompra"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeCompra"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeCompra_Produtos_updated_at" ON "pedidosDeCompra"."Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "public"."Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Descricao" text NOT NULL, "UnidadeDeMedida_Id" text NOT NULL, "Utilizacao" text NOT NULL, "NCM" integer NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_Produtos_updated_at"
BEFORE UPDATE ON "public"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_Produtos_updated_at" ON "public"."Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "pedidosDeCompra"."Produtos"
  add constraint "Produtos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "public"."Produtos"
  ("Id") on update restrict on delete restrict;

CREATE TABLE "pedidosDeCompra"."Logs" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo" text NOT NULL, "Tipo_Id" uuid NOT NULL, "DadosAntigos" jsonb NOT NULL, "DadosNovos" jsonb NOT NULL, "Operacao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeCompra"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeCompra_Logs_updated_at"
BEFORE UPDATE ON "pedidosDeCompra"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeCompra"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeCompra_Logs_updated_at" ON "pedidosDeCompra"."Logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "pedidosDeCompra"."Orcamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Pedido_Id" uuid NOT NULL, "Fornecedor_Id" uuid NOT NULL, "Aprovado" boolean NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Pedido_Id") REFERENCES "pedidosDeCompra"."Pedidos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeCompra"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeCompra_Orcamentos_updated_at"
BEFORE UPDATE ON "pedidosDeCompra"."Orcamentos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeCompra"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeCompra_Orcamentos_updated_at" ON "pedidosDeCompra"."Orcamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "pedidosDeCompra"."Orcamentos_Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Orcamento_Id" uuid NOT NULL, "Quantidade" integer NOT NULL, "ValorUnitario" float8 NOT NULL, "PedidosDeCompra_Produto_Id" uuid NOT NULL, "Fabricante_Id" uuid NOT NULL, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Orcamento_Id") REFERENCES "pedidosDeCompra"."Orcamentos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("PedidosDeCompra_Produto_Id") REFERENCES "pedidosDeCompra"."Produtos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeCompra"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeCompra_Orcamentos_Produtos_updated_at"
BEFORE UPDATE ON "pedidosDeCompra"."Orcamentos_Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeCompra"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeCompra_Orcamentos_Produtos_updated_at" ON "pedidosDeCompra"."Orcamentos_Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP table "compras"."Orcamentos_Produtos";

DROP table "compras"."Orcamentos";

DROP table "compras"."PedidosDeCompra_Produtos";

DROP table "compras"."PedidosDeCompra";

DROP table "compras"."PedidosDeCompraSituacoes";

DROP table "compras"."Logs";

create schema "pedidosDeSaida";

CREATE TABLE "pedidosDeSaida"."Pedidos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Situacao_Id" text NOT NULL, "DataAbertura" timestamptz NOT NULL, "DataAutorizacao" timestamptz, "DataEntregue" timestamptz, "DataRecebido" timestamptz, "Solicitante_Id" uuid NOT NULL, "MotivoRecusado" text, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeSaida"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeSaida_Pedidos_updated_at"
BEFORE UPDATE ON "pedidosDeSaida"."Pedidos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeSaida"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeSaida_Pedidos_updated_at" ON "pedidosDeSaida"."Pedidos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "pedidosDeSaida"."Situacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'aberto', E'Aberto');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'autorizado', E'Autorizado');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'entregue', E'Entregue');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'finalizado', E'Finalizado');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'recusado', E'Recusado');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'recebido', E'Recebido');

INSERT INTO "pedidosDeSaida"."Situacoes"("Valor", "Comentario") VALUES (E'entradaParcial', E'Entrada parcial');

alter table "pedidosDeSaida"."Pedidos"
  add constraint "Pedidos_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "pedidosDeSaida"."Situacoes"
  ("Valor") on update restrict on delete restrict;

CREATE TABLE "pedidosDeSaida"."Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, "Pedido_Id" uuid NOT NULL, "QuantidadePedida" integer NOT NULL, "QuantidadeAutorizada" integer, "QuantidadeEntregue" integer, "QuantidadeRecebida" integer, "Fabricante_Id" uuid NOT NULL, "Autorizado" boolean NOT NULL DEFAULT false, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Pedido_Id") REFERENCES "pedidosDeSaida"."Pedidos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Produto_Id") REFERENCES "public"."Produtos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("Produto_Id"), UNIQUE ("Pedido_Id"), UNIQUE ("Fabricante_Id"));
CREATE OR REPLACE FUNCTION "pedidosDeSaida"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeSaida_Produtos_updated_at"
BEFORE UPDATE ON "pedidosDeSaida"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeSaida"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeSaida_Produtos_updated_at" ON "pedidosDeSaida"."Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "pedidosDeSaida"."Produtos" drop constraint "Produtos_Pedido_Id_fkey";

alter table "pedidosDeSaida"."Produtos"
  add constraint "Produtos_Pedido_Id_fkey"
  foreign key ("Pedido_Id")
  references "pedidosDeSaida"."Pedidos"
  ("Id") on update restrict on delete restrict;

alter table "pedidosDeSaida"."Pedidos" rename to "PedidosSaida";

alter table "pedidosDeSaida"."PedidosSaida" rename to "Pedidos";

alter table "pedidosDeSaida"."Produtos" drop constraint "Produtos_Pedido_Id_key";

DROP table "estoque"."PedidosDeSaida_Produtos";

alter table "estoque"."PedidosDeSaida" drop constraint "PedidosDeSaida_Situacao_Id_fkey";

DROP table "estoque"."PedidosDeSaidaSituacoes";

DROP table "estoque"."PedidosDeSaida";

CREATE TABLE "pedidosDeSaida"."Logs_pedidosDeSaida_Pedidos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo" text NOT NULL, "Tipo_Id" uuid NOT NULL, "DadosAntigos" jsonb NOT NULL, "DadosNovos" jsonb NOT NULL, "Operacao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeSaida"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeSaida_Logs_pedidosDeSaida_Pedidos_updated_at"
BEFORE UPDATE ON "pedidosDeSaida"."Logs_pedidosDeSaida_Pedidos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeSaida"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeSaida_Logs_pedidosDeSaida_Pedidos_updated_at" ON "pedidosDeSaida"."Logs_pedidosDeSaida_Pedidos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "pedidosDeSaida"."Logs_pedidosDeSaida_Pedidos" rename to "Logs";

CREATE TABLE "public"."Operadoras" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Apn" text NOT NULL, "Nome" text NOT NULL, "Usuario" text NOT NULL, "Senha" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"), UNIQUE ("Apn"), UNIQUE ("Nome"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_Operadoras_updated_at"
BEFORE UPDATE ON "public"."Operadoras"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_Operadoras_updated_at" ON "public"."Operadoras" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

create schema "producao";

CREATE TABLE "producao"."Chips" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Iccid" text NOT NULL, "NumeroDaLinha" int8 NOT NULL, "Operadora_Id" uuid NOT NULL, "Situacao_Id" text NOT NULL DEFAULT 'inativo', "TempoDaSuspensao" text, "DataSuspensao" timestamptz, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Operadora_Id") REFERENCES "public"."Operadoras"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("Iccid"), UNIQUE ("NumeroDaLinha"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_Chips_updated_at"
BEFORE UPDATE ON "producao"."Chips"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_Chips_updated_at" ON "producao"."Chips" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "producao"."ChipsSituacoes" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

INSERT INTO "producao"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'inativo', E'Inativo');

INSERT INTO "producao"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'ativo', E'Ativo');

INSERT INTO "producao"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'suspenso', E'Suspenso');

INSERT INTO "producao"."ChipsSituacoes"("Valor", "Comentario") VALUES (E'cancelado', E'Cancelado');

alter table "producao"."Chips"
  add constraint "Chips_Situacao_Id_fkey"
  foreign key ("Situacao_Id")
  references "producao"."ChipsSituacoes"
  ("Valor") on update restrict on delete restrict;

CREATE TABLE "producao"."Equipamentos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Identificador" int8 NOT NULL, "Firmware" text NOT NULL, "Imei" int8 NOT NULL, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("Identificador"), UNIQUE ("Imei"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_Equipamentos_updated_at"
BEFORE UPDATE ON "producao"."Equipamentos"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_Equipamentos_updated_at" ON "producao"."Equipamentos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "producao"."Identificadores" ("Id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "CodigoIdentificador" integer NOT NULL, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("CodigoIdentificador"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_Identificadores_updated_at"
BEFORE UPDATE ON "producao"."Identificadores"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_Identificadores_updated_at" ON "producao"."Identificadores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

DROP table "estoque"."Identificadores";

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Equipamento_Id_fkey";

DROP table "estoque"."Equipamentos";

alter table "estoque"."Chips" drop constraint "Chips_Situacao_Id_fkey";

alter table "estoque"."Chips" drop constraint "Chips_Item_Id_fkey";

alter table "estoque"."Chips" drop constraint "Chips_Operadora_Id_fkey";

DROP table "estoque"."Operadoras";

DROP table "estoque"."ChipsSituacoes";

alter table "estoque"."Rastreadores" drop constraint "Rastreadores_Chip_Id_fkey";

DROP table "estoque"."Chips";

CREATE TABLE "producao"."Rastreadores" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "CodigoReferencia" serial NOT NULL, "Chip_Id" uuid NOT NULL, "Equipamento_Id" uuid NOT NULL, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Chip_Id") REFERENCES "producao"."Chips"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Equipamento_Id") REFERENCES "producao"."Equipamentos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("CodigoReferencia"), UNIQUE ("Chip_Id"), UNIQUE ("Equipamento_Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_Rastreadores_updated_at"
BEFORE UPDATE ON "producao"."Rastreadores"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_Rastreadores_updated_at" ON "producao"."Rastreadores" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "producao"."Logs" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo" text NOT NULL, "Tipo_Id" uuid NOT NULL, "DadosAntigos" jsonb NOT NULL, "DadosNovos" jsonb NOT NULL, "Operacao" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_Logs_updated_at"
BEFORE UPDATE ON "producao"."Logs"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_Logs_updated_at" ON "producao"."Logs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP table "estoque"."Rastreadores";

create schema "movimentacoes";

CREATE TABLE "movimentacoes"."Movimentacoes" ("Id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Data" timestamptz NOT NULL, "Tipo" text NOT NULL, "Quantidade" integer NOT NULL, "Valor" float8 NOT NULL, "Item_Id" uuid NOT NULL, "Motivo_Id" text, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "movimentacoes"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_movimentacoes_Movimentacoes_updated_at"
BEFORE UPDATE ON "movimentacoes"."Movimentacoes"
FOR EACH ROW
EXECUTE PROCEDURE "movimentacoes"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_movimentacoes_Movimentacoes_updated_at" ON "movimentacoes"."Movimentacoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

CREATE TABLE "movimentacoes"."MovimentacoesMotivos" ("Valor" text NOT NULL, "Comentario" text NOT NULL, PRIMARY KEY ("Valor") , UNIQUE ("Valor"));

alter table "pedidosDeCompra"."Orcamentos_Produtos" alter column "Descricao" drop not null;

alter table "movimentacoes"."Movimentacoes"
  add constraint "Movimentacoes_Motivo_Id_fkey"
  foreign key ("Motivo_Id")
  references "movimentacoes"."MovimentacoesMotivos"
  ("Valor") on update restrict on delete restrict;

INSERT INTO "movimentacoes"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'pedidoDeCompra', E'Pedido de Compra');

INSERT INTO "movimentacoes"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'criacaoDeRastreador', E'Criação de Rastreador');

INSERT INTO "movimentacoes"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'pedidoDeSaida', E'Pedido de Saída');

INSERT INTO "movimentacoes"."MovimentacoesMotivos"("Valor", "Comentario") VALUES (E'exclusaoDeRastreador', E'Exclusão de Rastreador');

DROP table "estoque"."MovimentacoesMotivos";

DROP table "estoque"."Movimentacoes";

CREATE TABLE "public"."Configuracoes" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, "Slug" text NOT NULL, "Familia_Id" uuid NOT NULL, "Configuracao" jsonb NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Familia_Id") REFERENCES "estoque"."Familias"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"), UNIQUE ("Nome"), UNIQUE ("Slug"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_Configuracoes_updated_at"
BEFORE UPDATE ON "public"."Configuracoes"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_Configuracoes_updated_at" ON "public"."Configuracoes" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP table "estoque"."Configuracoes";

alter table "estoque"."Itens" drop constraint "Itens_Produto_Id_fkey";

alter table "estoque"."Modelos" drop constraint "Modelos_Produto_Id_fkey";

DROP table "compras"."Produtos";

drop schema "compras" cascade;

alter table "estoque"."Modelos"
  add constraint "Modelos_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "public"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "estoque"."Itens"
  add constraint "Itens_Produto_Id_fkey"
  foreign key ("Produto_Id")
  references "public"."Produtos"
  ("Id") on update restrict on delete restrict;

alter table "producao"."Rastreadores" drop constraint "Rastreadores_Chip_Id_key";

alter table "public"."Configuracoes" drop column "Familia_Id" cascade;

alter table "public"."Configuracoes" rename column "Configuracao" to "Valor";

alter table "movimentacoes"."Movimentacoes" alter column "Id" set default gen_random_uuid();

alter table "producao"."Identificadores" alter column "Id" set default gen_random_uuid();

alter table "movimentacoes"."MovimentacoesMotivos" rename to "Motivos";

BEGIN TRANSACTION;
ALTER TABLE "public"."Configuracoes" DROP CONSTRAINT "Configuracoes_pkey";

ALTER TABLE "public"."Configuracoes"
    ADD CONSTRAINT "Configuracoes_pkey" PRIMARY KEY ("Slug");
COMMIT TRANSACTION;

CREATE TABLE "producao"."TiposDeKitDeInsumo_estoque_Itens" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Quantidade" integer NOT NULL, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_TiposDeKitDeInsumo_estoque_Itens_updated_at"
BEFORE UPDATE ON "producao"."TiposDeKitDeInsumo_estoque_Itens"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_TiposDeKitDeInsumo_estoque_Itens_updated_at" ON "producao"."TiposDeKitDeInsumo_estoque_Itens" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "producao"."TiposDeKitDeInsumo" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Nome" text NOT NULL, PRIMARY KEY ("Id") , UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_TiposDeKitDeInsumo_updated_at"
BEFORE UPDATE ON "producao"."TiposDeKitDeInsumo"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_TiposDeKitDeInsumo_updated_at" ON "producao"."TiposDeKitDeInsumo" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "producao"."TiposDeKitDeInsumo_estoque_Itens" add column "TiposDeKitDeInsumo_Id" uuid
 not null;

alter table "producao"."TiposDeKitDeInsumo_estoque_Itens"
  add constraint "TiposDeKitDeInsumo_estoque_Itens_TiposDeKitDeInsumo_Id_fkey"
  foreign key ("TiposDeKitDeInsumo_Id")
  references "producao"."TiposDeKitDeInsumo"
  ("Id") on update restrict on delete restrict;

CREATE TABLE "producao"."KitDeInsumo_Itens" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Item_Id" uuid NOT NULL, "Quantidade" integer NOT NULL, "Lote" text NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_KitDeInsumo_Itens_updated_at"
BEFORE UPDATE ON "producao"."KitDeInsumo_Itens"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_KitDeInsumo_Itens_updated_at" ON "producao"."KitDeInsumo_Itens" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "producao"."KitsDeInsumo" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Tipo_Id" uuid NOT NULL, "CodigoReferencia" serial NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Tipo_Id") REFERENCES "producao"."TiposDeKitDeInsumo"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_KitsDeInsumo_updated_at"
BEFORE UPDATE ON "producao"."KitsDeInsumo"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_KitsDeInsumo_updated_at" ON "producao"."KitsDeInsumo" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "producao"."KitDeInsumo_Itens" add column "KitDeInsumo_Id" uuid
 not null;

alter table "producao"."KitDeInsumo_Itens"
  add constraint "KitDeInsumo_Itens_KitDeInsumo_Id_fkey"
  foreign key ("KitDeInsumo_Id")
  references "producao"."KitsDeInsumo"
  ("Id") on update restrict on delete restrict;

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'criacaoDeKitDeInsumo', E'Criação de Kit de Insumo');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'exclusaoDeKitDeInsumo', E'Exclusão de Kit de Insumo');

alter table "producao"."KitsDeInsumo" add column "Item_id" uuid
 not null;

alter table "producao"."KitsDeInsumo"
  add constraint "KitsDeInsumo_Item_id_fkey"
  foreign key ("Item_id")
  references "estoque"."Itens"
  ("Id") on update restrict on delete restrict;

alter table "producao"."KitsDeInsumo" rename column "Item_id" to "Item_Id";

alter table "pedidosDeSaida"."Produtos" drop constraint "Produtos_Fabricante_Id_key";

alter table "pedidosDeSaida"."Produtos" drop constraint "Produtos_Produto_Id_key";

CREATE TABLE "producao"."KitDeInstalacao" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "KitDeInsumo_Id" uuid NOT NULL, "Rastreador_Id" uuid NOT NULL, "Item_Id" uuid NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("KitDeInsumo_Id") REFERENCES "producao"."KitsDeInsumo"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Rastreador_Id") REFERENCES "producao"."Rastreadores"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Item_Id") REFERENCES "estoque"."Itens"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "producao"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_producao_KitDeInstalacao_updated_at"
BEFORE UPDATE ON "producao"."KitDeInstalacao"
FOR EACH ROW
EXECUTE PROCEDURE "producao"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_producao_KitDeInstalacao_updated_at" ON "producao"."KitDeInstalacao" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "producao"."KitDeInstalacao" add column "CodigoReferencia" serial
 not null;

alter table "producao"."KitDeInstalacao" rename to "KitsDeInstalacao";

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'devolucaoDeKitDeInsumo', E'Delovução de kit de insumo');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'criacaoDeKitDeInstalacao', E'Criação de kit de instalação');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'exclusaoDeKitDeInstalacao', E'Exclusão de kit de instalação');

DROP table "pedidosDeSaida"."Produtos";

CREATE TABLE "pedidosDeSaida"."Produtos" ("Id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "deleted_at" timestamptz, "Produto_Id" uuid NOT NULL, "Pedido_Id" uuid NOT NULL, "QuantidadePedida" integer NOT NULL, "QuantidadeAutorizada" integer, "QuantidadeEntregue" integer, "QuantidadeRecebida" integer, "Fabricante_Id" uuid NOT NULL, "Autorizado" boolean NOT NULL DEFAULT false, "Descricao" text NOT NULL, PRIMARY KEY ("Id") , FOREIGN KEY ("Fabricante_Id") REFERENCES "estoque"."Fabricantes"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Pedido_Id") REFERENCES "pedidosDeSaida"."Pedidos"("Id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("Produto_Id") REFERENCES "public"."Produtos"("Id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("Id"));
CREATE OR REPLACE FUNCTION "pedidosDeSaida"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_pedidosDeSaida_Produtos_updated_at"
BEFORE UPDATE ON "pedidosDeSaida"."Produtos"
FOR EACH ROW
EXECUTE PROCEDURE "pedidosDeSaida"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_pedidosDeSaida_Produtos_updated_at" ON "pedidosDeSaida"."Produtos" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "public"."UnidadesDeMedidas"("Valor", "Comentario") VALUES (E'unidade', E'Unidade');

INSERT INTO "public"."UnidadesDeMedidas"("Valor", "Comentario") VALUES (E'kilo', E'Kilo');

INSERT INTO "public"."UnidadesDeMedidas"("Valor", "Comentario") VALUES (E'grama', E'Grama');

INSERT INTO "public"."UnidadesDeMedidas"("Valor", "Comentario") VALUES (E'litro', E'Litro');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'criacaoDeChip', E'Criação de Chip');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'exclusaoDeChip', E'Exclusão de Chip');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'criacaoDeEquipamento', E'Criação de Equipamento');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'exclusaoDeEquipamento', E'Exclusão de Equipamento');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'criacaoDeIdentificador', E'Criação de Identificador');

INSERT INTO "movimentacoes"."Motivos"("Valor", "Comentario") VALUES (E'exclusaoDeIdentificador', E'Exclusão de Identificador');

alter table "pedidosDeSaida"."Produtos" alter column "Fabricante_Id" drop not null;

alter table "pedidosDeCompra"."Produtos" alter column "Fabricante_Id" drop not null;

alter table "pedidosDeCompra"."Orcamentos_Produtos" alter column "Fabricante_Id" drop not null;

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'3905c8a1-e8b5-4555-964b-c04371f5914b', E'2021-10-25T15:36:27.29513-03:00', E'2021-10-25T15:36:27.29513-03:00', null, E'Família para chips', E'familiaChips', '[]');

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'69e85641-4016-4fa7-8579-254eee380f64', E'2021-10-25T15:37:11.624339-03:00', E'2021-10-25T15:37:11.624339-03:00', null, E'Família para equipamentos', E'familiaEquipamentos', '[]');

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'a3561036-6402-4161-8722-dedee8605a15', E'2021-10-25T15:37:49.415307-03:00', E'2021-10-25T15:37:49.415307-03:00', null, E'Família para identificadores', E'familiaIdentificadores', '[]');

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'60bb5be4-9eae-447a-ad9d-a50ccc9727bf', E'2021-10-25T15:38:28.688537-03:00', E'2021-10-25T15:38:28.688537-03:00', null, E'Familia para rastreadores', E'familiaRastreadores', '[]');

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'8ec2c94e-d27d-4087-8012-65081064a9a9', E'2021-10-25T15:39:05.230668-03:00', E'2021-10-25T15:39:05.230668-03:00', null, E'Familia para kits de insumo', E'familiaKitsDeInsumo', '[]');

INSERT INTO "public"."Configuracoes"("Id", "created_at", "updated_at", "deleted_at", "Nome", "Slug", "Valor") VALUES (E'2a5e1360-1e46-49c2-b96e-ae523120bbfa', E'2021-10-25T15:39:36.184734-03:00', E'2021-10-25T15:39:36.184734-03:00', null, E'Familia para kits de instalação', E'familiaKitsDeInstalacao', '[]');

alter table "producao"."Equipamentos" drop column "Firmware" cascade;

alter table "estoque"."TiposDeEnderecamentos" add column "Slug" text
 null;

alter table "estoque"."TiposDeEnderecamentos" add column "CodigoReferencia" serial
 not null;

alter table "public"."Produtos" alter column "Descricao" drop not null;
