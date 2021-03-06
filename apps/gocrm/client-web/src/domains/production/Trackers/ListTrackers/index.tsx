import * as trackers from '&crm/domains/production/Trackers';
import * as blocks from '@comigo/ui-blocks';

export default function List() {
  const { trackersData } = trackers.useList();
  return trackersData ? (
    <blocks.Table
      colection={trackersData}
      columnTitles={[
        { title: 'Código de Referencia', fieldName: 'CodigoReferencia' },
        {
          title: 'Chip',
          fieldName: 'Iccid',
          type: 'relationship',
          relationshipName: 'Chip',
        },
        {
          title: 'Equipamento',
          fieldName: 'Identificador',
          type: 'relationship',
          relationshipName: 'Equipamento',
        },
      ]}
      actions={trackers.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
