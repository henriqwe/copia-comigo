import type { ProposalPlan } from './gerarOSMudarVeiculo'
import { prepareOSProducts } from './prepareOSProducts'
import { prepareOSServices } from './prepareOSServices'

export function prepareOSPlans(
  PropostasPlanos: ProposalPlan[],
  layer: number,
  Ids: { OSUUID: string; comboUUID?: string }
) {
  const filteredPlans: {
    OrdemDeServico_Id: string
    PlanoPreco_Id: string
    Plano_Id: string
    OrdemDeServicoCombo_Id?: string
    created_at: Date
    OSServicos: {
      data: unknown[]
    }
    OSProdutos: {
      data: unknown[]
    }
  }[] = []

  const extraServiceData =
    layer > 1
      ? {
          OrdemDeServico_Id: Ids.OSUUID
        }
      : {}

  // prepara os planos
  const plans = PropostasPlanos.map((plan) => {
    // const planId = uuid()
    return {
      // Id: planId,
      PlanoPreco_Id: plan.PlanoPreco?.Id,
      Plano_Id: plan.Plano.Id,
      created_at: plan.created_at,
      OSServicos: {
        data: prepareOSServices(plan.PropostasServicos, layer + 1, {
          OSUUID: Ids.OSUUID,
          comboUUID: Ids?.comboUUID,
          // planoUUID: planId
        })
      },
      OSProdutos: {
        data: prepareOSProducts(plan.PropostasProdutos, layer + 1, {
          OSUUID: Ids.OSUUID,
          comboUUID: Ids?.comboUUID,
          // planoUUID: planId
        })
      },
      ...extraServiceData
    }
  })

  // tira os planos duplicados
  plans.map((plan) => {
    const duplicatedPosition = filteredPlans.findIndex(
      (filteredPlan) => plan.Plano_Id === filteredPlan.Plano_Id
    )

    if (duplicatedPosition > -1) {
      filteredPlans[duplicatedPosition] = {
        OrdemDeServico_Id: plan?.OrdemDeServico_Id,
        PlanoPreco_Id:
          plan.created_at > filteredPlans[duplicatedPosition].created_at
            ? plan.PlanoPreco_Id
            : filteredPlans[duplicatedPosition].PlanoPreco_Id,
        Plano_Id: plan.Plano_Id,
        created_at: plan.created_at,
        OSServicos: plan.OSServicos,
        OSProdutos: plan.OSProdutos
      }
    }

    if (!(duplicatedPosition > -1)) {
      filteredPlans.push({
        OrdemDeServico_Id: plan?.OrdemDeServico_Id,
        PlanoPreco_Id: plan.PlanoPreco_Id,
        Plano_Id: plan.Plano_Id,
        created_at: plan.created_at,
        OSServicos: plan.OSServicos,
        OSProdutos: plan.OSProdutos
      })
    }
  })

  return filteredPlans
}