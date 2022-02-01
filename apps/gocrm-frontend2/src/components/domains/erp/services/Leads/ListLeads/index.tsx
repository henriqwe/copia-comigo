import * as blocks from '&test/components/blocks'
import * as leads from '&test/components/domains/erp/services/Leads'
import { phoneFormat } from '&test/utils/formaters'

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
            return phoneFormat(phone)
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
