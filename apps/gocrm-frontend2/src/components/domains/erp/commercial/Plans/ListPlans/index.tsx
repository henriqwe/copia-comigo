import * as blocks from '&test/components/blocks'
import * as plans from '&test/components/domains/erp/commercial/Plans'

export default function List() {
  const { plansData } = plans.useList()
  return plansData ? (
    <blocks.Table
      colection={plansData}
      columnTitles={[
        {
          title: 'Nome',
          fieldName: 'Nome'
        },
        {
          title: 'Serviço',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Servico'
        }
      ]}
      actions={plans.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
