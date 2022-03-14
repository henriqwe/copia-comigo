import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as emails from '&crm/domains/clients/components/Tabs/Emails'

import * as utils from '@comigo/utils'

export function RowActions({
  item
}: {
  item: GraphQLTypes['contatos_Emails']
}) {
  const { softDeleteEmail, emailsRefetch, setSlidePanelState } =
    emails.useEmail()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteEmail({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            emailsRefetch()
            utils.notification('Email excluido com sucesso', 'success')
          })
          .catch((err) => {
            utils.showError(err)
          })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]

  return <blocks.table.ActionsRow actions={actions} />
}
