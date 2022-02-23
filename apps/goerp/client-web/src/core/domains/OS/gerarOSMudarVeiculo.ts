import {
  operacional_OrdemDeServico_Situacoes_enum,
  operacional_OrdemDeServico_Tipo_enum
} from '&erp/graphql/generated/zeus'
import {
  useTypedClientMutation,
  useTypedClientQuery
} from '&erp/graphql/generated/zeus/apollo'

type GerarOSProps = {
  proposal: {
    Id: string
    Cliente_Id?: string
    Veiculos: {
      Veiculo_Id?: string
      PropostasCombos: {
        Id: string
        PropostaVeiculo_Id?: string
        created_at: Date
        Combo: {
          Id: string
          Servicos: {
            Servico: {
              GeraOS: boolean
              Id: string
              PrestadoresDeServicos: {
                Precos: {
                  Id: string
                  TipoDePreco?: { Valor: string }
                }[]
              }[]
            }
          }[]

          Produtos: {
            Id: string
            Produto: {
              Id: string
              ServicoDeDesinstalacao?: {
                Id: string
                PrestadoresDeServicos: {
                  Prestador_Id: string
                  Precos: {
                    Id: string
                    TipoDePreco?: { Valor: string }
                  }[]
                }[]
              }
              Fornecedores: {
                Precos: {
                  Id: string
                  Valor: string
                  TipoDePreco?: { Valor: string }
                }[]
              }[]
            }
          }[]

          Planos: {
            Id: string
            created_at: Date
            Plano: {
              Id: string
              Produtos: {
                Produto: {
                  Id: string
                  ServicoDeDesinstalacao?: {
                    Id: string
                    PrestadoresDeServicos: {
                      Prestador_Id: string
                      Precos: {
                        Id: string
                        TipoDePreco?: { Valor: string }
                      }[]
                    }[]
                  }
                  Fornecedores: {
                    Precos: {
                      Id: string
                      Valor: string
                      TipoDePreco?: { Valor: string }
                    }[]
                  }[]
                }
              }[]

              Servicos: {
                Id: string
                created_at: Date
                Servico: {
                  Id: string
                  Nome: string
                  GeraOS: boolean
                  PrestadoresDeServicos: {
                    Prestador_Id: string
                    Precos: {
                      Id: string
                      TipoDePreco?: { Valor: string }
                    }[]
                  }[]
                }
              }[]
            }
            PlanoPreco: {
              Id: string
            }
          }[]
        }
        ComboPreco_Id: string
      }[]

      PropostasPlanos: {
        Id: string
        created_at: Date
        Plano: {
          Id: string
          Produtos: {
            Produto: {
              Id: string
              ServicoDeDesinstalacao?: {
                Id: string
                PrestadoresDeServicos: {
                  Prestador_Id: string
                  Precos: {
                    Id: string
                    TipoDePreco?: { Valor: string }
                  }[]
                }[]
              }
              Fornecedores: {
                Precos: {
                  Id: string
                  Valor: string
                  TipoDePreco?: { Valor: string }
                }[]
              }[]
            }
          }[]

          Servicos: {
            Id: string
            created_at: Date
            Servico: {
              Id: string
              Nome: string
              GeraOS: boolean
              PrestadoresDeServicos: {
                Prestador_Id: string
                Precos: {
                  Id: string
                  TipoDePreco?: { Valor: string }
                }[]
              }[]
            }
          }[]
        }
        PlanoPreco: {
          Id: string
        }
      }[]

      PropostasProdutos: {
        Id: string
        PrecoAdesao?: {
          Id: string
          TipoDePreco?: { Valor: string }
        }
        PrecoRecorrencia?: {
          Id: string
          TipoDePreco?: { Valor: string }
        }
        Produto: {
          Id: string
          ServicoDeDesinstalacao?: {
            Id: string
            PrestadoresDeServicos: {
              Prestador_Id: string
              Precos: {
                Id: string
                TipoDePreco?: { Valor: string }
              }[]
            }[]
          }
        }
        PropostaVeiculo_Id?: string
        created_at: Date
      }[]

      PropostasServicos: {
        Id: string
        created_at: Date
        Servico: {
          Id: string
          Nome: string
          GeraOS: boolean
        }
        PrecoDeAdesao?: {
          Id: string
          TipoDePreco?: { Valor: string }
        }
        PrecoDeRecorrencia?: {
          Id: string
          TipoDePreco?: { Valor: string }
        }
      }[]
    }[]

    created_at: Date
  }
}

