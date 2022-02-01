import * as blocks from '&test/components/blocks'
import * as services from '&test/components/domains/erp/commercial/Providers/Tabs/Services'

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
