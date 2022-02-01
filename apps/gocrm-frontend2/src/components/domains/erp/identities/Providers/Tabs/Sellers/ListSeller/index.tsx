import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as blocks from '&test/components/blocks'
import * as sellers from '&test/components/domains/erp/identities/Providers/Tabs/Sellers'

export default function List() {
  const { setSlidePanelState, sellersData } = sellers.useSeller()
  return sellersData ? (
    <div>
      <div className="flex justify-end w-full mt-5">
        <buttons.SecondaryButton
          handler={() => {
            setSlidePanelState({ open: true, type: 'create' })
          }}
        />
      </div>
      <common.Separator />
      <blocks.Table
        colection={sellersData}
        columnTitles={[{ title: 'Nome', fieldName: 'Nome' }]}
        actions={sellers.RowActions}
      />
      <sellers.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
