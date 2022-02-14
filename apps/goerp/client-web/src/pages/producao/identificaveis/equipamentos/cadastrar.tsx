import * as equipments from '&erp/domains/production/identifiable/Equipments'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import rotas from '&erp/domains/routes'

import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Equipments() {
  return (
    <equipments.CreateProvider>
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </equipments.CreateProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  return (
    <templates.Base
      title="Cadastro de equipamentos"
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Equipamentos',
          url: rotas.producao.identificaveis.equipamentos.index
        },
        {
          title: 'Cadastro',
          url: rotas.producao.identificaveis.equipamentos.cadastrar
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <equipments.Create />
    </templates.Base>
  )
}
