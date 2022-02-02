import * as common from '@comigo/ui-common';

import * as proposals from '&crm/domains/commercial/Proposals';
import * as clients from '&crm/domains/identities/Clients';
import * as blocks from '@comigo/ui-blocks';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as utils from '@comigo/utils';

const ProposalDetails = () => {
  const router = useRouter();
  const {
    proposalData,
    proposalInstallationsData,
    proposalRefetch,
    proposalLoading,
    getProposalArray,
    createProposalCombo,
    createProposalService,
    createProposalPlan,
    createProposalProduct,
    createProposalUpSelling,
    createProposalComboLoading,
    createProposalPlanLoading,
    createProposalProductLoading,
    createProposalServiceLoading,
    createProposalUpSellingLoading,
    acceptProposal,
    refuseProposal,
    setSlidePanelState,
    addClientToProposal,
    getVehicleById,
    getProposalClienteById,
    disableActiveVehicleBenefit,
    createActiveVehicleProduct,
    createActiveVehicleService,
    getActiveVehicleById,
    createActiveVehicleBenefit,
    updateActiveVehicleBenefit,
    changeVehicleOwnership,
    changeVehicleSituation,
    createActiveVehicle,
  } = proposals.useView();
  const { clientsData } = clients.useList();
  const { control, watch, setValue } = useForm();
  const [vehiclesGroup, setVehiclesGroup] = useState([
    {
      Id: null,
      content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
      position: 1,
    },
  ]);
  const [vehicleSelected, setVehicleSelected] = useState({
    Id: null,
    content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
    position: 1,
  });
  const [proposalArray, setProposalArray] =
    useState<proposals.ProposalsArray>();
  const [proposalArrayLoading, setProposalArrayLoading] = useState(false);
  const [showAddVehicleButton, setShowAddVehicleButton] = useState(true);
  const [generateProposal, setGenerateProposal] = useState(false);

  function renderCreateVehicle() {
    if (proposalArrayLoading) {
      return <proposals.VehicleSkeleton />;
    }
    if (generateProposal) {
      return <proposals.GenerateProposal />;
    }
    if (
      proposalArray!.Combos.length > 0 ||
      proposalArray!.Planos.length > 0 ||
      proposalArray!.Produtos.length > 0 ||
      proposalArray!.Servicos.length > 0
    ) {
      const licensePlates = vehiclesGroup
        .filter((vehicle) => vehicle.content.subtitle !== 'Sem vínculo')
        .map((vehicle) => vehicle.content.subtitle);
      return (
        <proposals.ViewVehicle
          proposalData={proposalArray}
          proposalDataLoading={proposalArrayLoading}
          vehicle={vehicleSelected}
          refetchArraysData={refetchArraysData}
          proposalRefetch={proposalRefetch}
          licensePlates={licensePlates}
        />
      );
    }
    return vehiclesGroup.map((vehicleGroup, index) => {
      if (vehicleSelected?.position === vehicleGroup.position) {
        return (
          <Controller
            control={control}
            key={index}
            name={'Veiculo' + vehicleGroup.position}
            render={() => (
              <div className="col-span-5">
                <proposals.CreateVehicle
                  onChange={(e) => onSubmit(e)}
                  vehicleName={'Veiculo ' + vehicleGroup.position}
                  createLoading={
                    createProposalComboLoading ||
                    createProposalPlanLoading ||
                    createProposalProductLoading ||
                    createProposalServiceLoading ||
                    createProposalUpSellingLoading ||
                    proposalLoading
                  }
                />
              </div>
            )}
          />
        );
      }
    });
  }

  async function addClientToProposalSubmit() {
    await addClientToProposal({
      variables: {
        Cliente_Id: watch('Cliente_Id').key || null,
      },
    }).then(() => {
      proposalRefetch();
      utils.notification('Cliente vinculado com sucesso', 'success');
    });
  }

  async function acceptProposalSubmit() {
    proposalRefetch();

    // instalações para pegar os veiculos
    proposalInstallationsData?.map((installation) => {
      // Pegando o veiculo do plano
      getActiveVehicleById(installation.Veiculo_Id as string).then(
        async (Vehicles) => {
          const activeVehicles = Vehicles?.filter(
            (vehicle) => vehicle.Situacao.Valor === 'ativo'
          );

          // beneficios da proposta
          const benefits = proposalData?.Planos.filter(
            (plan) => plan.Veiculo_Id === installation.Veiculo_Id
          ).map((plans) => {
            return {
              Portfolio_Id: plans.Plano.Id,
              TipoPortfolio: 'plano',
              PortfolioPreco_Id: plans.PlanoPreco.Id,
              Ativo: true,
            };
          });
          proposalData?.Produtos.filter(
            (product) =>
              product.ProdutoPreco.TipoDeRecorrencia_Id !== null &&
              product.Veiculo_Id === installation.Veiculo_Id
          ).map((product) => {
            benefits?.push({
              Portfolio_Id: product.Produto.Id,
              TipoPortfolio: 'produto',
              PortfolioPreco_Id: product.ProdutoPreco.Id,
              Ativo: true,
            });
          });
          proposalData?.Servicos.filter(
            (service) =>
              !service.Servico.GeraOS &&
              service.Veiculo_Id === installation.Veiculo_Id
          ).map((service) => {
            benefits?.push({
              Portfolio_Id: service.Servico.Id,
              TipoPortfolio: 'serviço',
              PortfolioPreco_Id: service.ServicosPreco.Id,
              Ativo: true,
            });
          });
          proposalData?.Combos.filter(
            (combo) => combo.Veiculo_Id === installation.Veiculo_Id
          ).map((combo) => {
            benefits?.push({
              Portfolio_Id: combo.Combo.Id,
              TipoPortfolio: 'combo',
              PortfolioPreco_Id: combo.ComboPreco.Id,
              Ativo: true,
            });
          });
          // ver se existe um veiculo
          if ((activeVehicles?.length || 0) > 0) {
            // ids dos planos da proposta
            const plansIds = proposalData?.Planos.filter(
              (plan) => plan.Veiculo_Id === installation.Veiculo_Id
            ).map((plan) => plan.Plano.Id);

            // ids dos produtos propostas
            const productsIds = proposalData?.Produtos.filter(
              (product) =>
                product.ProdutoPreco.TipoDeRecorrencia_Id !== null &&
                product.Veiculo_Id === installation.Veiculo_Id
            ).map((product) => product.Produto.Id);

            // ids dos serviços beneficios
            const servicesIds = proposalData?.Servicos.filter(
              (service) =>
                !service.Servico.GeraOS &&
                service.Veiculo_Id === installation.Veiculo_Id
            ).map((service) => service.Servico.Id);

            // ids dos combos da proposta
            const combosIds = proposalData?.Combos.filter(
              (combo) => combo.Veiculo_Id === installation.Veiculo_Id
            ).map((combo) => combo.Combo.Id);

            // troca de veiculo
            if (activeVehicles?.[0].Cliente_Id !== proposalData?.Cliente_Id) {
              // produtos da proposta
              const products = proposalData?.Produtos.filter(
                (product) => product.ProdutoPreco.TipoDeRecorrencia_Id === null
              ).map((product) => {
                return {
                  ProdutoPreco_Id: product.ProdutoPreco.Id,
                  Produto_Id: product.Produto.Id,
                  Ativo: true,
                };
              });

              // serviços da proposta
              const services = proposalData?.Servicos.filter(
                (service) => service.Servico.GeraOS
              ).map((service) => {
                return {
                  ServicoPreco_Id: service.ServicosPreco.Id,
                  Servico_Id: service.Servico.Id,
                  Ativo: true,
                };
              });

              // veiculo inativo em outro cliente
              const inativeVehicle = Vehicles?.filter(
                (vehicle) => vehicle.Cliente_Id === proposalData?.Cliente_Id
              );
              if ((inativeVehicle?.length || 0) > 0) {
                // ids dos beneficios do veiculo inativo
                const inativeBenefitsIds = inativeVehicle?.[0].Beneficios.map(
                  (benefit) => benefit.Portfolio_Id
                );
                // ids dos serviços do veiculo inativo
                const inativeServicesIds = inativeVehicle?.[0].Servicos.map(
                  (service) => service.Servico_Id
                );
                // ids dos produtos do veiculo inativo
                const inativeProductsIds = inativeVehicle?.[0].Produtos.map(
                  (product) => product.Produto_Id
                );

                // planos dos beneficios dos veiculos inativos
                const plans = inativeVehicle?.[0].Beneficios.filter(
                  (benefit) => benefit.TipoPortfolio === 'plano'
                );

                // remove planos dos veiculos inativos
                await removeBenefit(plans, plansIds);

                // produtos dos beneficios dos veiculos inativos
                const inativeProducts = inativeVehicle?.[0].Beneficios.filter(
                  (benefit) => benefit.TipoPortfolio === 'produto'
                );

                await removeBenefit(inativeProducts, productsIds);

                const inativeServices = inativeVehicle?.[0].Beneficios.filter(
                  (benefit) => benefit.TipoPortfolio === 'serviço'
                );

                await removeBenefit(inativeServices, servicesIds);

                const combos = inativeVehicle?.[0].Beneficios.filter(
                  (benefit) => benefit.TipoPortfolio === 'combo'
                );

                await removeBenefit(combos, combosIds);

                benefits?.map((benefit) => {
                  if (inativeBenefitsIds?.includes(benefit.Portfolio_Id)) {
                    updateActiveVehicleBenefit({
                      variables: {
                        Id: inativeVehicle?.[0].Beneficios.filter(
                          (vehicle) =>
                            vehicle.Portfolio_Id === benefit.Portfolio_Id
                        )[0].Id,
                        PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                      },
                    });
                    return;
                  }
                  createActiveVehicleBenefit({
                    variables: {
                      Portfolio_Id: benefit.Portfolio_Id,
                      PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                      TipoPortfolio: benefit.TipoPortfolio,
                      VeiculoAtivo_Id: inativeVehicle?.[0].Id,
                    },
                  });
                });
                products?.map((product) => {
                  if (!inativeProductsIds?.includes(product.Produto_Id)) {
                    createActiveVehicleProduct({
                      variables: {
                        VeiculoAtivo_Id: inativeVehicle?.[0].Id,
                        ProdutoPreco_Id: product.ProdutoPreco_Id,
                        Produto_Id: product.Produto_Id,
                      },
                    });
                    return;
                  }
                });

                services?.map((service) => {
                  if (!inativeServicesIds?.includes(service.Servico_Id)) {
                    createActiveVehicleService({
                      variables: {
                        VeiculoAtivo_Id: inativeVehicle?.[0].Id,
                        ServicoPreco_Id: service.ServicoPreco_Id,
                        Servico_Id: service.Servico_Id,
                      },
                    });
                    return;
                  }
                });
                await changeVehicleSituation({
                  variables: {
                    Id: inativeVehicle?.[0].Id,
                    Situacao_Id: 'ativo',
                  },
                });
                await changeVehicleSituation({
                  variables: {
                    Id: activeVehicles?.[0].Id,
                    Situacao_Id: 'inativo',
                  },
                });
                await acceptProposal();
                proposalRefetch();
                return;
              }

              await changeVehicleOwnership({
                variables: {
                  Id: activeVehicles?.[0].Id,
                  Veiculo_Id: installation.Veiculo_Id,
                  Cliente_Id: proposalData?.Cliente_Id,
                  Franquia_Id: activeVehicles?.[0].Franquia_Id,
                  OS_Id: activeVehicles?.[0].OS_Id,
                  Beneficios: benefits,
                  Produtos: products,
                  Servicos: services,
                },
              });
              await acceptProposal();
              proposalRefetch();
              return;
            }
            const plans = activeVehicles?.[0].Beneficios.filter(
              (benefit) => benefit.TipoPortfolio === 'plano'
            );

            await removeBenefit(plans, plansIds);
            // Ações para os planos
            proposalData?.Planos.filter(
              (plan) => plan.Veiculo_Id === installation.Veiculo_Id
            ).map((plan) => {
              // pega o benefecio plano se existir
              const planBenefit = plans?.filter(
                (benefit) => benefit.Portfolio_Id === plan.Plano.Id
              );
              // verificar se exite o plano no veiculo ativo
              if ((planBenefit?.length || 0) > 0) {
                updateActiveVehicleBenefit({
                  variables: {
                    Id: planBenefit?.[0].Id,
                    PortfolioPreco_Id: plan.PlanoPreco.Id,
                  },
                });
                return;
              }
              createActiveVehicleBenefit({
                variables: {
                  Portfolio_Id: plan.Plano.Id,
                  PortfolioPreco_Id: plan.PlanoPreco.Id,
                  TipoPortfolio: 'plano',
                  VeiculoAtivo_Id: activeVehicles?.[0].Id,
                },
              });
              return;
            });

            // produtos dos beneficios
            const products = activeVehicles?.[0].Beneficios.filter(
              (benefit) => benefit.TipoPortfolio === 'produto'
            );

            await removeBenefit(products, productsIds);

            // Ações para os produtos
            proposalData?.Produtos.filter((product) => {
              return (
                product.ProdutoPreco.TipoDeRecorrencia_Id !== null &&
                product.Veiculo_Id === installation.Veiculo_Id
              );
            }).map((product) => {
              // pega o benefecio produto se existir
              const productBenefit = products?.filter(
                (benefit) => benefit.Portfolio_Id === product.Produto.Id
              );
              // verificar se exite o produto no veiculo ativo
              if ((productBenefit?.length || 0) > 0) {
                updateActiveVehicleBenefit({
                  variables: {
                    Id: productBenefit?.[0].Id,
                    PortfolioPreco_Id: product.ProdutoPreco.Id,
                  },
                });
                return;
              }
              createActiveVehicleBenefit({
                variables: {
                  Portfolio_Id: product.Produto.Id,
                  PortfolioPreco_Id: product.ProdutoPreco.Id,
                  TipoPortfolio: 'produto',
                  VeiculoAtivo_Id: activeVehicles?.[0].Id,
                },
              });
              return;
            });

            // serviços dos beneficios
            const services = activeVehicles?.[0].Beneficios.filter(
              (benefit) => benefit.TipoPortfolio === 'serviço'
            );

            await removeBenefit(services, servicesIds);

            // Ações para os serviços
            proposalData?.Servicos.filter(
              (service) =>
                !service.Servico.GeraOS &&
                service.Veiculo_Id === installation.Veiculo_Id
            ).map((service) => {
              // pega o benefecio serviço se existir
              const serviceBenefit = services?.filter(
                (benefit) => benefit.Portfolio_Id === service.Servico.Id
              );
              // verificar se exite o serviço no veiculo ativo
              if ((serviceBenefit?.length || 0) > 0) {
                updateActiveVehicleBenefit({
                  variables: {
                    Id: serviceBenefit?.[0].Id,
                    PortfolioPreco_Id: service.ServicosPreco.Id,
                  },
                });
                return;
              }
              createActiveVehicleBenefit({
                variables: {
                  Portfolio_Id: service.Servico.Id,
                  PortfolioPreco_Id: service.ServicosPreco.Id,
                  TipoPortfolio: 'serviço',
                  VeiculoAtivo_Id: activeVehicles?.[0].Id,
                },
              });
              return;
            });

            // combos dos beneficios
            const combos = activeVehicles?.[0].Beneficios.filter(
              (benefit) => benefit.TipoPortfolio === 'combo'
            );

            await removeBenefit(combos, combosIds);

            // proposalData?.Combos.filter(
            //   (combo) => combo.Veiculo_Id === installation.Veiculo_Id
            // ).map((combo) => {
            //   // confere se esse combo existe nos beneficios do veiculo ativo, caso sim ele tira do array de ids dos combos do veiculo ativo
            //   if (combosIds?.includes(combo.Combo.Id)) {
            //     combosIds = combosIds.filter(
            //       (comboId) => comboId !== combo.Combo.Id
            //     )
            //   }
            // })

            // Ações para os combos
            proposalData?.Combos.filter(
              (combo) => combo.Veiculo_Id === installation.Veiculo_Id
            ).map(async (combo) => {
              // pega os ids dos planos desse combo
              const comboPlansId = combo.Combo.Planos.map(
                (plan) => plan.Plano.Id
              );

              // verifica se existe beneficio que esse combo tem dentro, caso sim remove esse beneficio e deixa o combo
              plans?.map((plan) => {
                if (comboPlansId.includes(plan.Portfolio_Id)) {
                  disableActiveVehicleBenefit({
                    variables: {
                      Id: plan.Id,
                    },
                  });
                }
              });

              // pega os ids dos produtos que tem recorrencia desse combo
              const comboProductsId = combo.Combo.Produtos.filter(
                (product) => product.ProdutoPreco.TipoDeRecorrencia_Id !== null
              ).map((product) => product.Produto.Id);

              // verifica se existe beneficio que esse combo tem dentro, caso sim remove esse beneficio e deixa o combo
              products?.map((product) => {
                if (comboProductsId.includes(product.Portfolio_Id)) {
                  disableActiveVehicleBenefit({
                    variables: {
                      Id: product.Id,
                    },
                  });
                }
              });

              // produtos do veiculo ativo
              const vehicleProducts = activeVehicles?.[0].Produtos;

              // pega os ids dos produtos do veiculo
              const vehicleProductsIds = vehicleProducts?.map(
                (product) => product.Produto_Id
              );

              // confere se esse produto do combo não existe no veiculo ativo, caso ele não exista ele cria
              combo.Combo.Produtos.filter(
                (product) => product.ProdutoPreco.TipoDeRecorrencia_Id === null
              ).map(async (product) => {
                if (!vehicleProductsIds?.includes(product.Produto.Id)) {
                  await createActiveVehicleProduct({
                    variables: {
                      VeiculoAtivo_Id: activeVehicles?.[0].Id,
                      ProdutoPreco_Id: product.ProdutoPreco.Id,
                      Produto_Id: product.Produto.Id,
                    },
                  });
                }
              });

              // pega os ids dos serviços que não geram OS desse combo
              const comboServicesId = combo.Combo.Servicos.filter(
                (service) => !service.Servico.GeraOS
              ).map((service) => service.Servico.Id);

              // verifica se existe beneficio que esse combo tem dentro, caso sim remove esse beneficio e deixa o combo
              services?.map((service) => {
                if (comboServicesId.includes(service.Portfolio_Id)) {
                  disableActiveVehicleBenefit({
                    variables: {
                      Id: service.Id,
                    },
                  });
                }
              });

              // serviços do veiculo ativo
              const vehicleServices = activeVehicles?.[0].Servicos;

              const vehicleServicesIds = vehicleServices?.map(
                (service) => service.Servico_Id
              );

              // confere se esse produto do combo não existe no veiculo ativo, caso ele não exista ele cria
              combo.Combo.Servicos.filter(
                (service) => service.Servico.GeraOS
              ).map(async (service) => {
                if (!vehicleServicesIds?.includes(service.Servico.Id)) {
                  createActiveVehicleService({
                    variables: {
                      VeiculoAtivo_Id: activeVehicles?.[0].Id,
                      ServicoPreco_Id: service.ServicoPreco_Id,
                      Servico_Id: service.Servico.Id,
                    },
                  });
                }
              });

              // pega o benefecio combo se existir
              const comboBenefit = combos?.filter(
                (benefit) => benefit.Portfolio_Id === combo.Combo.Id
              );
              // verificar se exite o combo no veiculo ativo
              if ((comboBenefit?.length || 0) > 0) {
                updateActiveVehicleBenefit({
                  variables: {
                    Id: comboBenefit?.[0].Id,
                    PortfolioPreco_Id: combo.ComboPreco.Id,
                  },
                });
                return;
              }
              await createActiveVehicleBenefit({
                variables: {
                  Portfolio_Id: combo.Combo.Id,
                  PortfolioPreco_Id: combo.ComboPreco.Id,
                  TipoPortfolio: 'combo',
                  VeiculoAtivo_Id: activeVehicles?.[0].Id,
                },
              });
            });
            // Aceita a proposta
            await acceptProposal();
            proposalRefetch();
            return;
          }

          if (
            proposalData?.Servicos.filter((service) => {
              return (
                service.Servico.GeraOS &&
                service.Veiculo_Id === installation.Veiculo_Id
              );
            }).length === 0
          ) {
            await createActiveVehicle({
              variables: {
                Veiculo_Id: installation.Veiculo_Id,
                Cliente_Id: watch('Cliente_Id').key,
                Franquia_Id: null,
                Beneficios: benefits,
              },
            });
          }

          // Aceita a proposta
          await acceptProposal();
          proposalRefetch();
        }
      );
    });

    // proposalRefetch()
    utils.notification('Proposta aceita com sucesso', 'success');
  }

  async function removeBenefit(
    itens?: {
      Id: string;
      PortfolioPreco_Id: string;
      Portfolio_Id: string;
      TipoPortfolio: string;
    }[],
    itemsIds?: string[]
  ) {
    // itens dos beneficios para excluir
    let itensToExclude = itens;

    itens?.map((item) => {
      // confere se esse item existe nos beneficios do veiculo ativo, caso sim ele tira do array para excluir
      if (itemsIds?.includes(item.Portfolio_Id)) {
        itensToExclude = itensToExclude?.filter(
          (productToExclude) =>
            productToExclude.Portfolio_Id !== item.Portfolio_Id
        );
      }
    });

    itensToExclude?.map((item) => {
      // desativa cada item que não existir mais no beneficio
      disableActiveVehicleBenefit({
        variables: {
          Id: item.Id,
        },
      });
    });
  }

  async function refuseProposalSubmit() {
    await refuseProposal().then(() => {
      proposalRefetch();
      utils.notification('Proposta recusada com sucesso', 'success');
    });
  }

  async function onSubmit(event: {
    planos?: {
      Plano_Id: string;
      PlanoPreco_Id: string;
    }[];
    produtos?: {
      Produto_Id: string;
      ProdutoPreco_Id: string;
    }[];
    servicos?: {
      ServicosPreco_Id: string;
      Servico_Id: string;
    }[];
    combos?: {
      Combo_Id: string;
      ComboPreco_Id: string;
    }[];
    oportunidades: {
      OportunidadeProduto_Id: string | null;
      OportunidadeServico_Id: string | null;
    }[];
  }) {
    event.combos?.map((combo) => {
      createProposalCombo({
        variables: {
          Combo_Id: combo.Combo_Id,
          ComboPreco_Id: combo.ComboPreco_Id,
          Veiculo: vehicleSelected.position,
        },
      });
    });

    event.servicos?.map((service) => {
      createProposalService({
        variables: {
          Servico_Id: service.Servico_Id,
          ServicosPreco_Id: service.ServicosPreco_Id,
          Proposta_Id: router.query.id,
          Veiculo: vehicleSelected.position,
        },
      });
    });

    event.planos?.map((plan) => {
      createProposalPlan({
        variables: {
          Plano_Id: plan.Plano_Id,
          PlanoPreco_Id: plan.PlanoPreco_Id,
          Proposta_Id: router.query.id,
          Veiculo: vehicleSelected.position,
        },
      });
    });

    event.produtos?.map((product) => {
      createProposalProduct({
        variables: {
          Produto_Id: product.Produto_Id,
          Proposta_Id: router.query.id,
          ProdutoPreco_Id: product.ProdutoPreco_Id,
          Veiculo: vehicleSelected.position,
        },
      });
    });

    event.oportunidades.map((upSelling) => {
      createProposalUpSelling({
        variables: {
          OportunidadeProduto_Id: upSelling.OportunidadeProduto_Id,
          OportunidadeServico_Id: upSelling.OportunidadeServico_Id,
          Proposta_Id: router.query.id,
          Veiculo: vehicleSelected.position,
        },
      });
    });

    setProposalArrayLoading(true);
    await getProposalArray(vehicleSelected.position).then((proposal) => {
      setProposalArray(proposal);
      setShowAddVehicleButton(true);
    });
    setProposalArrayLoading(false);
  }

  function addVehicle() {
    setVehiclesGroup((lastArray) => {
      setVehicleSelected({
        Id: null,
        content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
        position: lastArray[lastArray.length - 1].position + 1,
      });
      return [
        ...lastArray,
        {
          Id: null,
          content: { title: 'Veículo ', subtitle: 'Sem vínculo' },
          position: lastArray[lastArray.length - 1].position + 1,
        },
      ];
    });
    setShowAddVehicleButton(false);
  }

  async function refetchArraysData(action = 'update') {
    setProposalArrayLoading(true);
    await getProposalArray(vehicleSelected.position).then((proposal) =>
      setProposalArray(proposal)
    );
    if (action === 'delete') {
      setVehiclesGroup(
        vehiclesGroup.filter(
          (vehicle) => vehicle.position !== vehicleSelected.position
        )
      );
      setVehicleSelected(vehiclesGroup[0]);
    }
    setProposalArrayLoading(false);
  }

  useEffect(() => {
    refetchArraysData();
  }, [vehicleSelected, router.query.id]);

  useEffect(() => {
    vehiclesGroup.map((item) => {
      if (item.position === vehicleSelected.position) {
        setVehicleSelected(item);
      }
    });
  }, [vehiclesGroup]);

  useEffect(() => {
    const vehiclesArray: number[] = [];
    const vehicles: (
      | {
          Id: string;
          Placa?: string;
          Apelido?: string;
          NumeroDoChassi?: string;
          Categoria_Id?: string;
        }
      | undefined
      | null
    )[] = [];

    async function setVehicles() {
      await Promise.all(
        proposalData!.Combos.map(async (combo) => {
          if (!vehiclesArray.includes(combo.Veiculo)) {
            vehiclesArray.push(combo.Veiculo);
            const vehicle =
              combo.Veiculo_Id === null
                ? undefined
                : await getVehicleById(combo.Veiculo_Id as string);
            vehicles.push(vehicle?.data === undefined ? null : vehicle.data);
          }
        })
      );
      await Promise.all(
        proposalData!.Planos.map(async (plan) => {
          if (!vehiclesArray.includes(plan.Veiculo)) {
            vehiclesArray.push(plan.Veiculo);
            let vehicle: any | undefined = undefined;
            vehicle =
              plan.Veiculo_Id !== null
                ? await getVehicleById(plan.Veiculo_Id as string)
                : undefined;

            vehicles.push(vehicle?.data === undefined ? null : vehicle.data);
          }
        })
      );
      await Promise.all(
        proposalData!.Produtos.map(async (product) => {
          if (!vehiclesArray.includes(product.Veiculo)) {
            vehiclesArray.push(product.Veiculo);
            const vehicle =
              product.Veiculo_Id === null
                ? undefined
                : await getVehicleById(product.Veiculo_Id as string);
            vehicles.push(vehicle?.data === undefined ? null : vehicle.data);
          }
        })
      );
      await Promise.all(
        proposalData!.Servicos.map(async (service) => {
          if (!vehiclesArray.includes(service.Veiculo)) {
            vehiclesArray.push(service.Veiculo);
            const vehicle =
              service.Veiculo_Id === null
                ? undefined
                : await getVehicleById(service.Veiculo_Id as string);
            vehicles.push(vehicle?.data === undefined ? null : vehicle.data);
          }
        })
      );
      const vehicleGroup = vehiclesArray.map((position, index) => {
        return {
          Id: vehicles[index]?.Id || null,
          content: {
            title: 'Veículo ',
            subtitle:
              vehicles[index] !== null
                ? `${vehicles[index]?.Apelido} - ${
                    vehicles[index]?.Placa !== null
                      ? vehicles[index]?.Placa
                      : vehicles[index]?.NumeroDoChassi?.substring(0, 10)
                  }`
                : 'Sem vínculo',
          },
          position,
        };
      });
      if (proposalData?.Cliente_Id) {
        getProposalClienteById(proposalData?.Cliente_Id).then((client) => {
          setValue('Cliente_Id', {
            key: client?.Id,
            title: client?.Pessoa.Nome,
          });
        });
      }
      setVehiclesGroup(
        vehicleGroup.sort((item1, item2) => item1.position - item2.position)
      );
    }
    if (proposalData) {
      setVehicles();
    }
  }, [proposalData]);

  return (
    <main className="col-span-12">
      <form>
        {' '}
        <common.Card>
          <div className="flex">
            <div className="flex-1">
              <common.GenericTitle
                title={`Itens da proposta`}
                subtitle="Selecione combos, planos, serviços e produtos"
                className="px-6"
              />
            </div>

            <div className="mx-6">
              {generateProposal ? (
                <common.buttons.CancelButton
                  onClick={() => setGenerateProposal(false)}
                  title="Cancelar"
                />
              ) : (
                <common.buttons.SecondaryButton
                  handler={() => setGenerateProposal(true)}
                  title="Gerar proposta"
                />
              )}
            </div>
          </div>

          <common.Separator />
          <common.form.FormLine grid={12} position={1}>
            <Controller
              control={control}
              name="Cliente_Id"
              render={({ field: { onChange, value } }) => (
                <div className="flex col-span-7 gap-2">
                  <div className="flex-1">
                    <common.form.Select
                      itens={
                        clientsData
                          ? clientsData.map((item) => {
                              return {
                                key: item.Id,
                                title: item.Pessoa?.Nome as string,
                              };
                            })
                          : []
                      }
                      value={value}
                      onChange={onChange}
                      label="Cliente"
                      disabled={
                        proposalData?.Situacao.Valor !== 'criado' ||
                        router.query.origin === 'changeOwnership'
                      }
                    />
                    <common.OpenModalLink
                      onClick={() =>
                        setSlidePanelState({ open: true, type: 'createClient' })
                      }
                    >
                      Cadastrar Cliente
                    </common.OpenModalLink>
                  </div>
                  <div className="flex items-center justify-center h-10">
                    <common.buttons.SecondaryButton
                      handler={addClientToProposalSubmit}
                      title={<common.icons.CheckIcon />}
                      type="button"
                      disabled={
                        proposalData?.Situacao.Valor !== 'criado' ||
                        router.query.origin === 'changeOwnership'
                      }
                    />
                  </div>
                </div>
              )}
            />

            <div className="flex justify-end col-span-5 gap-4">
              <div className="flex h-10">
                <common.buttons.CancelButton
                  title={
                    proposalData?.Situacao.Valor === 'recusado'
                      ? 'Proposta recusada'
                      : 'Recusar proposta'
                  }
                  disabled={
                    proposalData?.Situacao.Valor !== 'criado' ||
                    proposalData.Cliente_Id === null ||
                    (proposalInstallationsData?.length || 0) <
                      vehiclesGroup.length
                  }
                  onClick={() => refuseProposalSubmit()}
                  className="my-0"
                />
              </div>

              <div className="flex h-10">
                <common.buttons.PrimaryButton
                  title={
                    proposalData?.Situacao.Valor === 'aceito'
                      ? 'Proposta aceita'
                      : 'Aceitar proposta'
                  }
                  disabled={
                    proposalData?.Situacao.Valor !== 'criado' ||
                    proposalData.Cliente_Id === null ||
                    (proposalInstallationsData?.length || 0) <
                      vehiclesGroup.length
                  }
                  onClick={() => acceptProposalSubmit()}
                  type="button"
                  className="my-0"
                />
              </div>
            </div>
          </common.form.FormLine>
        </common.Card>
        <div className="grid grid-cols-6 mt-4">
          {!generateProposal && (
            <blocks.SideBarTabs
              array={vehiclesGroup}
              setArray={setVehiclesGroup}
              onChange={setVehicleSelected}
              allowAdding={
                showAddVehicleButton &&
                proposalData?.Situacao.Valor === 'criado' &&
                router.query.origin === undefined
              }
              addFunction={addVehicle}
              selectedItem={vehicleSelected}
              loading={proposalData === undefined}
            />
          )}

          <div className={`${generateProposal ? 'col-span-6' : 'col-span-5'} `}>
            {proposalArray ? (
              renderCreateVehicle()
            ) : (
              <proposals.VehicleSkeleton />
            )}
          </div>
        </div>
      </form>
      <proposals.SlidePanel />
    </main>
  );
};

export default ProposalDetails;
