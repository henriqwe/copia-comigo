import * as blocks from '@comigo/ui-blocks'
import * as equipments from '&crm/domains/production/identifiable/Equipments'

export default function List() {
  const { equipmentData } = equipments.useEquipment()
  return equipmentData ? (
    <blocks.Table
      colection={equipmentData}
      columnTitles={[
        { title: 'Imei', fieldName: 'Imei' },
        {
          title: 'Item',
          fieldName: 'Item',
          type: 'handler',
          handler: (item) => {
            return item.Produto.Nome
          }
        }
      ]}
      actions={equipments.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
