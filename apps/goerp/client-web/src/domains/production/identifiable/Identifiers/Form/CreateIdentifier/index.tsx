import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&erp/domains/routes';

import * as common from '@comigo/ui-common';

import * as identifiers from '&erp/domains/production/identifiable/Identifiers';
import { useState, useEffect } from 'react';
import * as utils from '@comigo/utils';

type itens = {
  Id: string;
  Produto: {
    Id: string;
    Nome: string;
  };
  Fabricante: {
    Id: string;
    Nome: string;
  };
  Modelo?: {
    Id: string;
    Nome: string;
  };
  Grupo: {
    Nome: string;
  };
  Familia: { Nome: string };
};

export const Create = () => {
  const [identifiersGroup, setIdentifiersGroup] = useState<number[]>([1]);
  const [lastNumber, setLastNumber] = useState(0);
  const [manufacturer, setManufacturer] = useState();
  const [amount, setAmount] = useState<number>();
  const [itensPerFamily, setItensPerFamily] = useState<itens[]>([]);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const {
    createIdentifierLoading,
    createIdentifier,
    getItemAmount,
    getItemByFamily,
    configData,
  } = identifiers.useCreate();
  const { control, handleSubmit, watch, register } = useForm();

  async function onSubmit(data: any) {
    try {
      const filteredIdentifiersGroup = identifiersGroup.filter(
        (identifier) => identifier !== 0
      );
      const identifiersValues = filteredIdentifiersGroup.map(
        (identificador) => {
          if (!data['CodigoIdentificador' + identificador]) {
            return;
          }

          return {
            CodigoIdentificador: data['CodigoIdentificador' + identificador],
            Item_Id: data.Item_Id.key.Id,
          };
        }
      );

      if (identifiersValues.includes(undefined)) {
        throw new Error('Preencha todos os campos para continuar');
      }

      await createIdentifier({
        variables: {
          data: identifiersValues,
          Item_Id: data.Item_Id.key.Id,
          Quantidade: identifiersValues.length,
        },
      }).then(() => {
        router.push(rotas.producao.identificaveis.identificadores.index);
        const frase =
          identifiersValues.length > 1
            ? 'Identificadores criados com sucesso'
            : 'Identificador criado com sucesso';
        utils.notification(frase, 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  useEffect(() => {
    getItemByFamily().then((itens) => {
      setItensPerFamily(itens);
    });
  }, [getItemByFamily]);

  useEffect(() => {
    if (watch('Item_Id') !== undefined) {
      getItemAmount(watch('Item_Id').key.Id).then((quantidadeDisponivel) => {
        if (quantidadeDisponivel <= 0) {
          setAmount(0);
          setIdentifiersGroup([1]);
          return;
        }
        setAmount(quantidadeDisponivel);
      });
    }
  }, [getItemAmount, watch('Item_Id')]);

  function disableMainButton() {
    return (
      watch('Item_Id') === undefined || createIdentifierLoading || amount === 0
    );
  }

  useEffect(() => {
    if (identifiersGroup[identifiersGroup.length - 1] > lastNumber) {
      setLastNumber(identifiersGroup[identifiersGroup.length - 1]);
    }
  }, [identifiersGroup, lastNumber]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Item pertencente"
        subtitle="Selecione o item que os chips pertencem"
        className="px-6"
      />

      <common.Separator />
      <form>
        <common.form.FormLine position={1} grid={!configData?.Valor[0] ? 1 : 2}>
          {!configData?.Valor[0] ? (
            <common.ConfigMessage rotas={rotas}>
              Selecione a fam??lia de itens para identificadores em configura????es
              primeiro
            </common.ConfigMessage>
          ) : (
            <Controller
              name="Item_Id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
                    itens={
                      itensPerFamily
                        ? itensPerFamily.map((item) => {
                            return {
                              key: item,
                              title:
                                item.Produto.Nome +
                                ' - ' +
                                item.Fabricante.Nome +
                                ' - ' +
                                item.Modelo?.Nome +
                                ' - ' +
                                item.Grupo.Nome +
                                ' - ' +
                                item.Familia.Nome,
                            };
                          })
                        : []
                    }
                    value={value}
                    onChange={(e) => {
                      setManufacturer(e.key.Fabricante.Nome);
                      onChange(e);
                    }}
                    label="Item"
                  />
                  <common.OpenModalLink
                    onClick={() => router.push(rotas.estoque.index)}
                  >
                    Cadastrar item
                  </common.OpenModalLink>
                </div>
              )}
            />
          )}

          {amount ? (
            <div className="grid grid-cols-3">
              <p className="m-auto text-center text-md">
                Saldo do item no estoque: {amount}
              </p>
              <p className="m-auto text-center text-md">
                Fabricante: {manufacturer}
              </p>
              <p className="m-auto text-center text-md">Tipo: RFID</p>
            </div>
          ) : (
            ''
          )}
        </common.form.FormLine>
        <common.Separator />
        {amount === undefined ? (
          <div />
        ) : amount === 0 ? (
          <div className="flex items-center justify-center my-8">
            <p className="text-xl">Sem identificadores no estoque</p>
          </div>
        ) : (
          <>
            <common.GenericTitle
              title="Dados dos identificadores"
              subtitle="C??digo identificador"
              className="px-6"
            />
            <common.Separator />
            {identifiersGroup.map(
              (identifier, index) =>
                identifier !== 0 && (
                  <common.form.FormLine position={index} grid={7} key={index}>
                    <div className="col-span-2">
                      <common.form.Input
                        fieldName={'CodigoIdentificador' + identifier}
                        register={register}
                        title="C??digo identificador"
                        data-testid="inserirCodigoIdentificador"
                      />
                    </div>

                    {identifier !== 1 && (
                      <common.buttons.DeleteButton
                        onClick={() => {
                          identifiersGroup[index] = 0;
                          setReload(!reload);
                        }}
                      />
                    )}
                  </common.form.FormLine>
                )
            )}

            {!createIdentifierLoading && identifiersGroup.length < amount && (
              <common.AddForm
                array={identifiersGroup}
                setArray={setIdentifiersGroup}
                lastNumber={lastNumber}
              >
                Adicionar outro identificador
              </common.AddForm>
            )}
          </>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={disableMainButton()}
          onClick={handleSubmit(onSubmit)}
          loading={createIdentifierLoading}
        />
      </div>
    </common.Card>
  );
};
