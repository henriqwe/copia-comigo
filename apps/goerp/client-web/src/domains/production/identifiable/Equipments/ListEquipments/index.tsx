import * as blocks from '@comigo/ui-blocks';
import * as equipments from '&erp/domains/production/identifiable/Equipments';

export function List() {
  const { equipmentData } = equipments.useEquipment();
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
            return item.Produto.Nome;
          },
        },
      ]}
      actions={equipments.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
