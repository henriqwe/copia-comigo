import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';

import rotas from '&crm/domains/routes';

import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as operators from '&crm/domains/production/identifiable/Chips/Operators';
import * as chips from '&crm/domains/production/identifiable/Chips';
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

const CreateChip = () => {
  const [chipsGroup, setChipsGroup] = useState<number[]>([1]);
  const [lastNumber, setLastNumber] = useState(0);
  const [amount, setAmount] = useState<number>();
  const [itensPerFamily, setItensPerFamily] = useState<itens[]>([]);
  const [reload, setReload] = useState(false);
  const router = useRouter();
  const { operatorsData, setSlidePanelState } = operators.useOperator();
  const {
    createChipLoading,
    createChip,
    getItemAmount,
    getItensByFamily,
    configData,
  } = chips.useCreate();
  const { control, handleSubmit, watch } = useForm();

  async function onSubmit(data: any) {
    try {
      const filteredChipsGroup = chipsGroup.filter((chip) => chip !== 0);
      const chipsValues = filteredChipsGroup.map((chip) => {
        if (
          !data['Iccid' + chip] ||
          !data['Telefone' + chip] ||
          !data['Operadora_Id' + chip]
        ) {
          return;
        }

        if (
          data['Iccid' + chip].length < 19 ||
          data['Iccid' + chip].length > 20
        ) {
          return null;
        }

        return {
          Iccid: data['Iccid' + chip],
          Operadora_Id: data['Operadora_Id' + chip].key,
          NumeroDaLinha: utils.phoneUnformat(data['Telefone' + chip]),
          Item_Id: data.Item_Id.key,
          Situacao_Id: 'inativo',
        };
      });

      if (chipsValues.includes(undefined)) {
        throw new Error('Preencha todos os campos para continuar');
      }

      if (chipsValues.includes(null)) {
        throw new Error('Campos de ICCID devem ter 19 ou 20 d??gitos');
      }

      await createChip({
        variables: {
          data: chipsValues,
          Item_Id: data.Item_Id.key,
          Quantidade: chipsValues.length,
        },
      }).then(() => {
        router.push(rotas.producao.identificaveis.chips.index);
        utils.notification('Chip criado com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
  }

  function disableMainButton() {
    return watch('Item_Id') === undefined || createChipLoading || amount === 0;
  }

  useEffect(() => {
    getItensByFamily().then((itens) => {
      setItensPerFamily(itens);
    });
  }, [getItensByFamily]);

  useEffect(() => {
    if (watch('Item_Id') !== undefined) {
      getItemAmount(watch('Item_Id').key).then((availableAmount) => {
        if (availableAmount <= 0) {
          setAmount(0);
          setChipsGroup([1]);
          return;
        }
        setAmount(availableAmount);
      });
    }
  }, [getItemAmount, watch('Item_Id')]);

  useEffect(() => {
    if (chipsGroup[chipsGroup.length - 1] > lastNumber) {
      setLastNumber(chipsGroup[chipsGroup.length - 1]);
    }
  }, [chipsGroup, lastNumber]);

  return (
    <common.Card>
      <common.GenericTitle
        title="Item pertencente"
        subtitle="Selecione o item que os chips pertencem"
        className="px-6"
      />

      <common.Separator />
      <form>
        {' '}
        <common.form.FormLine position={1} grid={!configData?.Valor[0] ? 1 : 3}>
          {!configData?.Valor[0] ? (
            <common.ConfigMessage rotas={rotas}>
              Selecione a fam??lia de itens para chips em configura????es primeiro
            </common.ConfigMessage>
          ) : (
            <Controller
              name="Item_Id"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="col-span-2 px-6 py-2">
                  <common.form.Select
                    itens={
                      itensPerFamily
                        ? itensPerFamily.map((item) => {
                            return {
                              key: item.Id,
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
                    onChange={onChange}
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
            <p className="m-auto text-center text-md">
              Saldo do item no estoque: {amount}
            </p>
          ) : (
            ''
          )}
        </common.form.FormLine>
        <common.Separator />
        {amount === undefined ? (
          <div />
        ) : amount === 0 ? (
          <div className="flex items-center justify-center my-8">
            <p className="text-xl">Sem chips no estoque</p>
          </div>
        ) : (
          <>
            <common.GenericTitle
              title="Dados dos chips"
              subtitle="ICCID, N??mero da linha e operadora"
              className="px-6"
            />
            <common.Separator />
            {chipsGroup.map(
              (chip, index) =>
                chip !== 0 && (
                  <common.form.FormLine
                    position={index + 1}
                    grid={7}
                    key={index}
                  >
                    <div className="col-span-2">
                      <Controller
                        name={'Iccid' + chip}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <div className="col-span-2">
                            <common.form.Input
                              fieldName={'Iccid' + chip}
                              title="ICCID"
                              onChange={(e) => {
                                if (e.target.value.length < 21) {
                                  onChange(e.target.value);
                                }
                              }}
                              value={value}
                            />
                          </div>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <common.form.BRPhoneInput
                        index={chip}
                        control={control}
                      />
                    </div>

                    <Controller
                      name={'Operadora_Id' + chip}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="col-span-2">
                          <common.form.Select
                            itens={
                              operatorsData
                                ? operatorsData.map((operadora) => {
                                    return {
                                      key: operadora.Id,
                                      title: operadora.Nome,
                                    };
                                  })
                                : []
                            }
                            value={value}
                            onChange={onChange}
                            label="Operadora"
                          />
                          <common.OpenModalLink
                            onClick={() =>
                              setSlidePanelState({ open: true, type: 'create' })
                            }
                          >
                            Cadastrar operadora
                          </common.OpenModalLink>
                        </div>
                      )}
                    />

                    {chip !== 1 && (
                      <common.buttons.DeleteButton
                        onClick={() => {
                          chipsGroup[index] = 0;
                          setReload(!reload);
                        }}
                      />
                    )}
                  </common.form.FormLine>
                )
            )}

            {!createChipLoading && chipsGroup.length < amount && (
              <common.AddForm
                array={chipsGroup}
                setArray={setChipsGroup}
                lastNumber={lastNumber}
              >
                Adicionar outro chip
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
          loading={createChipLoading}
        />
      </div>
      <operators.SlidePanel />
    </common.Card>
  );
};

export default CreateChip;
