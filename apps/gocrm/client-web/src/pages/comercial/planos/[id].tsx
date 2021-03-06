import * as conditionals from '&crm/domains/commercial/Registration/Conditionals'
import * as services from '&crm/domains/commercial/Services'
import * as plans from '&crm/domains/commercial/Plans'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function UpdatePlan() {
  return (
    <plans.UpdateProvider>
      <services.ServiceProvider>
        <conditionals.ConditionalProvider>
          <ThemeProvider>
            {' '}
            <Page />{' '}
          </ThemeProvider>
        </conditionals.ConditionalProvider>
      </services.ServiceProvider>
    </plans.UpdateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { plansRefetch, plansLoading } = plans.useUpdate()
  const { servicesRefetch } = services.useService()
  const { conditionalRefetch } = conditionals.useConditional()

  const refetch = () => {
    servicesRefetch()
    conditionalRefetch()
    plansRefetch()
  }
  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Edição de Plano"
      reload={{ state: plansLoading, action: refetch }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Planos',
          url: rotas.comercial.planos
        }
      ]}
    >
      <plans.UpdatePlan />
    </templates.Base>
  )
}
