import * as flowStages from '&crm/domains/services/Registration/Flows/Stage'
import * as flows from '&crm/domains/services/Registration/Flows'

import * as templates from '@comigo/ui-templates'
import rotas from '&crm/domains/routes'
import mainMenuItens from '&crm/domains/MainMenuItens'
import companies from '&crm/domains/companies'
import {useTheme} from '&crm/contexts/ThemeContext'
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
  const {theme} = useTheme()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<flowStages.InternalNavigation />}
      title="Etapas de Fluxo"
      reload={{
        action: refetch,
        state: stagesLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index
        },
        {
          title: 'Fluxos',
          url: rotas.atendimento.cadastros.fluxos.index
        },
        {
          title: 'Etapas',
          url: rotas.atendimento.cadastros.fluxos.etapas
        }
      ]}
    >
      <flowStages.List />
      <flowStages.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
