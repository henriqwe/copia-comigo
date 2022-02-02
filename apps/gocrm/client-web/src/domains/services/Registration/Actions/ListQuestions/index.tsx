import * as blocks from '@comigo/ui-blocks';
import * as actions from '&crm/domains/services/Registration/Actions';

export default function List() {
  const { actionsData } = actions.useAction();
  return actionsData ? (
    <blocks.Table
      colection={actionsData}
      columnTitles={[
        {
          title: 'Título',
          fieldName: 'Titulo',
        },
        {
          title: 'Url',
          fieldName: 'Url',
        },
      ]}
      actions={actions.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
