import * as proposals from '&crm/domains/commercial/Proposals'
import * as services from '&crm/domains/commercial/Services'
import * as combos from '&crm/domains/commercial/Combos'
import * as plans from '&crm/domains/commercial/Plans'
import * as products from '&crm/domains/commercial/Products'
import * as vehicles from '&crm/domains/services/Vehicles'
import * as clients from '&crm/domains/identities/Clients'
import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

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
  const {theme} = useTheme()
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
    <templates.Base
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      title="Detalhe de Proposta"
      reload={{ action: refetch, state: proposalLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Proposta',
          url: rotas.comercial.propostas.index
        }
      ]}
    >
      <proposals.View />
    </templates.Base>
  )
}
