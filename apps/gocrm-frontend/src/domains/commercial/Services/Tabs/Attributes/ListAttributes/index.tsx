import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'
 
import * as attributes from '&crm/domains/commercial/Services/Tabs/Attributes'
export default function List() {
  const { setSlidePanelState, attributesData } = attributes.useAttribute()

  return attributesData ? (
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
        colection={attributesData}
        columnTitles={[
          {
            title: 'Nome',
            fieldName: 'Nome',
            type: 'relationship',
            relationshipName: 'Atributo'
          }
        ]}
        actions={attributes.RowActions}
      />

      <attributes.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
