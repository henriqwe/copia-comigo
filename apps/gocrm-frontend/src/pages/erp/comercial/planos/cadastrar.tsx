import * as conditionals from '@/domains/erp/commercial/Registration/Conditionals'
import * as services from '@/domains/erp/commercial/Services'
import * as plans from '@/domains/erp/commercial/Plans'

import rotas from '@/domains/routes'

import Base from '@/templates/Base'

export default function CreatePlan() {
  return (
    <plans.CreateProvider>
      <services.ServiceProvider>
        <conditionals.ConditionalProvider>
          <Page />
        </conditionals.ConditionalProvider>
      </services.ServiceProvider>
    </plans.CreateProvider>
  )
}

export function Page() {
  const { servicesRefetch, servicesLoading } = services.useService()
  const { conditionalRefetch } = conditionals.useConditional()

  const refetch = () => {
    servicesRefetch()
    conditionalRefetch()
  }
  return (
    <Base
      title="Cadastro de Plano"
      reload={{ state: servicesLoading, action: refetch }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Planos',
          url: rotas.erp.comercial.planos.index
        },
        {
          title: 'Cadastro',
          url: rotas.erp.comercial.planos.cadastrar
        }
      ]}
    >
      <plans.Create />
    </Base>
  )
}
