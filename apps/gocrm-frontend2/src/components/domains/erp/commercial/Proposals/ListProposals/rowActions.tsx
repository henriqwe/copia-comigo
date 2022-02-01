import { GraphQLTypes } from '&test/graphql/generated/zeus'
import * as table from '&test/components/blocks/Table/itens'
import * as icons from '&test/components/common/Icons'
import * as proposals from '&test/components/domains/erp/commercial/Proposals'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'
import rotas from '&test/components/domains/routes'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['propostas_Propostas']
}) {
  const { proposalsRefetch, softDeleteProposal } = proposals.useList()
  const actions = [
    {
      title: 'Vizualizar',
      url: rotas.erp.comercial.propostas.index + '/' + item.Id,
      icon: <icons.ViewIcon />
    },
    {
      title: 'Deletar',
      handler: async () => {
        event?.preventDefault()
        await softDeleteProposal({
          variables: {
            Id: item.Id
          }
        })
          .then(() => {
            proposalsRefetch()
            notification('Proposta excluida com sucesso', 'success')
          })
          .catch((err) => {
            showError(err)
          })
      },
      icon: <icons.DeleteIcon />
    }
  ]
  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
