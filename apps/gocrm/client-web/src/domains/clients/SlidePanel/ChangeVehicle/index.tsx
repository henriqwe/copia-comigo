import { Controller, useForm } from 'react-hook-form';

import * as common from '@comigo/ui-common';

import * as activeVehicles from '&crm/domains/clients';

import * as utils from '@comigo/utils';

import { useRouter } from 'next/router';
import rotas from '&crm/domains/routes';
import { yupResolver } from '@hookform/resolvers/yup';

export default function ChangeVehicle() {
  const router = useRouter();
  const {
    clientData,
    createProposal,
    createProposalLoading,
    userAndTicketData,
    getUserByClientId,
    changeVehicleSchema,
    getComboById,
    vehiclesData,
  } = activeVehicles.useUpdate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(changeVehicleSchema),
  });
  const onSubmit = async (formData: any) => {
    const plans: {
      Plano_Id: string;
      Veiculo_Id: string;
      Veiculo: number;
      PlanoPreco_Id: string;
    }[] = [];
    const products: {
      Veiculo: number;
      Veiculo_Id: string;
      Produto_Id: string;
      ProdutoPreco_Id: string;
    }[] = [];
    const service: {
      Servico_Id: string;
      Veiculo_Id: string;
      Veiculo: number;
      ServicosPreco_Id: string;
    }[] = [];
    const combos: {
      Combo_Id: string;
      Veiculo_Id: string;
      Veiculo: number;
      ComboPreco_Id: string;
    }[] = [];

    const comboPlansIds: string[] = [];
    const comboServicesIds: string[] = [];
    const comboProductsIds: string[] = [];

    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string }) => item.TipoPortfolio === 'combo'
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      getComboById(item.Portfolio_Id, item.PortfolioPreco_Id).then((combo) => {
        // ids dos planos dos combos
        combo.combo?.Planos.map((plan) => {
          comboPlansIds.push(plan.Plano_Id);
        });
        // ids dos produtos dos combos
        combo.combo?.Produtos.map((products) => {
          comboProductsIds.push(products.Produto_Id);
        });
        // ids dos serviços dos combos
        combo.combo?.Servicos.map((services) => {
          comboServicesIds.push(services.Servico_Id);
        });
      });
    });

    // adicionando planos no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'plano' &&
        !comboPlansIds.includes(item.Portfolio_Id)
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      plans.push(
        {
          PlanoPreco_Id: item.PortfolioPreco_Id,
          Plano_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          PlanoPreco_Id: item.PortfolioPreco_Id,
          Plano_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    // adicionando produtos dos beneficios no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'produto' &&
        !comboProductsIds.includes(item.Portfolio_Id)
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      products.push(
        {
          ProdutoPreco_Id: item.PortfolioPreco_Id,
          Produto_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          ProdutoPreco_Id: item.PortfolioPreco_Id,
          Produto_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    // adicionando produtos do veiculo no array
    formData['Veiculo1'].key.Produtos.filter(
      (item: { Produto_Id: string }) =>
        !comboProductsIds.includes(item.Produto_Id)
    ).map((item: { Produto_Id: string; ProdutoPreco_Id: string }) => {
      products.push(
        {
          ProdutoPreco_Id: item.ProdutoPreco_Id,
          Produto_Id: item.Produto_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          ProdutoPreco_Id: item.ProdutoPreco_Id,
          Produto_Id: item.Produto_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    // adicionando serviços dos beneficios no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'serviço' &&
        !comboServicesIds.includes(item.Portfolio_Id)
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      service.push(
        {
          ServicosPreco_Id: item.PortfolioPreco_Id,
          Servico_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          ServicosPreco_Id: item.PortfolioPreco_Id,
          Servico_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    // adicionando serviços do veiculo no array
    formData['Veiculo1'].key.Servicos.filter(
      (item: { Servico_Id: string }) =>
        !comboServicesIds.includes(item.Servico_Id)
    ).map((item: { Servico_Id: string; ServicoPreco_Id: string }) => {
      service.push(
        {
          ServicosPreco_Id: item.ServicoPreco_Id,
          Servico_Id: item.Servico_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          ServicosPreco_Id: item.ServicoPreco_Id,
          Servico_Id: item.Servico_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    // adicionando combos no array
    formData['Veiculo1'].key.Beneficios.filter(
      (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
        item.TipoPortfolio === 'combo'
    ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
      combos.push(
        {
          ComboPreco_Id: item.PortfolioPreco_Id,
          Combo_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo1'].key.Veiculo.Id,
          Veiculo: 1,
        },
        {
          ComboPreco_Id: item.PortfolioPreco_Id,
          Combo_Id: item.Portfolio_Id,
          Veiculo_Id: formData['Veiculo2'].key,
          Veiculo: 2,
        }
      );
    });

    const userId = await getUserByClientId(router.query.id as string);

    await createProposal({
      variables: {
        Lead_Id: null,
        Ticket_Id: userAndTicketData?.atendimentos_Tickets?.[0].Id,
        TipoDePagamento_Id: 'boleto',
        TipoDeRecorrencia_Id: 'mensal',
        Usuario_Id: userId[0].Id,
        Cliente_Id: router.query.id,
        planosData: plans,
        produtosData: products,
        servicosData: service,
        combosData: combos,
        // oportunidadesData: []
      },
    })
      .then((response) => {
        router.push(
          rotas.comercial.propostas.index +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id +
            '?origin=changeVehicle'
        );
        utils.notification(
          'Proposta do novo veiculo criada com sucesso',
          'success'
        );
      })
      .catch((error) => utils.showError(error));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Veiculo1'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  clientData
                    ? clientData.VeiculosAtivos.filter(
                        (vehicle) => vehicle.Situacao.Valor === 'ativo'
                      ).map((activeVehicle) => {
                        return {
                          key: activeVehicle,
                          title: `${
                            activeVehicle.Veiculo.Placa
                              ? activeVehicle.Veiculo.Placa
                              : activeVehicle.Veiculo.NumeroDoChassi
                          } - ${activeVehicle.Veiculo.Apelido}`,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai ser inativado"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name={'Veiculo2'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  vehiclesData
                    ? vehiclesData.map((activeVehicle) => {
                        return {
                          key: activeVehicle.Id,
                          title: `${
                            activeVehicle.Placa
                              ? activeVehicle.Placa
                              : activeVehicle.NumeroDoChassi
                          } - ${activeVehicle.Apelido}`,
                        };
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veiculo que vai receber"
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createProposalLoading}
        loading={createProposalLoading}
      />
    </form>
  );
}
