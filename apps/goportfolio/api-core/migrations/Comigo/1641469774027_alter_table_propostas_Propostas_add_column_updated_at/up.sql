alter table "propostas"."Propostas" add column "updated_at" timestamptz
 not null default now();

CREATE OR REPLACE FUNCTION "propostas"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_propostas_Propostas_updated_at"
BEFORE UPDATE ON "propostas"."Propostas"
FOR EACH ROW
EXECUTE PROCEDURE "propostas"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_propostas_Propostas_updated_at" ON "propostas"."Propostas" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
