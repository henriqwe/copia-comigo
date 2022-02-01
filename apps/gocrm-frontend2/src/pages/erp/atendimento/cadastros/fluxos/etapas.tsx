import * as flowStages from '&test/components/domains/erp/services/Registration/Flows/Stage'
import * as flows from '&test/components/domains/erp/services/Registration/Flows'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function FlowStages() {
  return (
    <flowStages.StageProvider>
      <flows.FlowProvider>
        <Page />
      </flows.FlowProvider>
    </flowStages.StageProvider>
  )
}

export function Page() {
  const { stagesRefetch, stagesLoading } = flowStages.useStage()
  const { flowsRefetch } = flows.useFlow()
  const refetch = () => {
    flowsRefetch()
    stagesRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<flowStages.InternalNavigation />}
      title="Etapas de Fluxo"
      reload={{
        action: refetch,
        state: stagesLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Atendimento', url: rotas.erp.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.erp.atendimento.cadastros.index
        },
        {
          title: 'Fluxos',
          url: rotas.erp.atendimento.cadastros.fluxos.index
        },
        {
          title: 'Etapas',
          url: rotas.erp.atendimento.cadastros.fluxos.etapas
        }
      ]}
    >
      <flowStages.List />
      <flowStages.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
