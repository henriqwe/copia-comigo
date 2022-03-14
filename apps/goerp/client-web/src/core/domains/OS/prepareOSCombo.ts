import {v4 as uuid} from 'uuid'
import type { ProposalCombo } from './gerarOSMudarVeiculo'
import { prepareOSProducts } from './prepareOSProducts'
import { prepareOSServices } from './prepareOSServices'
import { prepareOSPlans } from './prepareOSPlans'

export function prepareOSCombo(
  PropostasCombos: ProposalCombo[],
  OSUUID: string
) {
  const filteredCombos: {
    Id: string
    ComboPreco_Id: string
    Combo_Id: string
    created_at: Date
    OSPlanos: {
      data: unknown[]
    }
    OSProdutos: {
      data: unknown[]
    }
    OSServicos: {
      data: unknown[]
    }
  }[] = []

  const combos = PropostasCombos.map((combo) => {
    const comboUUID = uuid()
    return {
      Id: comboUUID,
      ComboPreco_Id: combo.ComboPreco_Id,
      Combo_Id: combo.Combo.Id,
      created_at: combo.created_at,
      OSPlanos: {
        data: prepareOSPlans(combo.PropostasPlanos, 2, { OSUUID, comboUUID })
      },
      OSProdutos: {
        data: prepareOSProducts(combo.PropostasProdutos, 2, {
          OSUUID,
          comboUUID
        })
      },
      OSServicos: {
        data: prepareOSServices(combo.PropostasServicos, 2, {
          OSUUID,
          comboUUID
        })
      }
    }
  })

  combos.map((combo) => {
    const duplicatedPosition = filteredCombos.findIndex(
      (filteredCombo) => combo.Combo_Id === filteredCombo.Combo_Id
    )

    if (duplicatedPosition > -1) {
      filteredCombos[duplicatedPosition] = {
        Id: combo.Id,
        ComboPreco_Id:
          combo.created_at > filteredCombos[duplicatedPosition].created_at
            ? combo.ComboPreco_Id
            : filteredCombos[duplicatedPosition].ComboPreco_Id,
        Combo_Id: combo.Combo_Id,
        created_at: combo.created_at,
        OSPlanos: combo.OSPlanos,
        OSProdutos: combo.OSProdutos,
        OSServicos: combo.OSServicos
      }
    }

    if (!(duplicatedPosition > -1)) {
      filteredCombos.push({
        Id: combo.Id,
        ComboPreco_Id: combo.ComboPreco_Id,
        Combo_Id: combo.Combo_Id,
        created_at: combo.created_at,
        OSPlanos: combo.OSPlanos,
        OSProdutos: combo.OSProdutos,
        OSServicos: combo.OSServicos
      })
    }
  })

  return filteredCombos
}
