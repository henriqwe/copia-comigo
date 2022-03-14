import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as alerts from '&crm/domains/commercial/Products/Tabs/Alerts'

export function List() {
  const { setSlidePanelState, alertsData } = alerts.useAlerts()

  return alertsData ? (
    <div>
      <div className="flex justify-end w-full gap-4 mt-5">
        <common.buttons.SecondaryButton
          handler={() => {
            setSlidePanelState({
              open: true
            })
          }}
        />
      </div>
      <common.Separator />
      <blocks.Table
        colection={alertsData}
        columnTitles={[
          {
            title: 'Mensagem',
            fieldName: 'Mensagem'
          }
        ]}
        actions={alerts.RowActions}
      />

      <alerts.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
