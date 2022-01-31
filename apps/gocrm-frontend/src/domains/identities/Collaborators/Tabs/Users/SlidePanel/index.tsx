import * as blocks from '@comigo/ui-blocks'
import * as users from '&crm/domains/identities/Collaborators/Tabs/Users'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = users.useUser()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Usuário'
          : 'Editar Usuário'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? <users.Create /> : <users.Update />
      }
    />
  )
}
