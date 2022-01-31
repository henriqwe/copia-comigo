import * as common from '@comigo/ui-common'
 
import * as blocks from '@comigo/ui-blocks'
import * as addresses from '&crm/domains/identities/Clients/Tabs/Addresses'

export default function List() {
  const { setSlidePanelState, addressesData } = addresses.useAddress()
  return addressesData ? (
    <div>
      <div className="flex justify-end w-full mt-5">
        <common.buttons.SecondaryButton
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
        actions={addresses.RowActions}
      />
      <addresses.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
