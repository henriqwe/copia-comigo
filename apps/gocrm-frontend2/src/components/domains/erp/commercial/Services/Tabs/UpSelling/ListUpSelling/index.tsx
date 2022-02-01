import * as common from '&test/components/common'
import * as blocks from '&test/components/blocks'
import * as buttons from '&test/components/common/Buttons'
import * as upSelling from '&test/components/domains/erp/commercial/Services/Tabs/UpSelling'
import { BRLMoneyFormat } from '&test/utils/formaters'

export default function List() {
  const { upSellingData, setSlidePanelState } = upSelling.useUpSelling()
  return upSellingData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <buttons.SecondaryButton
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
            handler: (value) => BRLMoneyFormat(value)
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
