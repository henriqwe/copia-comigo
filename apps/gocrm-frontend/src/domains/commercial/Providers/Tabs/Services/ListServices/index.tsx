import * as blocks from '@comigo/ui-blocks'
import * as services from '&crm/domains/commercial/Providers/Tabs/Services'

export default function List() {
  const { servicesData } = services.useService()
  return servicesData ? (
    <>
      <blocks.Table
        colection={servicesData}
        columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
        actions={services.RowActions}
      />
      <services.SlidePane />
    </>
  ) : (
    <blocks.TableSkeleton />
  )
}
