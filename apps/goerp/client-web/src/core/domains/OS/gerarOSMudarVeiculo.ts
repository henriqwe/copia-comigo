import {
  operacional_OrdemDeServico_Situacoes_enum,
  operacional_OrdemDeServico_Tipo_enum
} from '&erp/graphql/generated/zeus'
import {
  useTypedClientMutation,
  useTypedClientQuery
} from '&erp/graphql/generated/zeus/apollo'
import { prepareOSProducts } from './prepareOSProducts'
import { prepareOSServices } from './prepareOSServices'
import { prepareOSPlans } from './prepareOSPlans'
import { prepareOSCombo } from './prepareOSCombo'
import { v4 as uuid } from 'uuid'

type GerarOSProps = {
  proposal: {
    Id: string
    Cliente_Id?: string
    Veiculos: {
      PossuiGNV: boolean
      Veiculo_Id?: string
      PropostasCombos: ProposalCombo[]

      PropostasPlanos: ProposalPlan[]

      PropostasProdutos: ProposalProduct[]

      PropostasServicos: ProposalService[]
    }[]

    created_at: Date
  }
}

export type ProposalCombo = {
  Id: string
  PropostaVeiculo_Id?: string
  created_at: Date
  Combo: {
    Id: string
  }
  ComboPreco_Id: string
  PropostasPlanos: ProposalPlan[]
  PropostasProdutos: ProposalProduct[]
  PropostasServicos: ProposalService[]
}

export type ProposalPlan = {
  Id: string
  created_at: Date
  Plano: {
    Id: string
  }
  PlanoPreco?: {
    Id: string
  }
  PropostaCombo_Id?: string
  PropostasProdutos: ProposalProduct[]
  PropostasServicos: ProposalService[]
}

export type ProposalProduct = {
  Id: string
  PropostaCombo_Id?: string
  PropostaPlano_Id?: string
  Quantidade: number
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
    Fornecedores: {
      Itens: {
        TipoDeItem_Id?: string
        Item_Id: string
      }[]
    }[]
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
}

export type ProposalService = {
  Id: string
  PropostaCombo_Id?: string
  PropostaPlano_Id?: string
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
}

// OS MUDAR VEICULO
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
            )[0]?.Id,
          Beneficio: false
        }
      }
    })

    vehicle.PropostasPlanos.map((plan) => {
      plan.PropostasProdutos.map((product) => {
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
              )[0]?.Id,
            Beneficio: false
          })
        }
      })
    })

    vehicle.PropostasCombos.map((combo) => {
      combo.PropostasProdutos.map((product) => {
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
              )[0]?.Id,
            Beneficio: false
          })
        }
      })

      combo.PropostasPlanos.map((plan) => {
        plan.PropostasProdutos.map((product) => {
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
                )[0]?.Id,
              Beneficio: false
            })
          }
        })
      })
    })

    // const filteredServices: {
    //   Servico_Id: string
    //   PrecoDeAdesao_Id: string
    //   PrecoDeRecorrencia_Id: string
    // }[] = []

    // services
    //   .filter((service) => service !== undefined)
    //   .map((service) => {
    //     const duplicatedPosition = filteredServices.findIndex(
    //       (filteredService) =>
    //         service?.Servico_Id === filteredService.Servico_Id
    //     )

    //     if (!(duplicatedPosition > -1)) {
    //       filteredServices.push({
    //         Servico_Id: service?.Servico_Id as string,
    //         PrecoDeAdesao_Id: service?.PrecoDeAdesao_Id,
    //         PrecoDeRecorrencia_Id: service?.PrecoDeRecorrencia_Id
    //       })
    //     }
    //   })

    const result = await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            PossuiGNV: vehicle.PossuiGNV,
            Tipo_Id: operacional_OrdemDeServico_Tipo_enum.desinstalacao,
            Proposta_Id: proposal.Id,
            Veiculo_Id: vehicle.Veiculo_Id,
            Servicos: {
              data: services.filter((service) => service !== undefined)
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
        console.log('insert_operacional_OrdemDeServico_one')
        console.log(err)
        return 'fail'
      })

    const secondVehicle = proposal.Veiculos[1]
    const OSUUID = uuid()

    return await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Id: OSUUID,
            Situacao_Id: operacional_OrdemDeServico_Situacoes_enum.aberta,
            PossuiGNV: secondVehicle.PossuiGNV,
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
            Servicos: {
              data: prepareOSServices(secondVehicle.PropostasServicos, 1, {
                OSUUID
              })
            },
            Produtos: {
              data: prepareOSProducts(secondVehicle.PropostasProdutos, 1, {
                OSUUID
              })
            },
            Planos: {
              data: prepareOSPlans(secondVehicle.PropostasPlanos, 1, { OSUUID })
            },
            Combos: {
              data: prepareOSCombo(secondVehicle.PropostasCombos, OSUUID)
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
        console.log('insert_operacional_OrdemDeServico_one')
        console.log(err)
        return 'fail'
      })
  } catch (err) {
    console.log(err)
    return err
  }
}
