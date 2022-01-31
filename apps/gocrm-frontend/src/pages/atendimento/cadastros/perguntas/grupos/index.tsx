import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'
export default function QuestionsGroups() {
  return (
    <questionsGroups.ListProvider>
      <ThemeProvider>       <Page />     </ThemeProvider>
    </questionsGroups.ListProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { questionsGroupsRefetch, questionsGroupsLoading } =
    questionsGroups.useList()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<questionsGroups.InternalNavigation />}
      title="Grupos de Perguntas"
      reload={{
        action: questionsGroupsRefetch,
        state: questionsGroupsLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index
        },
        {
          title: 'Perguntas',
          url: rotas.atendimento.cadastros.fluxos.index
        },
        {
          title: 'Grupos',
          url: rotas.atendimento.cadastros.fluxos.etapas
        }
      ]}
    >
      <questionsGroups.List />
    </templates.InternalNavigationAndSlide>
  )
}
