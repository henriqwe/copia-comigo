import * as installationKits from '&erp/domains/production/Kits/InstallationKits'

import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function InstallationKits() {
  return (
    <installationKits.ListProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </installationKits.ListProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { installationKitsRefetch, installationKitsLoading } =
    installationKits.useList()
  //const { usuario } = useUsuario()
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<installationKits.InternalNavigation />}
      title="Kits de instalação de produção"
      reload={{
        action: installationKitsRefetch,
        state: installationKitsLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Kits de instalação',
          url: rotas.producao.kits.kitsDeInstalacao.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <installationKits.List />
    </templates.InternalNavigationAndSlide>
  )
}
