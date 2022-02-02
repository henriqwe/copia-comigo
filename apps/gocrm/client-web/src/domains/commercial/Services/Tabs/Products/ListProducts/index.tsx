import * as common from '@comigo/ui-common';
import * as blocks from '@comigo/ui-blocks';

import * as products from '&crm/domains/commercial/Services/Tabs/Products';
import { Controller, useForm } from 'react-hook-form';

export default function List() {
  const {
    productsData,
    setSlidePanelState,
    dependentsProductsData,
    listType,
    setListType,
  } = products.useProduct();
  const { control } = useForm();
  return productsData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <Controller
          name={'listType'}
          defaultValue={{
            key: listType,
            title: listType
              ? 'Produtos dependentes'
              : 'Produtos que eu dependo',
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex-1">
              <common.form.Select
                itens={[
                  { key: 'products', title: 'Produtos dependentes' },
                  { key: 'dependents', title: 'Produtos que eu dependo' },
                ]}
                value={value}
                onChange={(e) => {
                  setListType(e.key);
                  onChange(e);
                }}
                label="Listagem"
              />
            </div>
          )}
        />
        {listType === 'products' && (
          <common.buttons.SecondaryButton
            handler={() => {
              setSlidePanelState({
                open: true,
              });
            }}
          />
        )}
      </div>
      <common.Separator />
      {listType === 'products' ? (
        <blocks.Table
          colection={productsData}
          columnTitles={[
            {
              title: 'Nome',
              fieldName: 'Nome',
              type: 'relationship',
              relationshipName: 'Produto',
            },
          ]}
          actions={products.RowActions}
        />
      ) : (
        <blocks.Table
          colection={dependentsProductsData?.Produtos_Servicos}
          columnTitles={[
            {
              title: 'Nome',
              fieldName: 'Nome',
              type: 'relationship',
              relationshipName: 'Produto',
            },
          ]}
        />
      )}

      <products.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  );
}
