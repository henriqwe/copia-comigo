import * as questions from '&crm/domains/services/Registration/Questions'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

export default function Perguntas() {
  return (
    <questions.QuestionProvider>
      <Page />
    </questions.QuestionProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { questionsRefetch, questionsLoading } = questions.useQuestion()
  return (
    <templates.InternalNavigationAndSlide
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      SubMenu={<questions.InternalNavigation />}
      title="Perguntas"
      reload={{ action: questionsRefetch, state: questionsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Atendimento', url: rotas.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.atendimento.cadastros.index
        },
        {
          title: 'Perguntas',
          url: rotas.atendimento.cadastros.perguntas.index
        }
      ]}
    >
      <questions.List />
      <questions.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
