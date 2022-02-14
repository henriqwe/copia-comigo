import * as trackers from '&erp/domains/production/Trackers'

import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'

import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function CreateTrackers() {
  return (
    <trackers.CreateProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </trackers.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      title="Cadastro de Rastreadores"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Rastreadores',
          url: rotas.producao.rastreadores.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.rastreadores.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <trackers.Create />
    </templates.Base>
  )
}
