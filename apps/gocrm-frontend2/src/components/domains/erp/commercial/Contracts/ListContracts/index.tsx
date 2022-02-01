import * as blocks from '&test/components/blocks'
import * as contracts from '&test/components/domains/erp/commercial/Contracts'

export default function List() {
  const { baseContractsData } = contracts.useContract()
  return baseContractsData ? (
    <blocks.Table
      colection={baseContractsData}
      columnTitles={[
        { title: 'Código de Referência', fieldName: 'CodigoReferencia' },
        { title: 'Nome', fieldName: 'Nome' }
        // {
        //   title: 'Parceiro',
        //   fieldName: 'Nome',
        //   type: 'relationship',
        //   relationshipName: 'Parceiro'
        // }
      ]}
      actions={contracts.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
