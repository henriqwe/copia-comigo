import * as tariffs from '&test/components/domains/erp/commercial/Registration/Tariffs'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Tariffs() {
  return (
    <tariffs.TariffsProvider>
      <Page />
    </tariffs.TariffsProvider>
  )
}

export function Page() {
  const { tariffsRefetch, tariffsLoading } = tariffs.useTariffs()
  const refetch = () => {
    tariffsRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<tariffs.InternalNavigation />}
      title="Tarifas"
      reload={{ action: refetch, state: tariffsLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.erp.comercial.cadastros.index
        },
        {
          title: 'Tarifas',
          url: rotas.erp.comercial.cadastros.tarifas
        }
      ]}
    >
      <tariffs.List />
      <tariffs.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
