import * as flows from '&test/components/domains/erp/services/Registration/Flows'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import rotas from '&test/components/domains/routes'

export default function Flows() {
  return (
    <flows.FlowProvider>
      <Page />
    </flows.FlowProvider>
  )
}

export function Page() {
  const { flowsRefetch, flowsLoading } = flows.useFlow()
  return (
    <InternalNavigationAndSlide
      SubMenu={<flows.InternalNavigation />}
      title="Fluxos"
      reload={{ action: flowsRefetch, state: flowsLoading }}
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
        }
      ]}
    >
      <flows.List />
      <flows.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
