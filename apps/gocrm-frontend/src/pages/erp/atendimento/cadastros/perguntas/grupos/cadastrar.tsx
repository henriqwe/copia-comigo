import * as questionsGroups from '&crm/domains/erp/services/Registration/Questions/Groups'
import * as questions from '&crm/domains/erp/services/Registration/Questions'

import rotas from '&crm/domains/routes'

import Base from '@/templates/Base'

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
  const { questionsRefetch, questionsLoading } = questions.useQuestion()
  return (
    <Base
      title="Cadastro de Grupo de Perguntas"
      reload={{ action: questionsRefetch, state: questionsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Atendimento', url: rotas.erp.atendimento.index },
        {
          title: 'Cadastros',
          url: rotas.erp.atendimento.cadastros.index
        },
        {
          title: 'Perguntas',
          url: rotas.erp.atendimento.cadastros.fluxos.index
        },
        {
          title: 'Grupos',
          url: rotas.erp.atendimento.cadastros.fluxos.etapas
        },
        {
          title: 'Cadastro',
          url: rotas.erp.atendimento.cadastros.fluxos.etapas
        }
      ]}
    >
      <questionsGroups.Create />
    </Base>
  )
}
