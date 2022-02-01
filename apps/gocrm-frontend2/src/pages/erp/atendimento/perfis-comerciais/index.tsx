import * as businessProfiles from '&test/components/domains/erp/services/BusinessProfiles'

import InternalNavigationAndSlide from '&test/components/templates/InternalNavigationAndSlide'
import rotas from '&test/components/domains/routes'

export default function BusinessProfiles() {
  return (
    <businessProfiles.BusinessProfileProvider>
      <Page />
    </businessProfiles.BusinessProfileProvider>
  )
}

export function Page() {
  const { businessProfilesRefetch, businessProfilesLoading } =
    businessProfiles.useBusinessProfile()
  return (
    <InternalNavigationAndSlide
      SubMenu={<businessProfiles.InternalNavigation />}
      title="Perfis Comerciais"
      reload={{
        action: businessProfilesRefetch,
        state: businessProfilesLoading
      }}
      currentLocation={[
        { title: 'Rastreamento', url: rotas.erp.home },
        { title: 'Atendimento', url: rotas.erp.atendimento.index },
        {
          title: 'Perfis Comerciais',
          url: rotas.erp.atendimento.perfisComerciais.index
        }
      ]}
    >
      <businessProfiles.List />
      <businessProfiles.SlidePanel />
    </InternalNavigationAndSlide>
  )
}
