import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
 
import * as upSelling from '&crm/domains/commercial/Services/Tabs/UpSelling'
 

export default function List() {
  const { upSellingData, setSlidePanelState } = upSelling.useUpSelling()
  return upSellingData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <common.buttons.SecondaryButton
          handler={() => {
            setSlidePanelState({
              open: true,
              type: 'create'
            })
          }}
        />
      </div>
      <common.Separator />
      <blocks.Table
        colection={upSellingData}
        columnTitles={[
          {
            title: 'Nome',
            fieldName: 'Nome'
          },
          {
            title: 'Combo',
            fieldName: 'Nome',
            type: 'relationship',
            relationshipName: 'Combo'
          },
          {
            title: 'Valor',
            fieldName: 'Valor',
            type: 'handler',
            handler: (value) => utils.BRLMoneyFormat(value)
          }
        ]}
        actions={upSelling.RowActions}
      />

      <upSelling.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
