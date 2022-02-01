import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as blocks from '&test/components/blocks'
import * as representatives from '&test/components/domains/erp/identities/Clients/Tabs/Representative'

export default function List() {
  const { setSlidePanelState, representativesData } =
    representatives.useRepresentative()
  return representatives ? (
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