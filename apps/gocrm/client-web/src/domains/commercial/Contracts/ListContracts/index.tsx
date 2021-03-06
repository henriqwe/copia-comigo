import * as blocks from '@comigo/ui-blocks';
import * as contracts from '&crm/domains/commercial/Contracts';

export default function List() {
  const { baseContractsData } = contracts.useContract();
  return baseContractsData ? (
    <blocks.Table
      colection={baseContractsData}
      columnTitles={[
        { title: 'Código de Referência', fieldName: 'CodigoReferencia' },
        { title: 'Nome', fieldName: 'Nome' },
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
  );
}
