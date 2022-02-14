import * as installationKits from '&erp/domains/production/Kits/InstallationKits'
import * as trackers from '&erp/domains/production/Trackers'
import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function CreateInstallationKit() {
  return (
    <installationKits.CreateProvider>
      <trackers.ListProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </trackers.ListProvider>
    </installationKits.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { trackersRefetch, trackersLoading } = trackers.useList()
  return (
    <templates.Base
      title="Cadastro de Kit de instalação"
      reload={{ action: trackersRefetch, state: trackersLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Kits de Instalação',
          url: rotas.producao.kits.kitsDeInstalacao.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.kits.kitsDeInstalacao.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <installationKits.Create />
    </templates.Base>
  )
}
