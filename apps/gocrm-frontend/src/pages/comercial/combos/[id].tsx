import * as combos from '&crm/domains/commercial/Combos'
import * as plans from '&crm/domains/commercial/Plans'
import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import mainMenuItens from '&crm/domains/MainMenuItens'

import companies from '&crm/domains/companies'

import {useTheme} from '&crm/contexts/ThemeContext'

export default function ProposalDetails() {
  return (
    <combos.ViewProvider>
      <plans.ListProvider>
        <products.ProductProvider>
          <services.ServiceProvider>
            <combos.combos.DependenceComboProvider>
              <Page />
            </combos.combos.DependenceComboProvider>
          </services.ServiceProvider>
        </products.ProductProvider>
      </plans.ListProvider>
    </combos.ViewProvider>
  )
}

export function Page() {
  const {theme} = useTheme()
  const { comboRefetch, comboLoading, comboData } = combos.useView()
  const { combosRefetch, dependenciesCombosRefetch } =
    combos.combos.useDependenceCombo()
  const { productsRefetch } = products.useProduct()
  const { plansRefetch } = plans.useList()
  const { servicesRefetch } = services.useService()

  const refetch = () => {
    productsRefetch()
    plansRefetch()
    servicesRefetch()
    combosRefetch()
    dependenciesCombosRefetch()
    comboRefetch()
  }

  if ((comboData?.ComboPai.length || 0) > 0) {
    return (
      <templates.Base
      theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
        title="Detalhe de Combo"
        reload={{ action: refetch, state: comboLoading }}
        currentLocation={[
          { title: 'Rastreamento', url: rotas.home },
          { title: 'Comercial', url: rotas.comercial.index },
          {
            title: 'Combos',
            url: rotas.comercial.combos.index
          }
        ]}
      >
        <combos.View />
      </templates.Base>
    )
  }
  return (
    <templates.FormAndTabs
    theme={theme} mainMenuItens={mainMenuItens} rotas={rotas} companies={companies} imageUrl={'/imagens/logoAssistencia.png'}
      Form={<combos.View />}
      title="Detalhe de Combo"
      reload={{ action: refetch, state: comboLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Combos',
          url: rotas.comercial.combos.index
        }
      ]}
    >
      <combos.Tabs />
    </templates.FormAndTabs>
  )
}
