import { GraphQLTypes } from '&crm/graphql/generated/zeus'

//  import * as utils from '@comigo/utils'
// import { showError } from 'utils/exibeErros'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'



import * as representatives from '&crm/domains/identities/Clients/Tabs/Representative'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['identidades_Representantes']
}) {
  const { setSlidePanelState } = representatives.useRepresentative()
  const actions = [
    {
      title: 'Editar',
      handler: async () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'update', data: item })
        // setTelefoneSelecionado(item)
      },
      icon: <common.icons.EditIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        // await excluirTelefone({
        //   variables: {
        //     Id: item.Id
        //   }
        // })
        //   .then(() => {
        //     representantesRefetch()
        //       utils.notification('Telefone excluido com sucesso', 'success')
        //   })
        //   .catch((err) => {
        //     utils.showError(err)
        //   })
      },
      icon: <common.icons.DeleteIcon />
    }
  ]

  return <blocks.table.ActionsRow actions={actions} />
}
