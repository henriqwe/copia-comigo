import { GraphQLTypes } from '&test/graphql/generated/zeus'

// import { notification } from '&test/utils/notification'
// import { showError } from '&test/utils/exibeErros'

import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'

import * as representatives from '&test/components/domains/erp/identities/Clients/Tabs/Representative'

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
      icon: <icons.EditIcon />
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
        //     notification('Telefone excluido com sucesso', 'success')
        //   })
        //   .catch((err) => {
        //     showError(err)
        //   })
      },
      icon: <icons.DeleteIcon />
    }
  ]

  return <table.ActionsRow actions={actions} />
}
