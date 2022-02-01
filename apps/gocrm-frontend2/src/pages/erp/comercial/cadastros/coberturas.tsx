import * as coverages from '&test/components/domains/erp/commercial/Registration/Coverages'

import rotas from '&test/components/domains/routes'
import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'

export default function Conditionals() {
  return (
    <coverages.CoverageProvider>
      <Page />
    </coverages.CoverageProvider>
  )
}

export function Page() {
  const { coveragesRefetch, coveragesLoading } = coverages.useCoverage()
  const refetch = () => {
    coveragesRefetch()
  }
  //const { usuario } = useUsuario()
  return (
    <InternalNavigationAndSlide
      SubMenu={<coverages.InternalNavigation />}
      title="Coberturas"
      reload={{ action: refetch, state: coveragesLoading }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Comercial', url: rotas.erp.comercial.index },
        {
          title: 'Cadastros',
          url: rotas.erp.comercial.cadastros.index
        },
        {
          title: 'Coberturas',
          url: rotas.erp.comercial.cadastros.coberturas
        }
      ]}
    >
      <coverages.List />
      <coverages.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
