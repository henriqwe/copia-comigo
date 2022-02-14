import * as questions from '&crm/domains/services/Registration/Questions'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function Perguntas() {
  return (
    <questions.QuestionProvider>
      <ThemeProvider>
        {' '}
        <Page />{' '}
      </ThemeProvider>
    </questions.QuestionProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { questionsRefetch, questionsLoading } = questions.useQuestion()
  return (
    <templates.InternalNavigationAndSlide
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
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
