import * as blocks from '@comigo/ui-blocks';
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers';

export function List() {
  const { filteredManufacturers, filters, setFilters } =
    manufacturers.useManufacturer();
  return filteredManufacturers ? (
    <blocks.Table
      tableName="estoque_Fabricantes"
      colection={filteredManufacturers}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        { title: 'Descrição', fieldName: 'Descricao' },
      ]}
      actions={manufacturers.RowActions}
      pagination={{ filters, setFilters }}
    />
  ) : (
    <blocks.TableSkeleton />
  );
}
