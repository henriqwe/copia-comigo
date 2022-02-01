import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
 
import * as combos from '&crm/domains/commercial/Combos/Tabs/Combos'
import * as utils from '@comigo/utils'

export default function List() {
  const { dependenciesCombosData, setSlidePanelState } =
    combos.useDependenceCombo()
  return dependenciesCombosData ? (
    <>
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
        colection={dependenciesCombosData}
        columnTitles={[
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
        actions={combos.RowActions}
      />
      <combos.SlidePanel />
    </>
  ) : (
    <blocks.TableSkeleton />
  )
}
