import * as blocks from '@comigo/ui-blocks'
import * as leads from '&crm/domains/services/Leads'

import * as utils from '@comigo/utils'
export default function List() {
  const { leadsData } = leads.useLead()
  return leadsData ? (
    <blocks.Table
      colection={leadsData}
      columnTitles={[
        { title: 'Nome', fieldName: 'Nome' },
        {
          title: 'Telefone',
          fieldName: 'Telefone',
          type: 'handler',
          handler: (phone) => {
            return utils.phoneFormat(phone)
          }
        },
        { title: 'Email', fieldName: 'Email' }
      ]}
      actions={leads.RowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
