import * as questionsGroups from '&crm/domains/services/Registration/Questions/Groups'
import * as questions from '&crm/domains/services/Registration/Questions'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

export default function CreateQuestionsGroup() {
  return (
    <questionsGroups.CreateProvider>
      <questions.QuestionProvider>
        <Page />
      </questions.QuestionProvider>
    </questionsGroups.CreateProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { questionsRefetch, questionsLoading } = questions.useQuestion()
  return (
    <templates.Base
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Grupo de Perguntas"
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
          url: rotas.atendimento.cadastros.fluxos.index
        },
        {
          title: 'Grupos',
          url: rotas.atendimento.cadastros.fluxos.etapas
        },
        {
          title: 'Cadastro',
          url: rotas.atendimento.cadastros.fluxos.etapas
        }
      ]}
    >
      <questionsGroups.Create />
    </templates.Base>
  )
}
