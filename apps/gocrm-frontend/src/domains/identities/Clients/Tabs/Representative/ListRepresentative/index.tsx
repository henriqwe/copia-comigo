import * as common from '@comigo/ui-common'
 
import * as blocks from '@comigo/ui-blocks'
import * as representatives from '&crm/domains/identities/Clients/Tabs/Representative'

export default function List() {
  const { setSlidePanelState, representativesData } =
    representatives.useRepresentative()
  return representatives ? (
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
        colection={representativesData}
        columnTitles={[
          {
            title: 'Nome',
            fieldName: 'Nome',
            type: 'relationship',
            relationshipName: 'Pessoa'
          },
          {
            title: 'Pessoa Representada',
            fieldName: 'Nome',
            type: 'relationship',
            relationshipName: 'PessoaRepresentada'
          }
        ]}
        actions={representatives.RowActions}
      />
      <representatives.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
