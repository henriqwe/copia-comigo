import * as blocks from '@comigo/ui-blocks';
import * as tariffs from '&crm/domains/commercial/Registration/Tariffs';

export default function List() {
  const { tariffsData } = tariffs.useTariffs();
  return tariffsData ? (
    <blocks.Table
      colection={tariffsData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={tariffs.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
