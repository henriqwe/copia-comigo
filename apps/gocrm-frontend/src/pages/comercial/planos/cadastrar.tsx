import * as conditionals from '&crm/domains/commercial/Registration/Conditionals'
import * as services from '&crm/domains/commercial/Services'
import * as plans from '&crm/domains/commercial/Plans'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function CreatePlan() {
  return (
    <plans.CreateProvider>
      <services.ServiceProvider>
        <conditionals.ConditionalProvider>
          <ThemeProvider>       <Page />     </ThemeProvider>
        </conditionals.ConditionalProvider>
      </services.ServiceProvider>
    </plans.CreateProvider>
  )
}

export function Page() {
  const {theme, changeTheme} = useTheme()
  const { servicesRefetch, servicesLoading } = services.useService()
  const { conditionalRefetch } = conditionals.useConditional()

  const refetch = () => {
    servicesRefetch()
    conditionalRefetch()
  }
  return (
    <templates.Base setTheme={changeTheme}
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Cadastro de Plano"
      reload={{ state: servicesLoading, action: refetch }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Planos',
          url: rotas.comercial.planos.index
        },
        {
          title: 'Cadastro',
          url: rotas.comercial.planos.cadastrar
        }
      ]}
    >
      <plans.Create />
    </templates.Base>
  )
}
