import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as services from '&erp/domains/portfolio/Pricing/Tabs/Services';

import * as utils from '@comigo/utils';
import {
  BRLMoneyFormat,
  BRLMoneyInputDefaultFormat,
  BRLMoneyInputFormat,
  BRLMoneyUnformat,
  ptBRtimeStamp,
} from '@comigo/utils';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

type ServiceProvider = {
  Id: string;
  Precos: { Id: string; Valor: string }[];
};

export function Price() {
  const [serviceProvider, setServiceProvider] = useState<ServiceProvider>();
  const [prices, setPrices] = useState<
    {
      Id: string;
      Valor: string;
      created_at: Date;
      TipoDeRecorrencia: {
        Valor: string;
        Comentario: string;
      };
      TipoDePreco?: {
        Comentario: string;
      };
    }[]
  >([]);
  const {
    createServicePriceLoading,
    createServicePrice,
    setSlidePanelState,
    servicesRefetch,
    slidePanelState,
    getServiceProviderByServiceId,
    pricingSchema,
    pricesTypeData,
    recurrenceTypeData,
    getProductProviderRecurrencyType,
  } = services.useService();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pricingSchema),
  });
  const onSubmit = (formData: {
    Valor: string;
    TipoDeRecorrencia_Id: { key: string };
    TipoDePreco_Id: { key: string };
  }) => {
    try {
      createServicePrice({
        variables: {
          Fornecedor_Servico_Id: serviceProvider?.Id,
          TipoDeRecorrencia_Id: formData.TipoDeRecorrencia_Id.key,
          Valor: Number(BRLMoneyUnformat(formData.Valor)).toFixed(2),
          TipoDePreco_Id: formData.TipoDePreco_Id.key,
        },
      }).then(() => {
        servicesRefetch();
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false };
        });
        utils.notification('Serviço precificado com sucesso', 'success');
      });
    } catch (error: any) {
      utils.showError(error);
    }
  };

  useEffect(() => {
    getServiceProviderByServiceId(slidePanelState.data?.Id).then((data) => {
      setServiceProvider(data[0]);
      if (data[0].Precos.length > 0) {
        setValue(
          'Valor',
          BRLMoneyInputDefaultFormat(data[0].Precos[0].Valor.toString())
        );
        const prices = data[0].Precos.map(async (prices) => {
          const recurrencyType = prices.TipoDeRecorrencia_Id
            ? await getProductProviderRecurrencyType(
                prices.TipoDeRecorrencia_Id as string
              )
            : undefined;
          return {
            Id: prices.Id,
            Valor: prices.Valor,
            created_at: prices.created_at,
            TipoDePreco: prices.TipoDePreco,
            TipoDeRecorrencia: {
              Comentario: recurrencyType?.Comentario as string,
              Valor: recurrencyType?.Valor as string,
            },
          };
        });
        (async () => {
          setPrices(await Promise.all(prices));
        })();
      }
    });
  }, [slidePanelState.data]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Valor'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Input
                fieldName={'Valor'}
                title={`Valor`}
                value={value}
                onChange={(e) => {
                  onChange(BRLMoneyInputFormat(e));
                }}
                error={errors.Valor}
                icon="R$"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'TipoDePreco_Id'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  pricesTypeData
                    ? pricesTypeData.map((priceType) => {
                        return {
                          key: priceType.Valor,
                          title: priceType.Comentario,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                label="Tipo de preço"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'TipoDeRecorrencia_Id'}
          render={({ field: { onChange, value } }) => (
            <div className="col-span-4">
              <common.form.Select
                itens={
                  recurrenceTypeData
                    ? recurrenceTypeData.map((recurrenceType) => {
                        return {
                          key: recurrenceType.Valor,
                          title: recurrenceType.Comentario,
                        };
                      })
                    : []
                }
                value={value}
                error={errors.TipoDeRecorrencia_Id}
                onChange={onChange}
                label="Tipo de recorrência"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Confirmar"
        disabled={createServicePriceLoading}
        loading={createServicePriceLoading}
      />
      <div className="w-full">
        {prices.length > 0 ? (
          <>
            <common.Separator />
            <h2 className="mb-2 text-xl">Últimos preços</h2>

            <ol>
              {prices.map((price) => (
                <div key={price.Id}>
                  <li className="list-disc list-item">
                    {BRLMoneyFormat(price.Valor)} -{' '}
                    {ptBRtimeStamp(price.created_at)} -{' '}
                    {price.TipoDeRecorrencia.Comentario} -{' '}
                    {price.TipoDePreco?.Comentario}
                  </li>
                </div>
              ))}
            </ol>
          </>
        ) : null}
      </div>
    </form>
  );
}
