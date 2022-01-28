import * as conditionals from '&crm/domains/erp/commercial/Registration/Conditionals'
import * as services from '&crm/domains/erp/commercial/Services'
import * as plans from '&crm/domains/erp/commercial/Plans'

import rotas from '&crm/domains/routes'

import Base from '@/templates/Base'

export default function UpdatePlan() {
  return (
    <plans.UpdateProvider>
      <services.ServiceProvider>
        <conditionals.ConditionalProvider>
          <Page />
        </conditionals.ConditionalProvider>
      </services.ServiceProvider>
    </plans.UpdateProvider>
  )
}

export function Page() {
  const { plansRefetch, plansLoading } = plans.useUpdate()
  const { servicesRefetch } = services.useService()
  const { conditionalRefetch } = conditionals.useConditional()

  const refetch = () => {
    servicesRefetch()
    conditionalRefetch()
    plansRefetch()
  }
  return (
    <Base
      title="Edição de Plano"
      reload={{ state: plansLoading, action: refetch }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Planos',
          url: rotas.erp.comercial.planos.index
        }
      ]}
    >
      <plans.Update />
    </Base>
  )
}
