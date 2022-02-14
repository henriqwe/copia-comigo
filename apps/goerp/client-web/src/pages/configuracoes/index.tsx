import * as families from '&erp/domains/inventory/Registration/Families'
import * as config from '&erp/domains/config'

import rotas from '&erp/domains/routes'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Config() {
  return (
    <config.ConfigProvider>
      <families.FamilyProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </families.FamilyProvider>
    </config.ConfigProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { configRefetch, configLoading } = config.useConfig()
  const { familiesRefetch } = families.useFamily()

  const refetch = () => {
    familiesRefetch()
    configRefetch()
  }
  return (
    <templates.Base
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
      reload={{ action: refetch, state: configLoading }}
      title="Configurações"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        { title: 'Configurações', url: rotas.compras.index }
      ]}
    >
      <config.Main />
    </templates.Base>
  )
}
