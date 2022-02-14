import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as common from '@comigo/ui-common'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { ptBRtimeStamp } from '@comigo/utils'

type FormData = {
  DataAgendamento: Date
  Tipo: {
    key: string
    title: string
  }
  Proposta: {
    key: serviceOrders.Proposal
    title: string
  }
  Veiculo: {
    key: string
    title: string
  }
}

export function Create() {
  const [vehiclesId, setVehiclesId] = useState<string[]>([])
  const {
    createServiceOrderLoading,
    createServiceOrder,
    setSlidePanelState,
    serviceOrdersRefetch,
    serviceOrderschema,
    serviceOrdersTypesData,
    proposalsData,
    vehiclesData,
    getActiveVehicleById,
    configData
  } = serviceOrders.useServiceOrder()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(serviceOrderschema)
  })
  const onSubmit = async (formData: FormData) => {
    if (formData.Tipo.key === 'desinstalacao') {
      formData.Proposta.key.Veiculos.filter(
        (vehicle) => vehicle.Veiculo_Id === formData.Veiculo.key
      ).map((vehicle) => {
        const services = vehicle.PropostasProdutos.map((product) => {
          if (product.Produto.ServicoDeDesinstalacao) {
            return {
              Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
              ServicoPreco_Id:
                product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                  (provider) => provider.Prestador_Id === configData.Valor[0]
                )[0].Precos[0].Id
            }
          }
        })

        vehicle.PropostasPlanos.map((plan) => {
          plan.Plano.Produtos.map((product) => {
            if (product.Produto.ServicoDeDesinstalacao) {
              services.push({
                Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
                ServicoPreco_Id:
                  product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                    (provider) => provider.Prestador_Id === configData.Valor[0]
                  )[0].Precos[0].Id
              })
            }
          })
        })

        vehicle.PropostasCombos.map((combo) => {
          combo.Combo.Produtos.map((product) => {
            if (product.Produto.ServicoDeDesinstalacao) {
              services.push({
                Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
                ServicoPreco_Id:
                  product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                    (provider) => provider.Prestador_Id === configData.Valor[0]
                  )[0].Precos[0].Id
              })
            }
          })

          combo.Combo.Planos.map((plan) => {
            plan.Plano.Produtos.map((product) => {
              if (product.Produto.ServicoDeDesinstalacao) {
                services.push({
                  Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
                  ServicoPreco_Id:
                    product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                      (provider) =>
                        provider.Prestador_Id === configData.Valor[0]
                    )[0].Precos[0].Id
                })
              }
            })
          })
        })

        const filteredServices: {
          Servico_Id: string
          ServicoPreco_Id: string
        }[] = []

        services.map((service) => {
          const duplicatedPosition = filteredServices.findIndex(
            (filteredService) =>
              service?.Servico_Id === filteredService.Servico_Id
          )

          if (!(duplicatedPosition > -1)) {
            filteredServices.push({
              Servico_Id: service?.Servico_Id as string,
              ServicoPreco_Id: service?.ServicoPreco_Id as string
            })
          }
        })

        createServiceOrder({
          variables: {
            Tipo_Id: formData.Tipo.key,
            Proposta_Id: formData.Proposta.key.Id,
            Veiculo_Id: formData.Veiculo.key,
            Beneficios: [],
            Servicos: filteredServices,
            Produtos: []
          }
        })
          .then(() => {
            serviceOrdersRefetch()
            setSlidePanelState((oldState) => {
              return { ...oldState, open: false }
            })
            utils.notification(
              'Ordem de serviço cadastrada com sucesso',
              'success'
            )
          })
          .catch((err) => {
            utils.showError(err)
          })
      })
      return
    }
    const activeVehicle = await getActiveVehicleById(
      formData.Proposta.key.Cliente_Id,
      formData.Veiculo.key
    )
    const activeVehicleProducts =
      activeVehicle.length > 0
        ? activeVehicle[0].Produtos.map((product) => product.Produto_Id)
        : []

    const activeVehicleServices =
      activeVehicle.length > 0
        ? activeVehicle[0].Servicos.map((service) => service.Servico_Id)
        : []

    const activeVehicleBenefits =
      activeVehicle.length > 0
        ? activeVehicle[0].Beneficios.map((benefits) => benefits.Portfolio_Id)
        : []

    const filteredBenefits: {
      Portfolio_Id: string
      TipoPortfolio: string
      PortfolioPreco_Id: string
      created_at: Date
    }[] = []

    formData.Proposta.key.Veiculos.filter(
      (vehicle) => vehicle.Veiculo_Id === formData.Veiculo.key
    ).map((vehicle) => {
      const benefits = vehicle.PropostasServicos.filter(
        (service) =>
          !service.Servico.GeraOS &&
          !activeVehicleBenefits.includes(service.Servico.Id)
      ).map((service) => {
        return {
          Portfolio_Id: service.Servico.Id,
          TipoPortfolio: 'serviço',
          PortfolioPreco_Id: service.ServicosPreco.Id,
          created_at: service.created_at
        }
      })

      benefits.push(
        ...vehicle.PropostasProdutos.filter(
          (product) =>
            product.ProdutoPreco.TipoDeRecorrencia_Id !== null &&
            !activeVehicleBenefits.includes(product.Produto.Id)
        ).map((product) => {
          return {
            Portfolio_Id: product.Produto.Id,
            TipoPortfolio: 'produto',
            PortfolioPreco_Id: product.ProdutoPreco.Id,
            created_at: product.created_at
          }
        })
      )

      benefits.push(
        ...vehicle.PropostasPlanos.filter(
          (plan) => !activeVehicleBenefits.includes(plan.Plano.Id)
        ).map((plan) => {
          return {
            Portfolio_Id: plan.Plano.Id,
            TipoPortfolio: 'plano',
            PortfolioPreco_Id: plan.PlanoPreco.Id,
            created_at: plan.created_at
          }
        })
      )

      benefits.push(
        ...vehicle.PropostasCombos.filter(
          (combo) => !activeVehicleBenefits.includes(combo.Combo.Id)
        ).map((combo) => {
          return {
            Portfolio_Id: combo.Combo.Id,
            TipoPortfolio: 'combo',
            PortfolioPreco_Id: combo.ComboPreco_Id,
            created_at: combo.created_at
          }
        })
      )

      benefits.map((benefit) => {
        const duplicatedPosition = filteredBenefits.findIndex(
          (filteredBenefit) =>
            benefit.Portfolio_Id === filteredBenefit.Portfolio_Id &&
            benefit.TipoPortfolio === filteredBenefit.TipoPortfolio
        )

        if (duplicatedPosition > -1) {
          filteredBenefits[duplicatedPosition] = {
            Portfolio_Id: benefit.Portfolio_Id,
            TipoPortfolio: benefit.TipoPortfolio,
            created_at: benefit.created_at,
            PortfolioPreco_Id:
              benefit.created_at >
              filteredBenefits[duplicatedPosition].created_at
                ? benefit.PortfolioPreco_Id
                : filteredBenefits[duplicatedPosition].PortfolioPreco_Id
          }
        }

        if (!(duplicatedPosition > -1)) {
          filteredBenefits.push({
            Portfolio_Id: benefit.Portfolio_Id,
            TipoPortfolio: benefit.TipoPortfolio,
            PortfolioPreco_Id: benefit.PortfolioPreco_Id,
            created_at: benefit.created_at
          })
        }
      })

      const installationServices = vehicle.PropostasServicos.filter(
        (service) =>
          service.Servico.GeraOS &&
          !activeVehicleServices.includes(service.Servico.Id)
      ).map((service) => {
        return {
          Servico_Id: service.Servico.Id,
          ServicoPreco_Id: service.ServicosPreco.Id
        }
      })

      vehicle.PropostasPlanos.filter((plan) => {
        if (
          plan.Plano.Servicos.filter(
            (service) =>
              service.Servico.GeraOS &&
              !activeVehicleServices.includes(service.Servico.Id)
          ).length > 0
        ) {
          return true
        }
      }).map((plan) => {
        installationServices.push(
          ...plan.Plano.Servicos.filter(
            (service) =>
              service.Servico.GeraOS &&
              !activeVehicleServices.includes(service.Servico.Id)
          ).map((service) => {
            return {
              Servico_Id: service.Servico.Id,
              ServicoPreco_Id: service.ServicoPreco.Id
            }
          })
        )
      })

      vehicle.PropostasCombos.filter((combo) => {
        if (
          combo.Combo.Servicos.filter(
            (service) =>
              service.Servico.GeraOS &&
              !activeVehicleServices.includes(service.Servico.Id)
          ).length > 0 ||
          combo.Combo.Planos.filter(
            (plan) =>
              plan.Plano.Servicos.filter(
                (service) =>
                  service.Servico.GeraOS &&
                  !activeVehicleServices.includes(service.Servico.Id)
              ).length > 0
          ).length > 0
        ) {
          return true
        }
      }).map((combo) => {
        installationServices.push(
          ...combo.Combo.Servicos.filter(
            (service) =>
              service.Servico.GeraOS &&
              !activeVehicleServices.includes(service.Servico.Id)
          ).map((service) => {
            return {
              Servico_Id: service.Servico.Id,
              ServicoPreco_Id: service.ServicosPreco.Id
            }
          })
        )

        combo.Combo.Planos.filter((plan) => {
          if (
            plan.Plano.Servicos.filter(
              (service) =>
                service.Servico.GeraOS &&
                !activeVehicleServices.includes(service.Servico.Id)
            ).length > 0
          ) {
            return true
          }
        }).map((plan) => {
          installationServices.push(
            ...plan.Plano.Servicos.filter(
              (service) =>
                service.Servico.GeraOS &&
                !activeVehicleServices.includes(service.Servico.Id)
            ).map((service) => {
              return {
                Servico_Id: service.Servico.Id,
                ServicoPreco_Id: service.ServicoPreco.Id
              }
            })
          )
        })
      })

      const filteredServices: {
        Servico_Id: string
        ServicoPreco_Id: string
      }[] = []

      installationServices.map((service) => {
        const duplicatedPosition = filteredServices.findIndex(
          (filteredService) => service.Servico_Id === filteredService.Servico_Id
        )

        if (!(duplicatedPosition > -1)) {
          filteredServices.push({
            Servico_Id: service.Servico_Id,
            ServicoPreco_Id: service.ServicoPreco_Id
          })
        }
      })

      const products = vehicle.PropostasProdutos.filter(
        (product) =>
          product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
          !activeVehicleProducts.includes(product.Produto.Id)
      ).map((product) => {
        return {
          Produto_Id: product.Produto.Id,
          ProdutoPreco_Id: product.ProdutoPreco.Id
        }
      })

      vehicle.PropostasPlanos.filter((plan) => {
        if (
          plan.Plano.Produtos.filter(
            (product) =>
              product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
              !activeVehicleProducts.includes(product.Produto.Id)
          ).length > 0
        ) {
          return true
        }
      }).map((plan) => {
        products.push(
          ...plan.Plano.Produtos.filter(
            (product) =>
              product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
              !activeVehicleProducts.includes(product.Produto.Id)
          ).map((product) => {
            return {
              Produto_Id: product.Produto.Id,
              ProdutoPreco_Id: product.ProdutoPreco.Id
            }
          })
        )
      })

      vehicle.PropostasCombos.filter((combo) => {
        if (
          combo.Combo.Produtos.filter(
            (product) =>
              product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
              !activeVehicleProducts.includes(product.Produto.Id)
          ).length > 0 ||
          combo.Combo.Planos.filter(
            (plan) =>
              plan.Plano.Produtos.filter(
                (product) =>
                  product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
                  !activeVehicleProducts.includes(product.Produto.Id)
              ).length > 0
          ).length > 0
        ) {
          return true
        }
      }).map((combo) => {
        products.push(
          ...combo.Combo.Produtos.filter(
            (product) =>
              product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
              !activeVehicleProducts.includes(product.Produto.Id)
          ).map((product) => {
            return {
              Produto_Id: product.Produto.Id,
              ProdutoPreco_Id: product.ProdutoPreco.Id
            }
          })
        )

        combo.Combo.Planos.filter((plan) => {
          if (
            plan.Plano.Produtos.filter(
              (product) =>
                product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
                !activeVehicleProducts.includes(product.Produto.Id)
            ).length > 0
          ) {
            return true
          }
        }).map((plan) => {
          products.push(
            ...plan.Plano.Produtos.filter(
              (product) =>
                product.ProdutoPreco.TipoDeRecorrencia_Id === null &&
                !activeVehicleProducts.includes(product.Produto.Id)
            ).map((product) => {
              return {
                Produto_Id: product.Produto.Id,
                ProdutoPreco_Id: product.ProdutoPreco.Id
              }
            })
          )
        })
      })

      const filteredProducts: {
        Produto_Id: string
        ProdutoPreco_Id: string
      }[] = []

      products.map((product) => {
        const duplicatedPosition = filteredProducts.findIndex(
          (filteredProduct) => product.Produto_Id === filteredProduct.Produto_Id
        )

        if (!(duplicatedPosition > -1)) {
          filteredProducts.push({
            Produto_Id: product.Produto_Id,
            ProdutoPreco_Id: product.ProdutoPreco_Id
          })
        }
      })

      createServiceOrder({
        variables: {
          Tipo_Id: formData.Tipo.key,
          Proposta_Id: formData.Proposta.key.Id,
          Veiculo_Id: formData.Veiculo.key,
          Beneficios: filteredBenefits.map((benefit) => {
            return {
              Portfolio_Id: benefit.Portfolio_Id,
              TipoPortfolio: benefit.TipoPortfolio,
              PortfolioPreco_Id: benefit.PortfolioPreco_Id
            }
          }),
          Servicos: filteredServices,
          Produtos: filteredProducts
        }
      })
        .then(() => {
          serviceOrdersRefetch()
          setSlidePanelState((oldState) => {
            return { ...oldState, open: false }
          })
          utils.notification(
            'Ordem de serviço cadastrada com sucesso',
            'success'
          )
        })
        .catch((err) => {
          utils.showError(err)
        })
    })
  }

  useEffect(() => {
    if (watch('Proposta')) {
      const vehiclesIds = watch('Proposta').key.Veiculos.map(
        (vehicle: { Veiculo_Id: string }) => vehicle.Veiculo_Id
      )

      setVehiclesId(vehiclesIds)
      setValue('Veiculo', undefined)
    }
  }, [watch('Proposta')])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Tipo"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  serviceOrdersTypesData
                    ? serviceOrdersTypesData.map((vehicleCategory) => {
                        return {
                          key: vehicleCategory.Valor,
                          title: vehicleCategory.Comentario
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Tipo}
                label="Tipo"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Proposta"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  proposalsData
                    ? proposalsData.map((proposal) => {
                        return {
                          key: proposal,
                          title: ptBRtimeStamp(proposal.created_at)
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Proposta}
                label="Proposta"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Veiculo"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
              <common.form.Select
                itens={
                  vehiclesData
                    ? vehiclesData
                        .filter((vehicle) => vehiclesId.includes(vehicle.Id))
                        .map((vehicle) => {
                          return {
                            key: vehicle.Id,
                            title: `${
                              vehicle.Placa
                                ? vehicle.Placa
                                : vehicle.NumeroDoChassi
                            } ${vehicle.Apelido ? ' - ' + vehicle.Apelido : ''}`
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Veiculo}
                label="Veículo"
                disabled={watch('Proposta') === undefined}
              />
            </div>
          )}
        />
      </div>
      <common.Separator className="z-10" />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createServiceOrderLoading}
        loading={createServiceOrderLoading}
      />
    </form>
  )
}
