import * as chips from '&erp/domains/production/identifiable/Chips'
import * as operators from '&erp/domains/production/identifiable/Chips/Operators'
import { ThemeProvider, useTheme } from '&erp/contexts/ThemeContext'
import rotas from '&erp/domains/routes'
import * as templates from '@comigo/ui-templates'
import MainMenuItems from '&erp/domains/MainMenuItems'
import companies from '&erp/domains/companies'

export default function Chips() {
  return (
    <chips.ChipsProvider>
      <operators.OperatorProvider>
        <ThemeProvider>
          <Page />
        </ThemeProvider>
      </operators.OperatorProvider>
    </chips.ChipsProvider>
  )
}

export function Page() {
  const { theme, changeTheme } = useTheme()
  const { chipsRefetch, chipsLoading } = chips.useChips()
  const { operatorsRefetch } = operators.useOperator()

  const refetch = () => {
    chipsRefetch()
    operatorsRefetch()
  }
  return (
    <templates.InternalNavigationAndSlide
      SubMenu={<chips.InternalNavigation />}
      title="Chips de estoque"
      reload={{ action: refetch, state: chipsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.home },
        {
          title: 'Produção',
          url: rotas.producao.identificaveis.chips.index
        },
        {
          title: 'Chips',
          url: rotas.producao.identificaveis.chips.index
        }
      ]}
      setTheme={changeTheme}
      imageUrl="/imagens/logoRastreamento.png"
      MainMenuItems={MainMenuItems}
      rotas={rotas}
      companies={companies}
      theme={theme}
    >
      <chips.List />
      <chips.SlidePanel />
    </templates.InternalNavigationAndSlide>
  )
}
