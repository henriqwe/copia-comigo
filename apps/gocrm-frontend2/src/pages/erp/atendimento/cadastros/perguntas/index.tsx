import * as questions from '&test/components/domains/erp/services/Registration/Questions'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import rotas from '&test/components/domains/routes'

export default function Perguntas() {
  return (
    <questions.QuestionProvider>
      <Page />
    </questions.QuestionProvider>
  )
}

export function Page() {
  const { questionsRefetch, questionsLoading } = questions.useQuestion()
  return (
    <InternalNavigationAndSlide
      SubMenu={<questions.InternalNavigation />}
      title="Perguntas"
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
          url: rotas.erp.atendimento.cadastros.perguntas.index
        }
      ]}
    >
      <questions.List />
      <questions.SlidePanel />
    </InternalNavigationAndSlide>
  )
}