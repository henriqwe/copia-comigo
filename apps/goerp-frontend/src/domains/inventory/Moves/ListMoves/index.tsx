import * as movimentacoes from '&erp/domains/inventory/Moves'
import * as blocks from '@comigo/ui-blocks'

export function List() {
  const { MovesData } = movimentacoes.useList()
  return MovesData ? (
    <blocks.Table
      colection={MovesData}
      columnTitles={[
        {
          title: 'Nome do item',
          fieldName: 'Item',
          type: 'handler',
          handler: (item) => {
            return item.Produto.Nome
          }
        },
        {
          title: 'Unidade de medida',
          fieldName: 'Item',
          type: 'handler',
          handler: (item) => {
            return item.Produto.UnidadeDeMedida_Id
          }
        },
        { title: 'Tipo', fieldName: 'Tipo' },
        { title: 'Quantidade', fieldName: 'Quantidade' },
        { title: 'Data', fieldName: 'Data', type: 'date' }
      ]}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
