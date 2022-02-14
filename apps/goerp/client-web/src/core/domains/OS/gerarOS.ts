import * as OS from '&erp/domains/operational/ServiceOrders'
import {
  operacional_OrdemDeServico_Situacoes_enum,
  operacional_OrdemDeServico_Tipo_enum
} from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'

type GerarOSProps = {
  proposal: OS.Proposal
  type: operacional_OrdemDeServico_Tipo_enum
}

export async function gerarOs({ proposal, type }: GerarOSProps) {
  const osResult = proposal.Veiculos.map(async (vehicle) => {
    const filteredBenefits: {
      Portfolio_Id: string
      TipoPortfolio: string
      PortfolioPreco_Id: string
      created_at: Date
    }[] = []

    const benefits = vehicle.PropostasServicos.filter(
      (service) => !service.Servico.GeraOS
    ).map((service) => {
      return {
        Portfolio_Id: service.Servico.Id,
        TipoPortfolio: 'serviço',
        PortfolioPreco_Id: service.ServicosPreco.Id,
        created_at: service.created_at
      }
    })

    benefits.push(
      ...vehicle.PropostasPlanos.map((plan) => {
        return {
          Portfolio_Id: plan.Plano.Id,
          TipoPortfolio: 'plano',
          PortfolioPreco_Id: plan.PlanoPreco.Id,
          created_at: plan.created_at
        }
      })
    )

    benefits.push(
      ...vehicle.PropostasCombos.map((combo) => {
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
            benefit.created_at > filteredBenefits[duplicatedPosition].created_at
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
      (service) => service.Servico.GeraOS
    ).map((service) => {
      return {
        Servico_Id: service.Servico.Id,
        ServicoPreco_Id: service.ServicosPreco.Id
      }
    })

    vehicle.PropostasPlanos.filter((plan) => {
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
            return {
              Servico_Id: service.Servico.Id,
              ServicoPreco_Id: service.ServicoPreco.Id
            }
          }
        )
      )
    })

    vehicle.PropostasCombos.filter((combo) => {
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
            return {
              Servico_Id: service.Servico.Id,
              ServicoPreco_Id: service.ServicosPreco.Id
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

    const products = vehicle.PropostasProdutos.map((product) => {
      return {
        Produto_Id: product.Produto.Id,
        ProdutoPreco_Id: product.ProdutoPreco.Id
      }
    })

    vehicle.PropostasPlanos.map((plan) => {
      products.push(
        ...plan.Plano.Produtos.map((product) => {
          return {
            Produto_Id: product.Produto.Id,
            ProdutoPreco_Id: product.ProdutoPreco.Id
          }
        })
      )
    })

    vehicle.PropostasCombos.map((combo) => {
      products.push(
        ...combo.Combo.Produtos.map((product) => {
          return {
            Produto_Id: product.Produto.Id,
            ProdutoPreco_Id: product.ProdutoPreco.Id
          }
        })
      )

      combo.Combo.Planos.map((plan) => {
        products.push(
          ...plan.Plano.Produtos.map((product) => {
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

    return await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
            Proposta_Id: proposal.Id,
            Veiculo_Id: vehicle.Veiculo_Id,
            Tipo_Id: type,
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
                  PortfolioPreco_Id: benefit.PortfolioPreco_Id
                }
              })
            },
            Servicos: {
              data: filteredServices
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
        return 'success'
      })
      .catch((err) => {
        return 'fail'
      })
  })

  return (async () => {
    const result = await Promise.all(osResult)
    return result
  })()
}
