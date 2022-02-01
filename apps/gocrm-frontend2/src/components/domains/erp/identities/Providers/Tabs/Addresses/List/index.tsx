import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as blocks from '&test/components/blocks'
import * as adresses from '&test/components/domains/erp/identities/Providers/Tabs/Addresses'

export default function List() {
  const { setSlidePanelState, addressesData } = adresses.useAdress()
  return addressesData ? (
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
        colection={addressesData}
        columnTitles={[
          { title: 'Logradouro', fieldName: 'Logradouro' },
          { title: 'Numero', fieldName: 'Numero' }
        ]}
        actions={adresses.RowActions}
      />
      <adresses.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
