import { useEffect, useState } from 'react';

import * as common from '@comigo/ui-common';

import * as blocks from '@comigo/ui-blocks';

import * as clients from '&crm/domains/clients';

import * as utils from '@comigo/utils';

import { useRouter } from 'next/router';
import rotas from '&crm/domains/routes';

type Itens = {
  Id: string;
  PriceId: string;
  Name: string;
  Price: string;
  Type: string;
};

type ClientVehicleProps = {
  vehicle: {
    Id: string;
    OS_Id: string;
    Beneficios: {
      Id: string;
      Portfolio_Id: string;
      TipoPortfolio: string;
      PortfolioPreco_Id: string;
    }[];
    Produtos: {
      ProdutoPreco_Id: string;
      Produto_Id: string;
    }[];
    Servicos: { ServicoPreco_Id: string; Servico_Id: string }[];
    Situacao: {
      Comentario: string;
      Valor: string;
    };
    Franquia_Id: string;
    Veiculo: {
      Id: string;
      Apelido?: string;
      Placa?: string;
      NumeroDoChassi?: string;
    };
  };
  selectedVehicle: {
    Id: null | string;
    content: {
      title: string;
      subtitle: string;
    };
    position: number;
  };
};

export default function ClientVehicle({
  vehicle,
  selectedVehicle,
}: ClientVehicleProps) {
  const router = useRouter();
  const [totalValue, setTotalValue] = useState('0');
  const [benefits, setBenefits] = useState<Itens[]>();
  const [services, setServices] = useState<Itens[]>();
  const [products, setProducts] = useState<Itens[]>();

  const {
    getServiceById,
    getProductById,
    getPlanById,
    getComboById,
    createProposal,
    createProposalLoading,
    userAndTicketData,
    setSlidePanelState,
  } = clients.useUpdate();

  function getTotalValue() {
    let totalPrice = 0;

    benefits?.map((benefit) => {
      totalPrice += Number(benefit.Price);
    });
    setTotalValue(utils.BRLMoneyFormat(totalPrice));
  }

  async function createVehicleProposal() {
    try {
      await createProposal({
        variables: {
          Lead_Id: null,
          Ticket_Id: userAndTicketData?.atendimentos_Tickets?.[0].Id,
          TipoDePagamento_Id: 'boleto',
          TipoDeRecorrencia_Id: 'mensal',
          Usuario_Id: userAndTicketData?.autenticacao_Usuarios?.[0].Id,
          Cliente_Id: router.query.id,
          planosData: benefits
            ?.filter((benefit) => benefit.Type === 'plano')
            .map((plan) => {
              return {
                Plano_Id: plan.Id,
                Veiculo: 1,
                Veiculo_Id: vehicle.Id,
                PlanoPreco_Id: plan.PriceId,
              };
            }),
          produtosData: benefits
            ?.filter((benefit) => benefit.Type === 'produto')
            .map((product) => {
              return {
                Veiculo: 1,
                Veiculo_Id: vehicle.Id,
                Produto_Id: product.Id,
                ProdutoPreco_Id: product.PriceId,
              };
            }),
          servicosData: benefits
            ?.filter((benefit) => benefit.Type === 'serviço')
            .map((service) => {
              return {
                Servico_Id: service.Id,
                Veiculo: 1,
                Veiculo_Id: vehicle.Id,
                ServicosPreco_Id: service.PriceId,
              };
            }),
          combosData: benefits
            ?.filter((benefit) => benefit.Type === 'combo')
            .map((combo) => {
              return {
                Combo_Id: combo.Id,
                Veiculo: 1,
                Veiculo_Id: vehicle.Id,
                ComboPreco_Id: combo.PriceId,
              };
            }),
          // oportunidadesData: []
        },
      }).then((response) => {
        router.push(
          rotas.comercial.propostas.index +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id
        );
        utils.notification('Proposta criada com sucesso', 'success');
      });
    } catch (err: any) {
      utils.showError(err);
    }
    return;
  }

  async function getBenefits() {
    const benefits = vehicle.Beneficios.map(async (benefit) => {
      switch (benefit.TipoPortfolio) {
        case 'serviço':
          return await getServiceById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Id: response.service?.Id,
              PriceId: response.price?.Id,
              Name: response?.service?.Nome as string,
              Price: response?.price?.Valor as string,
              Type: 'Beneficio - Serviço',
            };
          });
        case 'produto':
          return await getProductById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Id: response.product?.Id,
              PriceId: response.price?.Id,
              Name: response?.product?.Nome as string,
              Price: response?.price?.Valor as string,
              Type: 'Beneficio - Produto',
            };
          });
        case 'plano':
          return await getPlanById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            return {
              Id: response.plan?.Id,
              PriceId: response.price?.Id,
              Name: response?.plan?.Nome as string,
              Price: response?.price?.ValorPraticado
                ? response?.price?.ValorPraticado + response.price.ValorBase
                : response?.price?.ValorBase +
                  (response.price?.ServicoPreco.Valor as string),
              Type: 'Beneficio - Plano',
            };
          });
        case 'combo':
          return await getComboById(
            benefit.Portfolio_Id,
            benefit.PortfolioPreco_Id
          ).then((response) => {
            let comboPrice = response?.price?.ValorBase;
            response?.combo?.Planos.map((plan) => {
              comboPrice += plan.ValorPraticado;
            });
            response?.combo?.Produtos.map((product) => {
              comboPrice += product.ValorPraticado;
            });
            response?.combo?.Servicos.map((services) => {
              comboPrice += services.ValorPraticado;
            });

            return {
              Id: response.combo?.Id,
              PriceId: response.price?.Id,
              Name: response?.combo?.Nome as string,
              Price: comboPrice as string,
              Type: 'Beneficio - Combo',
            };
          });
      }
    });
    (async () => {
      setBenefits(await Promise.all(benefits as any));
    })();
  }

  async function getServices() {
    const services = vehicle.Servicos.map(async (service) => {
      return await getServiceById(
        service.Servico_Id,
        service.ServicoPreco_Id
      ).then((response) => {
        return {
          Id: response.service?.Id,
          PriceId: response.price?.Id,
          Name: response?.service?.Nome as string,
          Price: response?.price?.Valor as string,
          Type: 'Serviço',
        };
      });
    });
    (async () => {
      setServices(await Promise.all(services as any));
    })();
  }

  async function getProducts() {
    const products = vehicle.Produtos.map(async (product) => {
      return await getProductById(
        product.Produto_Id,
        product.ProdutoPreco_Id
      ).then((response) => {
        return {
          Id: response.product?.Id,
          PriceId: response.price?.Id,
          Name: response?.product?.Nome as string,
          Price: response?.price?.Valor as string,
          Type: 'Produto',
        };
      });
    });
    (async () => {
      setProducts(await Promise.all(products as any));
    })();
  }

  useEffect(() => {
    if (vehicle.Id !== null) {
      getBenefits();
      getServices();
      getProducts();
    }
  }, [vehicle]);

  useEffect(() => {
    getTotalValue();
  }, [benefits]);

  return (
    <div className="col-span-9 mb-4 rounded-md">
      <common.Card>
        <header className="flex items-start justify-between px-4">
          <div>
            {vehicle.Veiculo.Placa ? (
              <p className="text-gray-600">Placa: {vehicle.Veiculo.Placa}</p>
            ) : (
              <>
                <p className="text-xs text-gray-600">Chassi: </p>
                <p className="font-bold">{vehicle.Veiculo.NumeroDoChassi}</p>
              </>
            )}
            <p className="text-sm">
              Status:{' '}
              <span
                className={`${
                  vehicle.Situacao.Comentario === 'Ativo'
                    ? 'text-primary-9'
                    : 'text-primary-3'
                }`}
              >
                {vehicle.Situacao.Comentario}
              </span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-xs text-gray-600">Mensalidade</p>
            <p className="text-xl font-bold text-gray-700 dark:text-gray-500">
              {totalValue}
            </p>
          </div>
        </header>

        {selectedVehicle.Id !== null ? (
          <section className="px-4">
            <common.Separator className="mb-4" />
            <h3 className="text-xl text-gray-600">Beneficios contratados</h3>
            {benefits ? (
              <blocks.Table
                colection={benefits}
                columnTitles={[
                  {
                    title: 'Nome',
                    fieldName: 'Name',
                  },
                  {
                    title: 'Preco',
                    fieldName: 'Price',
                    type: 'handler',
                    handler: (price: string) => utils.BRLMoneyFormat(price),
                  },
                ]}
              />
            ) : (
              <blocks.TableSkeleton />
            )}
            <common.Separator className="mb-4" />
            <common.Card className="px-6 dark:bg-dark-2">
              <h3 className="text-xl font-bold">Serviços</h3>

              {services ? (
                <blocks.Table
                  colection={services}
                  columnTitles={[
                    {
                      title: 'Nome',
                      fieldName: 'Name',
                    },
                    {
                      title: 'Preco',
                      fieldName: 'Price',
                      type: 'handler',
                      handler: (price: string) => utils.BRLMoneyFormat(price),
                    },
                  ]}
                />
              ) : (
                <blocks.TableSkeleton />
              )}
            </common.Card>
            <common.Separator className="mt-4 mb-4" />
            <common.Card className="px-6 dark:bg-dark-2">
              <h3 className="text-xl font-bold">Produtos</h3>

              {products ? (
                <blocks.Table
                  colection={products}
                  columnTitles={[
                    {
                      title: 'Nome',
                      fieldName: 'Name',
                    },
                    {
                      title: 'Preco',
                      fieldName: 'Price',
                      type: 'handler',
                      handler: (price: string) => utils.BRLMoneyFormat(price),
                    },
                  ]}
                />
              ) : (
                <blocks.TableSkeleton />
              )}
            </common.Card>
          </section>
        ) : (
          <section className="px-4 mt-4">
            <common.Separator className="mt-0 mb-0" />
            {products && benefits && services ? (
              <blocks.BorderLessTable
                colection={[...products, ...benefits, ...services]}
                columnTitles={[
                  {
                    title: 'Descrição do Beneficio / Serviço / Produto',
                    fieldName: 'Name',
                  },
                  {
                    title: 'Preco',
                    fieldName: 'Price',
                    type: 'handler',
                    handler: (price: string) => utils.BRLMoneyFormat(price),
                  },
                  {
                    title: 'Tipo',
                    fieldName: 'Type',
                  },
                ]}
              />
            ) : (
              <blocks.TableSkeleton />
            )}
          </section>
        )}

        {selectedVehicle.content.subtitle !== 'Visão Geral' && (
          <div className="px-4">
            <common.Separator />
            <div className="flex items-center justify-between mt-4">
              <common.buttons.GoBackButton />
              <div className="flex gap-2">
                <common.buttons.PrimaryButton
                  title="Gerar proposta"
                  disabled={
                    createProposalLoading ||
                    vehicle.Situacao.Comentario === 'Inativo'
                  }
                  onClick={createVehicleProposal}
                  loading={createProposalLoading}
                />
                <common.buttons.PrimaryButton
                  title="Mudar titularidade do veículo"
                  onClick={() => {
                    setSlidePanelState({
                      open: true,
                      type: 'ownership',
                    });
                  }}
                  disabled={vehicle.Situacao.Comentario === 'Inativo'}
                />
                <common.buttons.PrimaryButton
                  title="Trocar veículo"
                  onClick={() => {
                    setSlidePanelState({
                      open: true,
                      type: 'vehicle',
                    });
                  }}
                  disabled={vehicle.Situacao.Comentario === 'Inativo'}
                />
              </div>
            </div>
          </div>
        )}
      </common.Card>
    </div>
  );
}
