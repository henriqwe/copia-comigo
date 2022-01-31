import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
 
 
import * as services from '&crm/domains/commercial/Products/Tabs/Services'
import { Controller, useForm } from 'react-hook-form'

export default function List() {
  const {
    servicesData,
    setSlidePanelState,
    dependentsServicesData,
    listType,
    setListType
  } = services.useService()
  const { control } = useForm()
  return servicesData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <Controller
          name={'listType'}
          defaultValue={{
            key: listType,
            title:
              listType === 'services'
                ? 'Serviços dependentes'
                : 'Serviços que eu dependo'
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex-1">
              <common.form.Select
                itens={[
                  { key: 'services', title: 'Serviços dependentes' },
                  { key: 'dependents', title: 'Serviços que eu dependo' }
                ]}
                value={value}
                onChange={(e) => {
                  setListType(e.key)
                  onChange(e)
                }}
                label="Listagem"
              />
            </div>
          )}
        />
        {listType === 'services' && (
          <common.buttons.SecondaryButton
            handler={() => {
              setSlidePanelState({
                open: true
              })
            }}
          />
        )}
      </div>
      <common.Separator />
      {listType === 'services' ? (
        <blocks.Table
          colection={servicesData}
          columnTitles={[
            {
              title: 'Nome',
              fieldName: 'Nome',
              type: 'relationship',
              relationshipName: 'Servico'
            }
          ]}
          actions={services.RowActions}
        />
      ) : (
        <blocks.Table
          colection={dependentsServicesData?.Servicos_Produtos}
          columnTitles={[
            {
              title: 'Nome',
              fieldName: 'Nome',
              type: 'relationship',
              relationshipName: 'Servico'
            }
          ]}
        />
      )}

      <services.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
