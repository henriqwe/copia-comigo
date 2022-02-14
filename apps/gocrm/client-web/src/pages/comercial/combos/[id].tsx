import * as combos from '&crm/domains/commercial/Combos'

import * as templates from '@comigo/ui-templates'

import rotas from '&crm/domains/routes'

import MainMenuItems from '&crm/domains/MainMenuItems'

import companies from '&crm/domains/companies'

import { ThemeProvider, useTheme } from '&crm/contexts/ThemeContext'

export default function ProposalDetails() {
  return (
    <combos.ViewProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </combos.ViewProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { comboRefetch, comboLoading } = combos.useView()

  const refetch = () => {
    comboRefetch()
  }

  return (
    <templates.Base
      setTheme={changeTheme}
      theme={theme}
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      imageUrl={'/imagens/logoAssistencia.png'}
      title="Detalhe de Combo"
      reload={{ action: refetch, state: comboLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Comercial', url: rotas.comercial.index },
        {
          title: 'Combos',
          url: rotas.comercial.combos
        }
      ]}
    >
      <combos.ViewCombo />
    </templates.Base>
  )
}
