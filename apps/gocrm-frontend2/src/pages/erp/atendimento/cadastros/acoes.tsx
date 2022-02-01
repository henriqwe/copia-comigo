import * as action from '&test/components/domains/erp/services/Registration/Actions'
import * as flowStages from '&test/components/domains/erp/services/Registration/Flows/Stage'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import rotas from '&test/components/domains/routes'

export default function Actions() {
  return (
    <action.ActionProvider>
      <flowStages.StageProvider>
        <Page />
      </flowStages.StageProvider>
    </action.ActionProvider>
  )
}

export function Page() {
  const { stagesRefetch } = flowStages.useStage()
  const { actionsRefetch, actionsLoading } = action.useAction()

  function refetch() {
    stagesRefetch()
    actionsRefetch()
  }
  return (
    <InternalNavigationAndSlide
      SubMenu={<action.InternalNavigation />}
      title="Ações"
      reload={{ action: refetch, state: actionsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Atendimento', url: rotas.erp.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.erp.atendimento.cadastros.index
        },
        {
          title: 'Ações',
          url: rotas.erp.atendimento.cadastros.acoes
        }
      ]}
    >
      <action.List />
      <action.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
