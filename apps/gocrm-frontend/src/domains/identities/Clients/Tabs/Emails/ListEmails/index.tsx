import * as common from '@comigo/ui-common'
 
import * as blocks from '@comigo/ui-blocks'
import * as emails from '&crm/domains/identities/Clients/Tabs/Emails'

export default function Listar() {
  const { setSlidePanelState, emailsData } = emails.useEmail()
  return emailsData ? (
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
        colection={emailsData}
        columnTitles={[
          { title: 'Email', fieldName: 'Email' },
          { title: 'Responsável', fieldName: 'NomeDoResponsavel' }
        ]}
        actions={emails.RowActions}
      />
      <emails.SlidePanel />
    </div>
  ) : (
    <blocks.TableSkeleton />
  )
}