export async function gerarOSMudarVeiculo({ proposal }: GerarOSProps) {
  try {
    const {
      data: { Configuracoes_by_pk: configData }
    } = await useTypedClientQuery({
      Configuracoes_by_pk: [
        {
          Slug: 'prestadorPrecos'
        },
        {
          Valor: [{}, true]
        }
      ]
    })

    const vehicle = proposal.Veiculos[0]
    const services = vehicle.PropostasProdutos.map((product) => {
      if (product.Produto.ServicoDeDesinstalacao !== null) {
        return {
          Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
          PrecoDeAdesao_Id:
            product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
              (provider) => provider.Prestador_Id === configData.Valor[0]
            )[0]?.Precos.filter(
              (price) => price.TipoDePreco.Valor === 'adesao'
            )[0]?.Id,
          PrecoDeRecorrencia_Id:
            product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
              (provider) => provider.Prestador_Id === configData.Valor[0]
            )[0]?.Precos.filter(
              (price) => price.TipoDePreco.Valor === 'recorrencia'
            )[0]?.Id
        }
      }
    })

    vehicle.PropostasPlanos.map((plan) => {
      plan.Plano.Produtos.map((product) => {
        if (product.Produto.ServicoDeDesinstalacao !== null) {
          services.push({
            Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
            PrecoDeAdesao_Id:
              product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
            PrecoDeRecorrencia_Id:
              product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
          })
        }
      })
    })

    vehicle.PropostasCombos.map((combo) => {
      combo.Combo.Produtos.map((product) => {
        if (product.Produto.ServicoDeDesinstalacao !== null) {
          services.push({
            Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
            PrecoDeAdesao_Id:
              product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
            PrecoDeRecorrencia_Id:
              product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                (provider) => provider.Prestador_Id === configData.Valor[0]
              )[0]?.Precos.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
          })
        }
      })

      combo.Combo.Planos.map((plan) => {
        plan.Plano.Produtos.map((product) => {
          if (product.Produto.ServicoDeDesinstalacao !== null) {
            services.push({
              Servico_Id: product.Produto.ServicoDeDesinstalacao.Id,
              PrecoDeAdesao_Id:
                product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                  (provider) => provider.Prestador_Id === configData.Valor[0]
                )[0]?.Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'adesao'
                )[0]?.Id,
              PrecoDeRecorrencia_Id:
                product.Produto.ServicoDeDesinstalacao.PrestadoresDeServicos.filter(
                  (provider) => provider.Prestador_Id === configData.Valor[0]
                )[0]?.Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'recorrencia'
                )[0]?.Id
            })
          }
        })
      })
    })

    const filteredServices: {
      Servico_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
    }[] = []

    services
      .filter((service) => service !== undefined)
      .map((service) => {
        const duplicatedPosition = filteredServices.findIndex(
          (filteredService) =>
            service?.Servico_Id === filteredService.Servico_Id
        )

        if (!(duplicatedPosition > -1)) {
          filteredServices.push({
            Servico_Id: service?.Servico_Id as string,
            PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
            PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id
          })
        }
      })

    const result = await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Tipo_Id: operacional_OrdemDeServico_Tipo_enum.desinstalacao,
            Proposta_Id: proposal.Id,
            Veiculo_Id: vehicle.Veiculo_Id,
            Servicos: {
              data: filteredServices
            },
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta
          }
        },
        {
          Id: true
        }
      ]
    })
      .then(() => {
        return 'success'
      })
      .catch((err) => {
        console.log(err)
        return 'fail'
      })

    const secondVehicle = proposal.Veiculos[1]
    const filteredBenefits: {
      Portfolio_Id: string
      TipoPortfolio: string
      PortfolioPreco_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
      created_at: Date
    }[] = []

    const benefits = secondVehicle.PropostasServicos.filter(
      (service) => !service.Servico.GeraOS
    ).map((service) => {
      return {
        Portfolio_Id: service.Servico.Id,
        TipoPortfolio: 'serviço',
        PortfolioPreco_Id: null,
        PrecoDeAdesao_Id: service.PrecoDeAdesao.Id,
        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia.Id,
        created_at: service.created_at
      }
    })

    benefits.push(
      ...secondVehicle.PropostasPlanos.map((plan) => {
        return {
          Portfolio_Id: plan.Plano.Id,
          TipoPortfolio: 'plano',
          PortfolioPreco_Id: plan.PlanoPreco.Id,
          PrecoDeAdesao_Id: null,
          PrecoDeRecorrencia_Id: null,
          created_at: plan.created_at
        }
      })
    )

    benefits.push(
      ...secondVehicle.PropostasCombos.map((combo) => {
        return {
          Portfolio_Id: combo.Combo.Id,
          TipoPortfolio: 'combo',
          PortfolioPreco_Id: combo.ComboPreco_Id,
          created_at: combo.created_at,
          PrecoDeAdesao_Id: null,
          PrecoDeRecorrencia_Id: null
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
            benefit.created_at > filteredBenefits[duplicatedPosition].created_at
              ? benefit.PortfolioPreco_Id
              : filteredBenefits[duplicatedPosition].PortfolioPreco_Id,
          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
        }
      }

      if (!(duplicatedPosition > -1)) {
        filteredBenefits.push({
          Portfolio_Id: benefit.Portfolio_Id,
          TipoPortfolio: benefit.TipoPortfolio,
          PortfolioPreco_Id: benefit.PortfolioPreco_Id,
          PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id,
          created_at: benefit.created_at
        })
      }
    })

    const installationServices = secondVehicle.PropostasServicos.filter(
      (service) => service.Servico.GeraOS
    ).map((service) => {
      return {
        Servico_Id: service.Servico.Id,
        PrecoDeAdesao_Id: service.PrecoDeAdesao?.Id,
        PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia?.Id
      }
    })

    secondVehicle.PropostasPlanos.filter((plan) => {
      if (
        plan.Plano.Servicos.filter((service) => service.Servico.GeraOS).length >
        0
      ) {
        return true
      }
    }).map((plan) => {
      installationServices.push(
        ...plan.Plano.Servicos.filter((service) => service.Servico.GeraOS).map(
          (service) => {
            const price = service.Servico.PrestadoresDeServicos[0].Precos
            return {
              Servico_Id: service.Servico.Id,
              PrecoDeAdesao_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          }
        )
      )
    })

    secondVehicle.PropostasCombos.filter((combo) => {
      if (
        combo.Combo.Servicos.filter((service) => service.Servico.GeraOS)
          .length > 0 ||
        combo.Combo.Planos.filter(
          (plan) =>
            plan.Plano.Servicos.filter((service) => service.Servico.GeraOS)
              .length > 0
        ).length > 0
      ) {
        return true
      }
    }).map((combo) => {
      installationServices.push(
        ...combo.Combo.Servicos.filter((service) => service.Servico.GeraOS).map(
          (service) => {
            const price = service.Servico.PrestadoresDeServicos[0].Precos
            return {
              Servico_Id: service.Servico.Id,
              PrecoDeAdesao_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          }
        )
      )

      combo.Combo.Planos.filter((plan) => {
        if (
          plan.Plano.Servicos.filter((service) => service.Servico.GeraOS)
            .length > 0
        ) {
          return true
        }
      }).map((plan) => {
        installationServices.push(
          ...plan.Plano.Servicos.filter(
            (service) => service.Servico.GeraOS
          ).map((service) => {
            const price = service.Servico.PrestadoresDeServicos[0].Precos
            return {
              Servico_Id: service.Servico.Id,
              PrecoDeAdesao_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          })
        )
      })
    })

    const secondFilteredServices: {
      Servico_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
    }[] = []

    installationServices.map((service) => {
      const duplicatedPosition = secondFilteredServices.findIndex(
        (filteredService) => service.Servico_Id === filteredService.Servico_Id
      )

      if (!(duplicatedPosition > -1)) {
        secondFilteredServices.push({
          Servico_Id: service.Servico_Id,
          PrecoDeAdesao_Id: service.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: service.PrecoDeRecorrencia_Id
        })
      }
    })

    const products = secondVehicle.PropostasProdutos.map((product) => {
      return {
        Produto_Id: product.Produto.Id,
        PrecoDeAdesao_Id: product.PrecoAdesao.Id,
        PrecoDeRecorrencia_Id: product.PrecoRecorrencia.Id
      }
    })

    secondVehicle.PropostasPlanos.map((plan) => {
      products.push(
        ...plan.Plano.Produtos.map((product) => {
          const price = product.Produto.Fornecedores[0].Precos
          return {
            Produto_Id: product.Produto.Id,
            PrecoDeAdesao_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'adesao'
            )[0]?.Id,
            PrecoDeRecorrencia_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'recorrencia'
            )[0]?.Id
          }
        })
      )
    })

    secondVehicle.PropostasCombos.map((combo) => {
      products.push(
        ...combo.Combo.Produtos.map((product) => {
          const price = product.Produto.Fornecedores[0].Precos
          return {
            Produto_Id: product.Produto.Id,
            PrecoDeAdesao_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'adesao'
            )[0]?.Id,
            PrecoDeRecorrencia_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'recorrencia'
            )[0]?.Id
          }
        })
      )

      combo.Combo.Planos.map((plan) => {
        products.push(
          ...plan.Plano.Produtos.map((product) => {
            const price = product.Produto.Fornecedores[0].Precos
            return {
              Produto_Id: product.Produto.Id,
              PrecoDeAdesao_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: price.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          })
        )
      })
    })

    const filteredProducts: {
      Produto_Id: string
      PrecoDeAdesao_Id: string
      PrecoDeRecorrencia_Id: string
    }[] = []

    products.map((product) => {
      const duplicatedPosition = filteredProducts.findIndex(
        (filteredProduct) => product.Produto_Id === filteredProduct.Produto_Id
      )

      if (!(duplicatedPosition > -1)) {
        filteredProducts.push({
          Produto_Id: product.Produto_Id,
          PrecoDeAdesao_Id: product.PrecoDeAdesao_Id,
          PrecoDeRecorrencia_Id: product.PrecoDeRecorrencia_Id
        })
      }
    })

    return await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
            Proposta_Id: proposal.Id,
            Veiculo_Id: secondVehicle.Veiculo_Id,
            Tipo_Id: operacional_OrdemDeServico_Tipo_enum.instalacao,
            Atividades: {
              data: [
                {
                  Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
                  Usuario_Id: '7fd2e5d7-a4c4-485b-8675-e56052e3ff5f'
                }
              ]
            },
            Beneficios: {
              data: filteredBenefits.map((benefit) => {
                return {
                  Portfolio_Id: benefit.Portfolio_Id,
                  TipoPortfolio: benefit.TipoPortfolio,
                  PortfolioPreco_Id: benefit.PortfolioPreco_Id,
                  PrecoDeAdesao_Id: benefit.PrecoDeAdesao_Id,
                  PrecoDeRecorrencia_Id: benefit.PrecoDeRecorrencia_Id
                }
              })
            },
            Servicos: {
              data: secondFilteredServices
            },
            Produtos: {
              data: filteredProducts
            }
          }
        },
        { Id: true }
      ]
    })
      .then(() => {
        return result + '- success'
      })
      .catch((err) => {
        console.log(err)
        return 'fail'
      })
  } catch (err) {
    console.log(err)
    return err
  }
}
