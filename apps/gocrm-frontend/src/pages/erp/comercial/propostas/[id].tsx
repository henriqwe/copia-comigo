import * as proposals from '&crm/domains/erp/commercial/Proposals'
import * as services from '&crm/domains/erp/commercial/Services'
import * as combos from '&crm/domains/erp/commercial/Combos'
import * as plans from '&crm/domains/erp/commercial/Plans'
import * as products from '&crm/domains/erp/commercial/Products'
import * as vehicles from '&crm/domains/erp/services/Vehicles'
import * as clients from '&crm/domains/erp/identities/Clients'

import rotas from '&crm/domains/routes'

import Base from '@/templates/Base'

export default function ProposalDetails() {
  return (
    <proposals.ViewProvider>
      <proposals.CreateProvider>
        <combos.ListProvider>
          <plans.ListProvider>
            <services.ServiceProvider>
              <products.ProductProvider>
                <vehicles.VehicleProvider>
                  <clients.ListProvider>
                    <clients.CreateProvider>
                      <Page />
                    </clients.CreateProvider>
                  </clients.ListProvider>
                </vehicles.VehicleProvider>
              </products.ProductProvider>
            </services.ServiceProvider>
          </plans.ListProvider>
        </combos.ListProvider>
      </proposals.CreateProvider>
    </proposals.ViewProvider>
  )
}

export function Page() {
  const { proposalRefetch, proposalLoading, proposalInstallationsRefetch } =
    proposals.useView()
  const { servicesRefetch } = services.useService()
  const { combosRefetch } = combos.useList()
  const { plansRefetch } = plans.useList()
  const { productsRefetch } = products.useProduct()
  const { vehiclesRefetch } = vehicles.useVehicle()
  const { clientsRefetch } = clients.useList()

  const refetch = () => {
    combosRefetch()
    plansRefetch()
    productsRefetch()
    servicesRefetch()
    vehiclesRefetch()
    clientsRefetch()
    proposalInstallationsRefetch()
    proposalRefetch()
  }
  return (
    <Base
      title="Detalhe de Proposta"
      reload={{ action: refetch, state: proposalLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Proposta',
          url: rotas.erp.comercial.propostas.index
        }
      ]}
    >
      <proposals.View />
    </Base>
  )
}
