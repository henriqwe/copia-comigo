import * as blocks from '@comigo/ui-blocks';
import * as attributes from '&crm/domains/commercial/Registration/Attributes';

export default function List() {
  const { attributeData } = attributes.useAttribute();
  return attributeData ? (
    <blocks.Table
      colection={attributeData}
      columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
      actions={attributes.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
