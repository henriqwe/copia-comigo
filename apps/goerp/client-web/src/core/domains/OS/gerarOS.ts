import {
  operacional_OrdemDeServico_Situacoes_enum,
  operacional_OrdemDeServico_Tipo_enum
} from '&erp/graphql/generated/zeus'
import { useTypedClientMutation } from '&erp/graphql/generated/zeus/apollo'
import { v4 as uuid } from 'uuid'
import { prepareOSProducts } from './prepareOSProducts'
import { prepareOSServices } from './prepareOSServices'
import { prepareOSPlans } from './prepareOSPlans'
import { prepareOSCombo } from './prepareOSCombo'

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
  type: operacional_OrdemDeServico_Tipo_enum
  vehicles: string[]
}

type ProposalCombo = {
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

type ProposalPlan = {
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

type ProposalProduct = {
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
  }
  PropostaVeiculo_Id?: string
  created_at: Date
}

type ProposalService = {
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

export async function gerarOs({ proposal, type, vehicles }: GerarOSProps) {
  const OSUUID = uuid()
  const osResult = proposal.Veiculos.filter(
    (vehicle) => !vehicles.includes(vehicle.Veiculo_Id)
  ).map(async (vehicle) => {
    return await useTypedClientMutation({
      insert_operacional_OrdemDeServico_one: [
        {
          object: {
            Id: OSUUID,
            PossuiGNV: vehicle.PossuiGNV,
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
            Servicos: {
              data: prepareOSServices(vehicle.PropostasServicos, 1, { OSUUID })
            },
            Produtos: {
              data: prepareOSProducts(vehicle.PropostasProdutos, 1, { OSUUID })
            },
            Planos: {
              data: prepareOSPlans(vehicle.PropostasPlanos, 1, { OSUUID })
            },
            Combos: {
              data: prepareOSCombo(vehicle.PropostasCombos, OSUUID)
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
        console.log(err)
        return 'fail'
      })
  })

  return (async () => {
    const result = await Promise.all(osResult)
    return result
  })()
}

