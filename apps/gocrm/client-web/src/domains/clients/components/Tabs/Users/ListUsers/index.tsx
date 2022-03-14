import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as users from '&crm/domains/clients/components/Tabs/Users'

export function List() {
  const { usersData, setSlidePanelState } = users.useUser()
  return usersData ? (
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
        colection={usersData}
        columnTitles={[
          {
            title: 'Email',
            fieldName: 'Email',
            type: 'handler',
            handler: (Email) => Email
          }
        ]}
        actions={users.RowActions}
      />
      <users.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
