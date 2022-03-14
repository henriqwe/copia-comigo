import * as blocks from '@comigo/ui-blocks'

import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { softDeleteProposalCombo } from '../operations/softDeleteProposalCombo'
import { softDeleteProposalPlans } from '../operations/softDeleteProposalPlan'
import { softDeleteProposalProduct } from '../operations/softDeleteProposalProduct'
import { softDeleteProposalService } from '../operations/softDeleteProposalService'

export function UpdateRowActions({
  item
}: {
  item: {
    Id: string
    Name?: string
    MembershipPrice?: string
    RecurrencePrice?: string
    Type?: 'Plano' | 'Combo' | 'Serviço' | 'Produto'
  }
}) {
  const { proposalRefetch } = proposals.useUpdate()
  const actions = [
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        try {
          switch (item?.Type) {
            case 'Combo':
              await softDeleteProposalCombo({ Id: item.Id })
              break
            case 'Plano':
              await softDeleteProposalPlans({ Id: item.Id })
              break
            case 'Produto':
              await softDeleteProposalProduct({ Id: item.Id })
              break
            case 'Serviço':
              await softDeleteProposalService({ Id: item.Id })
              break
          }

          proposalRefetch()
          utils.notification(
            `${item.Type} excluido da proposta com sucesso`,
            'success'
          )
        } catch (err) {
          utils.showError(err)
        }
      },
      icon: item.Type ? <common.icons.DeleteIcon /> : <></>
    }
  ]
  return (
    <blocks.borderLessTable.ActionsRow
      actions={actions}
      data-testid="acoesPorRegistro"
    />
  )
}
